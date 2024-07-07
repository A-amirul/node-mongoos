const mongoose = require('mongoose');

const variationSchema = new mongoose.Schema({
    size: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
    image: {
        type: Array,
        required: true,
    },

});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    product_image: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    variations: [variationSchema],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            const createdAtDate = new Date(ret.createdAt);
            const updatedAtDate = new Date(ret.updatedAt);
            const formattedDate = `${createdAtDate.getDate()} ${createdAtDate.toLocaleString('default', { month: 'short' })}, ${createdAtDate.getFullYear()}`;
            const formattedUpdatedDate = `${updatedAtDate.getDate()} ${updatedAtDate.toLocaleString('default', { month: 'short' })}, ${updatedAtDate.getFullYear()}`;
            ret.created_at = formattedDate;
            ret.updated_at = formattedUpdatedDate;
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.__v;
            return ret;
        }
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
