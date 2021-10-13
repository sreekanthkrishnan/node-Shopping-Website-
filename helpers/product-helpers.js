var db = require("../config/connection");
var collection = require("../config/collections");

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
};
