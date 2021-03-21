const config = require('config');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/queues', require('./routes/queues'));
app.use('/users', require('./routes/users'));

const PORT = config.get('app.port');

app.listen(PORT, () => {
    console.log(`Server Listening on Port ${PORT}...`);
});