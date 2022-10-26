require('./db/connection');

const express = require('express');
const userRouter = require('./user/userRouters')

const app = express()
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(userRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})