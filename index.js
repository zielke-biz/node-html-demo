const ejs = require('ejs');
const path = require('path');
const UserService = require('./userService');

const express = require('express');
const app = express();
const PORT = 3000;

const INPUT = path.join(__dirname, 'index.ejs')

const service = new UserService();

app.get('/', (request, response) => {
    ejs.renderFile(
        INPUT,
        {
            title: 'Users',
            users: service.getAllUsers()
        },
        (error, html) => {
            if (error) {
                console.error.log(error);
            }
            console.log('sending html response..');
            response.send(html);
        }
    );
});

app.listen(PORT, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.log(`Server started at: http://localhost:${PORT}`);
    }
});
