const express = require('express');
const router = express.Router();
const jwtAuth = require('../middleware/jwt_auth');

const pool = require('../connectionPool');

router.get('/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const user = await pool.query(
            'SELECT row_to_json(users) FROM users WHERE user_name = $1',
            [name]
        );
        const userObj = user.rows[0].row_to_json
        //Clear Sensitive Data from Response
        delete userObj.user_id;
        delete userObj.user_email;
        delete userObj.user_password;
        return res.json(user.rows[0].row_to_json);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.put('/:name', jwtAuth, async (req, res) => {
    try {
        const { name } = req.params;
        const id = req.user.id;
        const { user_osu_name, user_bio, user_queues, user_favorites } = req.body;

        const targetID = await pool.query(
            'SELECT user_id FROM users WHERE user_name = $1',
            [name]
        );

        if(targetID.rows[0].user_id === id){
            //Update User
            const updateResult = await pool.query(
                '', 
                []
            );
        }
        else{
            res.status(403).send("Unauthorized (Unable to Update This User)");
        }    

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;