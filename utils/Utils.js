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
        const requests = manufacturer.map(async (brand) => {
            const url = `https://bad-api-assignment.reaktor.com/v2/availability/${brand}`;
            const a = fetchData(url);
            return a;
        });

        return Promise.all(requests);
    } catch (err) {
        const error = new Error(err);
        error.status = err.status || 500;
        console.log(error);
    }
};

const mergeProductsAndAvailability = (productData, availabilityData) => {
    let result = [];
    productData.forEach((pd) => {
        const { id, type, name, color, price, manufacturer } = pd;
        let product = {
            id,
            type,
            name,
            color,
            price,
            manufacturer,
            availability: null,
        };
        let availabilityList = availabilityData.map((ad) => ad);
        let foundIds = availabilityList.find((item) => item.id === id);
        if (foundIds > 0) {
            foundIds.forEach((fIds) => {
                product.availability.push(fIds.DATAPAYLOAD);
            });
        }
        result.push(product);
    });

    return result;
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
    mergeProductsAndAvailability,
    errorHandling,
};
