//setting up the backend
const express = require('express');

//executing method
const app = express();

const User = require('./User.js');

const Meetup = require('./Meetup.js');

const bodyparser = require('body-parser');

app.use(bodyparser.json());
// const cors = require('cors')
// app.use(cors);

const expressSession = require('express-session');

// let session = {
//     email: 'placeholder'
// };

app.use(expressSession({
    name: "SessionCookie",
    secret: "express session secret",
    resave: false,
    saveUninitialized: false,
}));

const cors = require('cors')

app.use(cors({
  origin:['https://pedantic-bartik-3cd77c.netlify.app'],
  methods:['GET','POST'],
  credentials: true
}))



//getting session user
app.get('/',(req, res) => {
    //console.log(session.email)
    console.log("in the get")
    console.log(req.session);
    res.send(req.session.user);
    return;
});


//logging out
app.get('/logout', (req, res) => {
    console.log(req.session)
    delete req.session.user;
    console.log(req.session)
    res.send(req.session);
})




const user_data = require('data-store')({ path: process.cwd() + '/user_data/users.json' });

//authenticate the user
app.post('/', (req, res) => {
    let authenticated = false;
    console.log("checking")

    let {email, password} = req.body;

    //getting the users object, users_db is the users database
    let users_db = user_data.data


    //checking the credentials
    for (const user in users_db){
        const user_email = users_db[user].email;
        const user_password = users_db[user].password;

        if ((email == user_email) && (password == user_password)){

            console.log("auth!")
            req.session.user = email;
            
            // session.email = req.session.user;


            res.send("authenticated!")

            console.log("in the post")
            console.log(req.session)

            
            return;
        }
        
    }

    res.status(404).send("Not found");

})




app.post('/signuppage', (req, res) => {
    let {email, password, preferences} = req.body;
    console.log(req.body);
    
    let u = User.create(email, password, preferences);
    if (u==null){
        res.status(400).send("Bad Request");
        return;
    }
    return res.json(u);

});

//meetups
app.post('/meetups', (req, res) => {
    let {address1, address2, meettype, stars, price} = req.body;
    console.log(req.body);
    
    let m = Meetup.create(address1, address2, meettype, stars, price);
    if (m==null){
        res.status(400).send("Bad Request");
        return;
    }
    return res.json(m);

});

app.post('/preferences', (req, res) => {
    let {preferences} = req.body;
    //console.log(req);
    let user = User.findByID(req.params.id);
    if (user==null){
        res.status(400).send("Bad Request");
        return;
    }
    user.addPreferences(preferences, req.params.id);
    return res.json(user);
});

// app.delete('/book/:id', (req, res) => {
//     let u = User.findByID(req.params.id);
//     if (u == null) {
//         res.status(404).send("Book not found");
//         return;
//     }
//     u.delete();
//     res.json(true);
// });

const port = process.env.PORT || 3030;
app.listen(port, () => {
    console.log("Tutorial1 up and running on port " + port);
});