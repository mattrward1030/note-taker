const express = require('express');
const path = require('path');
const fs = require('fs');


const data = fs.readFileSync('db.json');
const notes = JSON.parse(data);


// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());











// route that sends user to the notes.hmtl page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));
// route that sends user to the index.html page
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

// setting up api get requests
app.get('/api/notes', (req, res) => res.json(notes));





// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
