const fetch = require("node-fetch");

const {
    fetchData,
    getAvailability,
    removeDuplicates,
    addAvailability,
    errorHandling,
} = require("../utils/Utils");

const BASE_URL = "https://bad-api-assignment.reaktor.com/v2/products";

// @desc    Get all beanies
// @route   GET /beanies
// @access  Public
exports.getBeanies = async (req, res, next) => {
    try {
        // Fetches all beanies
        const data = await fetchData(`${BASE_URL}/beanies`);

        // Removes duplicate brands
        const uniqueBrands = removeDuplicates(data);

        // Fetches availability for all unique manufacturers
        const availability = await getAvailability(uniqueBrands);

        // Creates an array of availability ids
        const availabilityIds = availability.map((a) =>
            Promise.all(a.response.map((item) => item.id))
        );

        // Creates an array of product ids
        const productIds = data.map((p) => {
            return p.id;
        });

        // filters
        const filteredAvailability = availability.filter((value) =>
            productIds.map((item) => item.includes(value))
        );

        console.log(
            `Availability: ${availabilityIds.map((brand) => brand.length)}`
        );

        console.log(
            `Filtered Availability: ${filteredAvailability.map(
                (item) => item.length
            )}`
        );
        console.log(`Products: ${productIds.length}`);

        ////////////////////////////////////////////////////////

        /* const equalsIgnoreOrder = (a, b) => {
            if (a.length !== b.length) return false;
            const uniqueValues = new Set([...a, ...b]);
            for (const v of uniqueValues) {
                const aCount = a.filter((e) => e === v).length;
                const bCount = b.filter((e) => e === v).length;
                if (aCount !== bCount) return false;
            }
            return true;
        };

        const answer = equalsIgnoreOrder(
            availabilityArray,
            filteredAvailability
        );

        console.log(answer); */

        ////////////////////////////////////////////////////////

        res.status(200).json(filteredAvailability);
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
