const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//landing page handler
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });


//handler for get notes html page request
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

//handler for get notes data request
app.get('/api/notes', (req,res) => {
const notes = require('./db/db.json');
    const data = fs.readFileSync('./db/db.json');
    const parsed = JSON.parse(data);
    res.status(200).json(parsed);
});

//handler for post notes data request
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request was recieved for a new note`)
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        }

        //add newnote to db
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);
                parsedNotes.push(newNote);
                allNotes = JSON.stringify(parsedNotes, null, '\t');
                fs.writeFile('./db/db.json', allNotes, (err) => {
                    if (err) {
                        console.error(err)
                    } else {
                        console.info("Successfully added note!")
                        res.status(201).send(parsedNotes);  
                    }
                })
            }
        })        
    } else {
      res.status(500).json('Error in adding note');
    }
});  

//handler for delete note request
app.delete('/api/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            parsedNotes = JSON.parse(data);
            //find data by id and filter out entry with that id from database
            deletedNote = parsedNotes.filter(x=>x.id!=req.params.id)
            console.log(deletedNote);
            newNotes = JSON.stringify(deletedNote, null, '\t');
            fs.writeFile('./db/db.json', newNotes, (err) => {
                if (err) {
                    console.error(err)
                } else {
                    const response = {
                        status: 'success',
                        body: newNotes,
                      };
                    console.info("Successfully deleted note!")
                    res.status(201).json(parsedNotes); 
                }
            })
        }
    
    
    });
});

//listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);