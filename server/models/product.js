const mongoose = require('mongoose');

const {Schema} = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    Illustration: {
        type: String
    },
    potrait: {
        type: String
    },
    price: {
        type: Number,
        require: true,
        min: 1.00
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

const product = mongoose.model('product', productSchema);


module.exports = product;