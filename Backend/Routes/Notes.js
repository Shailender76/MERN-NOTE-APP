const express = require("express");
const router = express.Router();
const Note = require("../Models/notes");
const { validationResult, body } = require("express-validator");
const verifyToken = require("../Middleware/Fetchuser");


// API FOR ADD NOTE
router.post("/addnote", verifyToken, [
    body("title", "Enter valid title").isLength({ min: 4 }),
    body("description", "Enter valid description").isLength({ min: 5 }),
    body("tag", "Enter valid tag").isLength({ min: 3 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    let note = new Note({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        user: req.user
    })

    note = await note.save();
    if (note) {
        res.status(200).json(note);

    } else {
        res.status(500).send("Internal server error")
    };

})


// API FOR GET ALL NOTES
router.get("/getallnotes", verifyToken, async (req, res) => {
    let notes = await Note.find({ user: req.user });
    if (notes) {
        res.status(200).json(notes);
    } else {
        res.status(500).send("Internal server error")
    }
});

// API FOR DELETING A NOTE
router.delete("/deletenote/:id", verifyToken, async (req, res) => {
    let note = await Note.findById(req.params.id);
    if (!note) {
        return res.status(400).json({ error: "Note does not exist" })
    }

    if (note.user.toString() !== req.user) {
        return res.status(401).send("Not allowed");
    };

    note = await Note.findByIdAndDelete(req.params.id);
    if (note) {
        res.status(200).json(note);
    } else {
        res.status(500).send("Internal server error")
    }
});

// API FOR UPDATING A NOTE
router.put("/updatenote/:id", verifyToken, async (req, res) => {
    let note = await Note.findById(req.params.id);

    if (!note) {
        return res.status(400).json({ error: "Note does not exist" });
    };

    if (note.user.toString() !== req.user) {
        return res.status(401).json({ error: "Not allowed" });
    };
    const { title, description, tag } = req.body;
    let newNote = {};

    if (title) {
        newNote.title = title;
    };
    if (description) {
        newNote.description = description;
    };
    if (tag) {
        newNote.tag = tag;
    }
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    if (note) {
        res.status(200).json(note);
    } else {
        res.status(500).send("Internal server error");
    }
});

// API FOR SEARCH
router.get("/search/:key",verifyToken,async(req,res)=>{
    let result=await Note.find({
        "$or":[
            {title:{$regex:req.params.key}},
            {description:{$regex:req.params.key}},
            {tag:{$regex:req.params.key}}
        ]
    ,user:req.user});
    if(result){
        res.status(200).json(result)
    }else{
        res.status(500).send("Internal server error")
    }
})

module.exports = router;