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
        //(Email or Username) + Password Will Be Sent
        const {email, username, password} = req.body;
        const validUser = await pool.query(
            "SELECT * FROM users WHERE (user_email = $1) OR (user_name = $2)",
            [email, username]
        );
        if(validUser.rows.length == 0){
            return res.status(401).json("Unauthenticated (Invalid Email/Password)");
        }
        else{
            const pwCheck = await bcrypt.compare(password, validUser.rows[0].user_password);
            if(!pwCheck){
                return res.status(401).json("Unauthenticated (Invalid Email/Password)");
            }
            else{
                //Valid Login, Generate Token
                const token = generateJWT(validUser.rows[0].user_id);
                return res.json({ token });
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
        const {email, username, password} = req.body;
        const existingUser = await pool.query(
            "SELECT * FROM users WHERE (user_email = $1) OR (user_name = $2)",
            [email, username]
        );

        if(existingUser.rows.length > 0){
            return res.status(401).json("Unauthenticated (User Already Exists)");
        }
        else{
            //User Does Not Exist
            const salt = await bcrypt.genSalt(10);
            const password_bcrypt = await bcrypt.hash(password, salt);

            let user = await pool.query(
                "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
                [username, email, password_bcrypt]
            );

            //Generate & Respond w/ Auth Token
            const token = generateJWT(user.rows[0].user_id);
            return res.json({ token });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;