var express = require("express");
var router = express.Router();

var productHelper = require("../helpers/product-helpers");

/* GET users listing. */
router.get("/", function (req, res, next) {
    productHelper.getProduct().then((product) => {
        res.render("admin/view-products.hbs", { admin: true, product });
    });
});
router.get("/products", function (req, res, next) {
    productHelper.getProduct().then((product) => {
        // res.json(product);
        res.render("admin/view-products.hbs", { admin: true, product });
    });
});

router.get("/add-product", function (req, res) {
    res.render("admin/add-product.hbs", { admin: true });
});
router.post("/add-product", function (req, res) {
    console.log(req.body);
    // console.log(req.files.image);
    productHelper.addProduct(req.body, (id) => {
        let image = req.files.image;
        image.mv("./public/product-images/" + id + ".jpg", (err, done) => {
            if (!err) {
                res.render("general/success.hbs", { admin: true });
            } else {
                console.log("database error" + err);
            }
        });
    });
});

router.get("/delete-product/:id", (req, res) => {
    let id = req.params.id;
    productHelper.deleteProduct(id).then((response) => {
        res.redirect("/admin");
    });
});
module.exports = router;
