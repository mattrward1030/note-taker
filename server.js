const express = require('express');
const path = require('path');
const fs = require('fs');
const notesDatabase = require('./db/db.json');


// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000;


// Sets up the Express app to handle data parsing
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('styles.css', (req, res) => {
    res.sendFile('styles.css');
});



// route that sends user to the notes.hmtl page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// setting up api get requests
app.route("/api/notes")

    .get(function (req, res) {
        res.json(notesDatabase);
    })


    .post(function (req, res) {
        let jsonPath = path.join(__dirname, "/db/db.json");
        let newNote = req.body;
        let noteId = 99;

        for (let i = 0; i < notesDatabase.length; i++) {
            let userNote = notesDatabase[i];

            if (userNote.id > noteId) {
                noteId = userNote.id;
            }
        }

        newNote.id = noteId + 1;

        notesDatabase.push(newNote)

        fs.writeFile(jsonPath, JSON.stringify(notesDatabase), function (err) {

            if (err) {
                return console.log(err);

            }

            console.log("Note was saved")
        });
        res.json(newNote)

    });

app.delete("/api/notes/:id", function (req, res) {
    let jsonPath = path.join(__dirname, "/db/db.json");

    for (let i = 0; i < notesDatabase.length; i++) {

        if (notesDatabase[i].id == req.params.id) {

            notesDatabase.splice(i, 1);
            break;
        }
    }
    // re-writing to db.jon file
    fs.writeFileSync(jsonPath, JSON.stringify(notesDatabase), function (err) {

        if (err) {
            return console.log(err);
        }

        console.log("NOTE DELETED!");

    });
    res.json(notesDatabase);
});

// route that sends user to the index.html page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});



