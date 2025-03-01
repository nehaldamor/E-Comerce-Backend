const reportsService = require('../services/reports.service');

module.exports.getSalesReports = async (req, res) => {
    try {
        const salesReport = await reportsService.getSalesCategoryWise();
        const topSelling = await reportsService.getTopSellingProducts();
        const worstSelling = await reportsService.getWorstSellingProducts();

        res.status(200).json({
            salesCategoryWise: salesReport,
            topSellingProducts: topSelling,
            worstSellingProducts: worstSelling
        });

    } catch (error) {
        console.error('Get Sales Reports Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
