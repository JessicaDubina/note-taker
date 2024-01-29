const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
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
    
        const response = {
            status: 'success',
            body: newNote,
          };
  
          console.log(response);
          res.status(201).json(response);        
    } else {
      res.status(500).json('Error in posting review');
    }
});  

//listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);