const fetch = require("node-fetch");

const BASE_URL = "https://bad-api-assignment.reaktor.com/v2";

// Implement if time
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();

        return data;
    } catch (err) {
        const error = new Error(err);
        error.status = err.status || 500;
        console.log(error);
    }
};

const removeDuplicates = (data) => {
    try {
        const manufacturers = data.map((p) => p.manufacturer);
        const uniqueManufacturers = [...new Set(manufacturers)];

        return uniqueManufacturers;
    } catch (err) {
        const error = new Error(err);
        error.status = err.status || 500;
        console.log(error);
    }
};

const getAvailability = async (manufacturer) => {
    try {
        const requests = manufacturer.map((brand) => {
            const url = `https://bad-api-assignment.reaktor.com/v2/availability/${brand}`;
            return fetchData(url).then((a) => {
                return a;
            });
        });

        return Promise.all(requests);
    } catch (err) {
        const error = new Error(err);
        error.status = err.status || 500;
        console.log(error);
    }
};

const getAvailabilityId = (availability) => {
    try {
        return availability.map((a) => a.response.map((item) => item.id));
    } catch (err) {
        const error = new Error(err);
        error.status = err.status || 500;
        console.log(error);
    }
};

// maybe
const addAvailability = (availability, productId) => {
    return availability.find((a) => a.id == productId);
};

// Implement if time
const errorHandling = (err, req, res, next) => {
    const error = new Error(err);
    error.status = err.status || 500;
    console.log(error);
};

module.exports = {
    fetchData,
    removeDuplicates,
    getAvailability,
    getAvailabilityId,
    addAvailability,
    errorHandling,
};
