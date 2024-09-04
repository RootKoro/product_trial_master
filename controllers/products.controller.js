const asyncHandler = require('express-async-handler');

// @desc Get all the products
// @route GET /api/v1/products
// @access public
export const getProducts = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'get-products'});
});

// @desc Get one specific product
// @route GET /api/v1/products/:id
// @access public
export const getProduct = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'get-product: ' + req.params.id});
});

// @desc Create a new product
// @route POST /api/v1/products
// @access public
export const createProduct = asyncHandler(async (req, res) => {
    res.status(201).json({message : 'post-product: created successfully'});
});

// @desc Update an existing product
// @route PATCH /api/v1/products/:id
// @access public
export const updateProduct = asyncHandler(async (req, res) => {
    res.status(200).json({message : 'patch-product: ' + req.params.id});
});

// @desc Delete an existing product
// @route DELETE /api/v1/products/:id
// @access public
export const deleteProduct = asyncHandler(async (req, res) => {
    res.status(204);
});
