const {randomUUID} = require('crypto');
const express = require('express');
const fs = require('fs');

const router = express.Router();
function displayNotes(){
    return JSON.parse(fs.readFileSync('./db/db.json'))
}

router.post('/', (req, res) => {
    const notes = displayNotes()
    const {title, text} = req.body;
    if (req.body){
        const newNote ={
            title: title,
            text: text,
            id: randomUUID(),
        }
        notes.push(newNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(notes));
        res.json(newNote)
    }else{
        res.error('No note added.')
    }
})
router.get('/', (req, res) => {
    const notes = displayNotes()
    res.json(notes);
})

router.delete('/:id', (req, res) => {
    const notes = displayNotes();
    const updatedNotes = notes.filter(note => note.id !== req.params.id);
    fs.writeFileSync('./db/db.json', JSON.stringify(updatedNotes));
    res.json({ok: true})
})

module.exports= router