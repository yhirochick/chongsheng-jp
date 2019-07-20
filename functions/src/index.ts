const functions = require('firebase-functions');

const admin = require('firebase-admin');

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
const cors = require('cors')({origin: true});
app.use(cors);

app.post('/chongshengde', (req, res) => {
    const ref = db.ref('/chongshengde/posts');
    
    ref.set("I'm writing data", function(error) {
        if (error) {
            res.header('Content-Type', 'application/json; charset=utf-8');
            res.status(201).send({result: "Data could not be saved." + error});
        } else {
            res.header('Content-Type', 'application/json; charset=utf-8');
            res.status(201).send({result: "Data saved successfully."});
        }
    });
});

exports.v1 = functions.https.onRequest(app);
