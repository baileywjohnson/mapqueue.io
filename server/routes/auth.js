const config = require('config');
const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../connectionPool');
const JWT = require("jsonwebtoken");
const jwtAuth = require('../middleware/jwt_auth');

const generateJWT = (user_id) => JWT.sign({user: {id: user_id}}, config.get('jwt.secret'), {expiresIn: '2h'});

const router = express.Router();

router.post('/verify', jwtAuth, async (req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.post('/login', async (req, res) => {
    try {
        const {mailname, password} = req.body;
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
                //Valid Login, Generate Token
                console.log(validUser.rows[0]);
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
        //All Three Will Be Sent
        const {email_reg, username_reg, password_one_reg} = req.body;
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