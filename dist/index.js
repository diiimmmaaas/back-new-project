"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
const products = [{ id: 1, title: "tomato" }, { id: 2, title: "orange" }];
const addresses = [{ id: 1, value: "Nezalejnasti 21" }, { id: 2, value: "Selickaga 11" }];
const parseMiddleware = (0, body_parser_1.default)({});
app.use(parseMiddleware);
app.get("/products", (req, res) => {
    if (req.query.title) {
        let searchString = req.query.title.toString();
        res.send(products.filter(pr => pr.title.indexOf(searchString) > -1));
    }
    else {
        res.send(products);
    }
});
app.get("/products/:id", (req, res) => {
    let product = products.find((pr) => pr.id === +req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
});
app.get("/addresses", (req, res) => {
    res.send(addresses);
});
app.get("/addresses/:id", (req, res) => {
    let address = addresses.find((address) => address.id === +req.params.id);
    if (address) {
        res.send(address);
    }
    else {
        res.send(404);
    }
});
app.delete("/products/:id", (req, res) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +req.params.id) {
            products.splice(i, 1);
            res.send(204);
            return;
        }
    }
    res.send(404);
    let product = products.find((pr) => pr.id === +req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.send(404);
    }
});
app.post("/products", (req, res) => {
    const newProduct = { id: +(new Date()), title: req.body.title };
    products.push(newProduct);
    res.status(201).send(newProduct);
});
app.put("/products/:id", (req, res) => {
    let product = products.find((pr) => pr.id === +req.params.id);
    if (product) {
        product.title = req.body.title;
        res.send(product);
    }
    else {
        res.send(404);
    }
});
//start app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
