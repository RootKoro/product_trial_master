import asyncHandler from 'express-async-handler'
import { Product } from '../models/products.model.js';

// @desc Get all the products
// @route GET /api/v1/products
// @access public
export const getProducts = asyncHandler (async (req, res) => {
    const products = await Product.findAll()
    res.status(200).json(products);
});

// @desc Get one specific product
// @route GET /api/v1/products/:id
// @access public
export const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByPk(req.params.id)
    res.status(200).json(product);
});

// @desc Create a new product
// @route POST /api/v1/products
// @access public
export const createProduct = asyncHandler(async (req, res) => {
    let product_body = req.body
    product_body.createdAt = new Date()
    product_body.updatedAt = new Date()
    const product = await Product.create(product_body)
    res.status(201).json(product);
});

// @desc Update an existing product
// @route PATCH /api/v1/products/:id
// @access public
export const updateProduct = async (req, res) => {
    let product_body = req.body
    product_body.updatedAt = new Date()
    await Product.update(product_body, {where: {id: req.params.id}})
    const product = await Product.findByPk(req.params.id)

    res.status(200).json(product);
}

// @desc Delete an existing product
// @route DELETE /api/v1/products/:id
// @access public
export const deleteProduct = async (req, res) => {
    await Product.destroy({where: {id: req.params.id}});
    res.status(204);
}
