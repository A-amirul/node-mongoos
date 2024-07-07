const Product = require("./product.model");

exports.addProduct = async (data) => {
    try {
        const result = await Product.create(data);
        return result;
    } catch (error) {
        console.error('Error adding product:', error);
        throw new Error('Failed to add product');
    }
};

exports.getAllProduct = async () => {
    const result = await Product.find({});
    return result;
}

exports.deleteSingleProduct = async (id) => {
    const result = await Product.findByIdAndDelete(id);
    return result;

}

exports.updateSingleProduct = async (id, data) => {
    const result = await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    return result;
};