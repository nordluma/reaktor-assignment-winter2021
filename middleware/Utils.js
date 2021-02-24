const fetch = require("node-fetch");

const BASE_URL = "https://bad-api-assignment.reaktor.com/v2/";

exports.fetchData = async (category, req, res, next) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${category}`);
        const data = await response.json();

        return data;
    } catch (err) {
        this.errorHandling;
    }
};

exports.getAvailability = async (category, req, res, next) => {
    const availability_url =
        "https://bad-api-assignment.reaktor.com/v2/availability/";
    try {
        let avalilabilityData = await Promise.all(
            category.map((p) =>
                fetch(availability_url + p.manufacturer).then((res) =>
                    res.json()
                )
            )
        );
        return avalilabilityData;
    } catch (err) {
        this.errorHandling;
    }
};

exports.errorHandling = (err, req, res, next) => {
    const error = new Error(err);
    error.status = err.status || 500;
    next(error);
};
