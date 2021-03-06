var db = require("../config/connection");
var collection = require("../config/collections");
var objectId = require("mongodb").ObjectID;
const { ObjectId } = require("bson");

module.exports = {
    addProduct: (product, callback) => {
        db.get()
            .collection(collection.PRODUCT_COLLECTION)
            .insertOne(product)
            .then((data) => {
                console.log(data, "database id");
                callback(data.insertedId);
            });
    },
    getProduct: () => {
        return new Promise(async (resolve, reject) => {
            let product = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray();
            resolve(product);
        });
    },

    deleteProduct: (id) => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(collection.PRODUCT_COLLECTION)
                .deleteOne({ _id: ObjectId(id) })
                .then((data) => resolve(data));
        });
    },
    getProductDetails: (id) => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(collection.PRODUCT_COLLECTION)
                .findOne({ _id: ObjectId(id) })
                .then((data) => resolve(data));
        });
    },
    updateProduct: (id, productData) => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(collection.PRODUCT_COLLECTION)
                .updateOne(
                    { _id: ObjectId(id) },
                    {
                        $set: {
                            product: productData.product,
                            category: productData.category,
                            price: productData.price,
                            description: productData.description,
                        },
                    }
                )
                .then((response) => {
                    resolve(response);
                });
        });
    },
};
