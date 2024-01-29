const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const notes = require('./db/db.json');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//landing page handler
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });


//handler for get notes page request
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

//handler for get notes data request
app.get('/api/notes', (req,res) => {
    res.status(200).json(notes);
});

//handler for post notes data request
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request was recieved for a new note`)
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
        }

        //add newnote to db
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(error);
            } else {
                const parsedNotes = JSON.parse(data);
                parsedNotes.push(newNote);
                allNotes = JSON.stringify(parsedNotes, null, '\t');
                fs.writeFile('./db/db.json', allNotes, (err) => {
                    if (err) {
                        console.error(err)
                    } else {
                        const response = {
                            status: 'success',
                            body: newNote,
                          };
                        console.info("Successfully added note!")
                        res.status(201).json(response);  
                    }
                })
            }
        })        
    } else {
      res.status(500).json('Error in adding note');
    }
});  

//handler for delete note request

//listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);