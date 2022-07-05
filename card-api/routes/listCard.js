const router = require("express").Router();
const Card = require("../models/card");

router.post("/add", async (req, res) => {
    const newCard = new Card(req.body);
    console.log(newCard);
    await newCard
        .save()
        .then((data) => {
            // res.status(201)
            res.send({
                message: "Card created successfully!!",
                newCard: data,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating user",
            });
        });
});

//Get all card
router.get("/", async (req, res) => {
    const list = Card.find();
    try {
        const getAllCard = await Card.find();
        return res.status(200).json({
            message: "user data gotten successfully!!!@",
            data: getAllCard,
        });
    } catch (error) {
        return res.status(500).json({
            status: "fail",
        });
    }
    console.log(list);
});

//Get detail card
router.get("/:id", async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        res.status(200).json(card);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Update card
router.put("/:id", async (req, res) => {
    try {
        const updatedCard = await Card.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedCard);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete   card
router.delete("/:id", async (req, res) => {
    try {
        await Card.findByIdAndDelete(req.params.id);
        res.status(200).json("The card has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;
