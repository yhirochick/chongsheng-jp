const functions = require('firebase-functions');

const admin = require('firebase-admin');

// For localhost
// const serviceAccount = require("/home/yhirochick/development/chongsheng-jp-firebase-adminsdk-gxyre-34fc766ea9.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://chongsheng-jp.firebaseio.com/"
// });
// --
admin.initializeApp();
const db = admin.database();

const express = require('express');
const app = express();
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Max-Age', '86400');
    next();
});

interface Chongshengde {
    id: string;
    description: string;
    date: string
}

app.post('/chongshengde', (req, res) => {
    const post = {
        date: new Date().toString(),
        description: req.body.description
    }
    const postRef = db.ref('/chongshengde/posts');
    postRef.push(post, function(error){
        if (error) {
            res.header('Content-Type', 'application/json; charset=utf-8');
            res.status(201).send({result: "Data could not be saved." + error});
        } else {
            res.header('Content-Type', 'application/json; charset=utf-8');
            res.status(201).send({result: "Data saved successfully."});
        }
    });
});

app.get('/chongshengde', (req, res) => {
    const postRef = db.ref('/chongshengde/posts');
    postRef.once('value', function(snapshot){
        const posts: Chongshengde[] = [];
        snapshot.forEach(function(childSnapshot){
            posts.push(childSnapshot.val());
        });
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.status(201).send(posts);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
});

exports.v1 = functions.https.onRequest(app);
