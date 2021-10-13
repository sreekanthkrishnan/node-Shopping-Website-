var express = require("express");
var router = express.Router();

var productHelper = require("../helpers/product-helpers");
var userHelper = require("../helpers/user-helpers");

//verfiy middleware

const verfiyLogin = (req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect("/");
    }
};

/* GET home page. */
router.get("/", function (req, res) {
    let user = req.session.user;
    console.log(user, "session");
    productHelper.getProduct().then((product) => {
        res.render("user/view-products", { product, user });
    });
});

/* GET Sign in page*/
router.get("/signup", function (req, res) {
    if (req.session.loggedIn) {
        res.redirect("/");
    } else {
        res.render("user/sign-up", { admin: false });
    }
});

router.post("/signup", function (req, res) {
    userHelper.doSignUp(req.body).then((response) => {
        res.redirect("/login");
    });
});
/*GET Login page*/
router.get("/login", function (req, res) {
    if (req.session.loggedIn) {
        res.redirect("/");
    } else {
        res.render("user/sign-in-form", { error: req.session.loginErr });
        req.session.loginErr = false;
    }
});

/* Post Login */
router.post("/login", function (req, res) {
    userHelper.doLogin(req.body).then((response) => {
        if (response.status) {
            req.session.loggedIn = true;
            req.session.user = response.user;
            res.redirect("/");
        } else {
            req.session.loginErr = true;
            res.redirect("/login");
        }
    });
});
// Logout page
router.get("/logout", (req, res) => {
    req.session.loggedIn = false;
    req.session.destroy();
    res.redirect("/login");
});

/* Requst for cart*/
router.get( "/cart",verfiyLogin, (req, res) => {
    if (req.session.loggedIn) {
        res.render("user/cart");
    } else {
        res.redirect("/login");
    }
});

module.exports = router;
