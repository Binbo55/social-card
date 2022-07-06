const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema(
    {
        avatar: { type: String },
        name: {
            type: String,
            require: true,
            index: true,
            unique: true,
        },
        description: { type: String },
        heart: { type: Number, default: 0 },
        image: { type: String },
    },
    { timestamps: true, }
);


module.exports = mongoose.model("Card", CardSchema);
