const orderModel = require('../models/order.model');
const productModel = require('../models/product.model');

module.exports.getSalesCategoryWise = async () => {
    const report = await orderModel.aggregate([
        { $unwind: "$products" },
        {
            $lookup: {
                from: "products",
                localField: "products.productId",
                foreignField: "_id",
                as: "productDetails"
            }
        },
        { $unwind: "$productDetails" },
        {
            $lookup: {
                from: "categories",
                localField: "productDetails.category",
                foreignField: "_id",
                as: "categoryDetails"
            }
        },
        { $unwind: "$categoryDetails" },
        {
            $group: {
                _id: "$categoryDetails.name",
                totalSales: { $sum: "$products.quantity" }
            }
        },
        { $project: { category: "$_id", totalSales: 1, _id: 0 } }
    ]);
    return report;
};

module.exports.getTopSellingProducts = async () => {
    const report = await orderModel.aggregate([
        { $unwind: "$products" },
        {
            $group: {
                _id: "$products.productId",
                totalSold: { $sum: "$products.quantity" }
            }
        },
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "productDetails"
            }
        },
        { $unwind: "$productDetails" },
        {
            $project: {
                productId: "$_id",
                name: "$productDetails.name",
                totalSold: 1,
                _id: 0
            }
        },
        { $sort: { totalSold: -1 } }
    ]);
    return report;
};

module.exports.getWorstSellingProducts = async () => {
    const allProducts = await productModel.find({}, '_id name');
    const soldProducts = await orderModel.aggregate([
        { $unwind: "$products" },
        {
            $group: {
                _id: "$products.productId",
                totalSold: { $sum: "$products.quantity" }
            }
        }
    ]);

    const soldProductIds = soldProducts.map(p => p._id.toString());

    const worstProducts = allProducts
        .filter(p => !soldProductIds.includes(p._id.toString()))
        .map(p => ({
            productId: p._id,
            name: p.name,
            soldCount: 0
        }));

    return worstProducts;
};
