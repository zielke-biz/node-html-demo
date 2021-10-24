const ejs = require('ejs');
const path = require('path');
const UserService = require('./userService');
const product = require('./api/product');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const { v4 } = require('uuid');

const INPUT = path.join(__dirname, 'index.ejs')

const service = new UserService();

app.get('/api2', (req, res) => {
    const path = `/api/item/${v4()}`;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
  });
  
  app.get('/api/item/:slug', (req, res) => {
    const { slug } = req.params;
    res.end(`Item: ${slug}`);
  });
    
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

app.use(express.json({extended: false}));

app.use("/api/product", product)

app.listen(PORT, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.log(`Server started at: http://localhost:${PORT}`);
    }
});

module.exports = app;
