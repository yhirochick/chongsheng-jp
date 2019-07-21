const functions = require('firebase-functions');

const admin = require('firebase-admin');

const serviceAccount = require("/home/yhirochick/development/chongsheng-jp-firebase-adminsdk-gxyre-34fc766ea9.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chongsheng-jp.firebaseio.com/"
});
// --
// admin.initializeApp();
const db = admin.database();

const express = require('express');
const app = express();
const cors = require('cors')({origin: true});
app.use(cors);

interface Chongshengde {
    id: string;
    description: string;
    date: string
}

app.post('/chongshengde', (req, res) => {
    const post = {
        date: new Date().toString(),
        descritption: req.body.description
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
        res.status(201).send({result: posts});
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
});

exports.v1 = functions.https.onRequest(app);
