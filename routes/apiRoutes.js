const express = require("express");
const router = express.Router();
const fs = require("fs");

let notesArr = require("../db/db.json")

router.get("/api/notes", function(req, res) {
    res.json(notesArr);
});

router.post("/api/notes", function(req, res){
    let newNote = req.body;
    let lastID = notesArr[notesArr.length -1].id;
    newNote.id = lastID + 1;

    console.log(newNote);

    notesArr.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(notesArr, null, 2));
    res.json(newNote);
});

router.delete("/api/notes/:id", function(req, res){
    console.log("id: " + req.params.id);

    notesArr = notesArr.filter(function(note){
        return note.id !== parseInt(req.params.id)
    });

    //notesArr = notesArr.filter(note => note.id !== parseInt(req.params.id));

    fs.writeFileSync("./db/db.json", JSON.stringify(notesArr, null, 2));
    res.json(true)
});



module.exports = router;