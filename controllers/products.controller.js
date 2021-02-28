const fetch = require("node-fetch");

const {
    fetchData,
    getAvailability,
    removeDuplicates,
    mergeProductsAndAvailability,
    errorHandling,
} = require("../utils/Utils");

const BASE_URL = "https://bad-api-assignment.reaktor.com/v2/products/";

// @desc    Get all beanies
// @route   GET /beanies
// @access  Public
exports.getBeanies = async (req, res, next) => {
    try {
        // Fetches all beanies
        const data = await fetchData(`${BASE_URL}beanies`);

        // Remove duplicate manufacturers and fetch availability
        const availability = await getAvailability(removeDuplicates(data));

        const array = availability.map((item) => item.response);
        const availabilityArray = [].concat.apply([], array);

        const filteredAvailability = availabilityArray.filter((value) =>
            data.map((product) => product.id.includes(value.id))
        );

        console.log(`Availability: ${availabilityArray.length}`);
        console.log(`Filtered: ${filteredAvailability.length}`);

        const mergedArrayObjects = mergeProductsAndAvailability(
            data,
            availabilityArray
        );

        res.status(200).json(mergedArrayObjects);
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
        // Fetches all facemasks
        const data = await fetchData(`${BASE_URL}facemasks`);

        // Remove duplicate manufacturers and fetch availability
        const availability = await getAvailability(removeDuplicates(data));

        const array = availability.map((item) => item.response);
        const availabilityArray = [].concat.apply([], array);

        const filteredAvailability = availabilityArray.filter((value) =>
            data.map((product) => product.id.includes(value.id))
        );

        console.log(`Availability: ${availabilityArray.length}`);
        console.log(`Filtered: ${filteredAvailability.length}`);

        const mergedArrayObjects = mergeProductsAndAvailability(
            data,
            availabilityArray
        );

        res.status(200).json(mergedArrayObjects);
    } catch (err) {
        const error = new Error(err);
        error.status = err.status || 500;
        next(error);
    }
};

// @desc    Get all gloves
// @route   GET /gloves
// @access  Public
exports.getGloves = async (req, res, next) => {
    try {
        // Fetches all gloves
        const data = await fetchData(`${BASE_URL}gloves`);

        // Remove duplicate manufacturers and fetch availability
        const availability = await getAvailability(removeDuplicates(data));

        const array = availability.map((item) => item.response);
        const availabilityArray = [].concat.apply([], array);

        const filteredAvailability = availabilityArray.filter((value) =>
            data.map((product) => product.id.includes(value.id))
        );

        console.log(`Availability: ${availabilityArray.length}`);
        console.log(`Filtered: ${filteredAvailability.length}`);

        const mergedArrayObjects = mergeProductsAndAvailability(
            data,
            availabilityArray
        );

        res.status(200).json(mergedArrayObjects);
    } catch (err) {
        const error = new Error(err);
        error.status = err.status || 500;
        next(error);
    }
};
