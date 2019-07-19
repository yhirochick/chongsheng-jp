const functions = require('firebase-functions');

const admin = require('firebase-admin');
console.log(1);
// const serviceAccount = require("/home/yhirochick/development/chongsheng-jp-firebase-adminsdk-gxyre-34fc766ea9.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://chongsheng-jp.firebaseio.com/"
// });
// --
admin.initializeApp();
console.log(2);

const express = require('express');
const app = express();
console.log(3);

const cors = require('cors')({origin: true});
app.use(cors);
console.log(4);
// app.use((req, res, next) => {
    //     res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
//     // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });
// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
//     res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DEconstE, OPTIONS');
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Max-Age', '86400');
//     next();
// });
  
app.options('*', function (req, res) {
    res.sendStatus(200);
});


const anonymousUser = {
    id: "anon",
    name: "Anonymous",
    avatar: ""
};

const checkUser = (req, res, next) => {
    req.user = anonymousUser;
    if (req.query.auth_token !== undefined) {
        const idToken = req.query.auth_token;
        admin.auth().verifyIdToken(idToken).then(decodedIdToken => {
            const authUser = {
                id: decodedIdToken.user_id,
                name: decodedIdToken.name,
                avatar: decodedIdToken.picture
            };
            req.user = authUser;
            next();
        }).catch(error => {
            next();
        });
    } else {
        next();
    };
};

app.use(checkUser);

app.post('/chongshengde', (req, res) => {
    console.log(5);
    const message = {
        date: new Date().toJSON(),
        body: req.body.name,
    };
    console.log(req.body);
    console.log(message.body);
    console.log(6);
    const postsRef = admin.database().ref('/chongshengde/posts');
    postsRef.push(message);
    console.log(postsRef);
    res.header('Content-Type', 'application/json; charset=utf-8');
    console.log(8);
    res.status(201).send({result: "ok"});
});


app.get('/chongshengde', (req, res) => {
    const postsRef = admin.database().ref('/chongshengde/posts').orderByChild('date').limitToLast(20);
    postsRef.once('value', function(snapshot) {
      const namesa = [];
        snapshot.forEach(function(childSnapshot) {
            const post = childSnapshot.val();
            namesa.push(post.name);
        });
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.send({posts: namesa});
    });
});


exports.v1 = functions.https.onRequest(app);
// exports.sayHelloWorld = functions.https.onRequest((request, response) => {
//     console.log("Hello from Firebase!");   
//     response.send("Hello from Firebase!");
// });