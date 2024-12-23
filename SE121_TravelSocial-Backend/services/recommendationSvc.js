const { PredictionServiceClient } = require("@google-cloud/retail");
const config = require('../config');

const client = new PredictionServiceClient({ keyFilename: config.keyFilename });

exports.getRecommendations = async (visitorId, userId, productId) => {
  const placement = `projects/${config.projectId}/locations/global/catalogs/default_catalog/servingConfigs/${config.servingConfigId}`;

  const request = {
    placement: placement,
    visitorId: visitorId,
    userEvent: {
      visitorId: visitorId,
      eventType: "detail-page-view",
      userInfo: { userId: userId },
      productDetails:[{ product: { id: productId } }],
    },
    page_size: 5,
  };

  const [response] = await client.predict(request);
  return {
    recommendations: response.results.map(result => ({
      id: result.id,
      product: result.product,
    })),
    attribution_token: response.attribution_token,
  };
};