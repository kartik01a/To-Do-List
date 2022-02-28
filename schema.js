const mongoose = require('mongoose');

const listSchema = {
    list : String
}

module.exports = mongoose.model("list",listSchema);