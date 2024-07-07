
const cloudinary = require("../../utils/cloudinary");
const { addProduct, getAllProduct, deleteSingleProduct, updateSingleProduct } = require("./product.service");

/*-----------post product---------*/

exports.insertIntoDb = async (req, res) => {
    console.log(req.files);
    try {
        const { body, files } = req;

        // Ensure at least one file is uploaded
        if (!files || files.length === 0) {
            return res.status(400).send('No files uploaded');
        }

        // Find and upload the main product image
        const mainImageFile = files.find(file => file.fieldname === 'product_image');
        if (!mainImageFile) {
            return res.status(400).json({ success: false, error: "Main image not uploaded" });
        }

        // Function to upload image to Cloudinary and return a promise
        const uploadMainImage = (file) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
                    if (error) reject('Error uploading main image');
                    resolve(result);
                });
                stream.end(file.buffer);
            });
        };

        // Upload the main product image and wait for the result
        const mainUploadResult = await uploadMainImage(mainImageFile);
        console.log(mainUploadResult);

        // Check if mainUploadResult is valid
        if (!mainUploadResult || !mainUploadResult.secure_url) {
            return res.status(400).json({ success: false, error: "Error uploading main image" });
        }


        // Prepare product data including main image URL
        const productData = {
            ...body,
            product_image: mainUploadResult.secure_url,
            variations: [],
        };

        // Parse variations from the body
        const variations = JSON.parse(body.variations || '[]');

        // Upload images for each variation dynamically
        for (let i = 0; i < variations.length; i++) {
            const variationImages = [];
            await Promise.all(files.map(async file => {
                if (file.fieldname.startsWith(`variations[${i}][image]`)) {
                    const uploadResult = await new Promise((resolve, reject) => {
                        const stream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
                            if (error) reject('Error uploading variation image');
                            resolve(result);
                        });
                        stream.end(file.buffer);
                    });
                    if (uploadResult && uploadResult.secure_url) {
                        variationImages.push(uploadResult.secure_url);
                    }
                }
            }));
            variations[i].image = variationImages;
            productData.variations.push(variations[i]);
        }

        // Save product data to database
        const savedProduct = await addProduct(productData);

        res.status(201).json({ success: true, message: "Product Added Successfully!", data: savedProduct });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ success: false, error: "Server Error" });
    }
};

/*---------------get all product------------*/
exports.getAllProduct = async (req, res) => {
    try {
        const products = await getAllProduct();
        res.json({ success: true, message: "Product Retrieve Successfully", data: products });

    } catch (error) {
        res.status(500).json({ success: false, error: "Server Error" });
    }

}

/*---------------delete single products------------*/
exports.deleteProductIntoDb = async (req, res) => {
    try {
        const product = await deleteSingleProduct(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, error: "Product Not Found" })
        }
        res.json({ success: true, message: "Product Deleted Successfully!", data: product })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, error: "server error" });
    }

}


/*-----------------Update Task-------------*/
exports.updateProductIntoDb = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const product = await updateSingleProduct(id, data);

        if (!product) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }

        res.json({ success: true, message: "Product Update Successfully!", data: product });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ success: false, error: 'Error updating product' });
    }
}
