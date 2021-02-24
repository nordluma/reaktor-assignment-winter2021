const express = require("express");
const bp = require("body-parser");
const morgan = require("morgan");

const productRoutes = require("./routes/products.routes");

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.use("/api/products", productRoutes);

app.use((req, res, next) => {
    const error = new Error("Requested resource not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res) => {
    res.status(error.status || 500).json({
        status: error.status,
        error: error.message,
    });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
