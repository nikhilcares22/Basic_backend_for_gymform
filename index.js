const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const PORT = 80;
//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));//for serving static folder
app.use(express.urlencoded());

//PUG SPECIFIC STUFF 
app.set('view engine', 'pug');//set the template engine as pug
app.set('views', path.join(__dirname, 'views'));//set the views directory

//ENDPOINTS
app.get('/', (req, res) => {
    const con = "This is the best content on the internet"
    const params = { title: 'pug is the best', content: con }

    res.status(200).render('index.pug', params);
});

app.post('/', (req, res) => {
    console.log(req.body);
    const params = {
        message: 'Your form has been submitted successfully.'
    }
    name = req.body.name;
    age = req.body.age;
    gender = req.body.gender;
    address = req.body.address;
    more = req.body.more;
    let outputtowrite = `The name of the client is ${name}, ${age} years old, lives in ${address} and more about him/her: ${more}\n`;

    fs.appendFileSync('output.txt',outputtowrite);
    res.status(200).render('index.pug', params);
});

app.get('/games/:id', (req, res) => {
    const idd = req.params.id;
    const f = "Hello"
    const obj = {
        content: f,
        id: idd
    }
    res.render('games.pug', obj);
    // console.log(req.params.id);
});



// our pug demo endpoint
app.get('/demo', (req, res) => {
    res.status(200).render('demo', { title: "Hey harry", message: "Thank you for telling" });

});
// app.get('/', (req, res) => {
//     res.status(200).send("Hello this is page");
// });

// app.get('/about', (req, res) => {
//     res.status(200).send("<h1>About</h1>");
// });
// app.get('/this', (req, res) => {
//     res.status(404).send("Not found");
// });
// app.post('/about', (req, res) => {
//     res.status(200).send("This is post request");
// });

app.listen(PORT, () => { console.log(`Server running at ${PORT}`) });
