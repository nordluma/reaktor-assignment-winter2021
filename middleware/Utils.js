const fetch = require("node-fetch");

const BASE_URL = "https://bad-api-assignment.reaktor.com/v2/";

// Implement if time
exports.fetchData = async (category, req, res, next) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${category}`);
        const data = await response.json();

        return data;
    } catch (err) {
        this.errorHandling;
    }
};

exports.removeDuplicates = async (data) => {
    try {
        const manufacturers = await data.map((p) => p.manufacturer);
        const uniqueManufacturers = [...new Set(manufacturers)];

        return uniqueManufacturers;
    } catch (err) {
        this.errorHandling;
    }
};

exports.getAvailability = async (manufacturer, req, res, next) => {
    const availability_url =
        "https://bad-api-assignment.reaktor.com/v2/availability/";
    try {
        const request = await fetch(availability_url + manufacturer);
        const data = await request.json();

        console.log(data);

        return data;
    } catch (err) {
        this.errorHandling;
    }
};

exports.mergeData = exports.errorHandling = (err, req, res, next) => {
    const error = new Error(err);
    error.status = err.status || 500;
    next(error);
};
