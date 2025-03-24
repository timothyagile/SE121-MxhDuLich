const recommendationService = require('../services/recommendationSvc');

exports.getRecommendations = async (req, res) => {
  try {
    const visitorId = req.body.visitorId || "visitor55";
    const userId = req.body.userId || "guest_user";
    const productId = req.body.productId || "6704f3650722c4f99305dc01";

    const recommendations = await recommendationService.getRecommendations(visitorId, userId, productId);

    res.json(recommendations);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
};