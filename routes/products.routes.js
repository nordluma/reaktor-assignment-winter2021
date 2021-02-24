const router = require("express").Router();

const {
    getBeanies,
    getFacemasks,
    getGloves,
} = require("../controllers/products.controller");

router.get("/beanies", getBeanies);
router.get("/facemasks", getFacemasks);
router.get("/gloves", getGloves);

module.exports = router;
