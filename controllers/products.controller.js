const fetch = require("node-fetch");

const {
    fetchData,
    getAvailability,
    errorHandling,
} = require("../middleware/Utils");

const BASE_URL = "https://bad-api-assignment.reaktor.com/v2/products";

// @desc    Get all beanies
// @route   GET /beanies
// @access  Public
exports.getBeanies = async (req, res, next) => {
    try {
        const response = await fetch(`${BASE_URL}/beanies`);
        const data = await response.json();

        /* const availability = getAvailability(data);
        console.log(availability); */

        res.status(200).json(data);
    } catch (err) {
        const error = new Error(err);
        error.status = err.status || 500;
        next(error);
    }
};

// @desc    Get all facemasks
// @route   GET /facemasks
// @access  Public
exports.getFacemasks = async (req, res, next) => {
    try {
        const data = fetchData("facemasks");

        res.status(200).json(data);
    } catch (err) {
        errorHandling(err);
    }
};

// @desc    Get all gloves
// @route   GET /gloves
// @access  Public
exports.getGloves = async (req, res, next) => {
    try {
        const data = fetchData("gloves");

        res.status(200).json(gloves);
    } catch (err) {
        errorHandling(err);
    }
};
