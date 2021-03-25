const config = require('config');
const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../connectionPool');
const JWT = require("jsonwebtoken");
const jwtAuth = require('../middleware/jwt_auth');

const generateJWT = (user_id) => JWT.sign({user: {id: user_id}}, config.get('jwt.secret'), {expiresIn: '2h'});

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// https://stackoverflow.com/questions/9628879/javascript-regex-username-validation
const validateUsername = (username) => {
    const re = /^[a-zA-Z0-9]+$/;
    return re.test(String(username));
}

// https://stackoverflow.com/questions/14850553/javascript-regex-for-password-containing-at-least-8-characters-1-number-1-uppe
const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(String(password));
}

const router = express.Router();

router.post('/verify', jwtAuth, async (req, res) => {
    try {
        //access req.user
        const status = true;
        const id = req.user.id;

        //pull user info from db using id
        const userInfo = await pool.query(
            'SELECT * FROM users WHERE (user_id = $1)',
            [id]
        );

        const name = userInfo.rows[0].user_name;

        res.json({
            status,
            user: {
                name
            }
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.post('/login', async (req, res) => {
    try {
        const {mailname, password} = req.body;

        if(!((validateEmail(mailname) || validateUsername(mailname)) && validatePassword(password))){
            return res.status(401).json("Unauthenticated (Invalid Email/Username or Password)");
        }

        const validUser = await pool.query(
            "SELECT * FROM users WHERE (user_email = $1) OR (user_name = $1)",
            [mailname]
        );
        if(validUser.rows.length == 0){
            return res.status(401).json("Unauthenticated (Invalid Email/Username or Password)");
        }
        else{
            const pwCheck = await bcrypt.compare(password, validUser.rows[0].user_password);
            if(!pwCheck){
                return res.status(401).json("Unauthenticated (Invalid Email/Username or Password)");
            }
            else{
                const token = generateJWT(validUser.rows[0].user_id);
                const name = validUser.rows[0].user_name;
                return res.json({ token, name });
            }
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.post('/register', async (req, res) => {
    try {
        const {email_reg, username_reg, password_one_reg} = req.body;

        if(!(validateEmail(email_reg) && validateUsername(username_reg) && validatePassword(password_one_reg))){
            return res.status(401).json("Unauthenticated (Invalid Input)");
        }

        const existingUser = await pool.query(
            "SELECT * FROM users WHERE (user_email = $1) OR (user_name = $2)",
            [email_reg, username_reg]
        );

        if(existingUser.rows.length > 0){
            return res.status(401).json("Unauthenticated (User Already Exists)");
        }
        else{
            //User Does Not Exist
            const salt = await bcrypt.genSalt(10);
            const password_bcrypt = await bcrypt.hash(password_one_reg, salt);

            const user = await pool.query(
                "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
                [username_reg, email_reg, password_bcrypt]
            );

            //Generate & Respond w/ Auth Token
            console.log(user.rows[0]);
            const token = generateJWT(user.rows[0].user_id);
            const name = user.rows[0].user_name;
            return res.json({ token, name });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;