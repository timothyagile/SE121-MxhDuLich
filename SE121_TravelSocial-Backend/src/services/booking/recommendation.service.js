const { PredictionServiceClient } = require("@google-cloud/retail");
const config = require('../../config');

const client = new PredictionServiceClient({ keyFilename: config.keyFilename });

exports.getRecommendations = async (visitorId, userId, productId) => {
  const placement = `projects/${config.projectId}/locations/global/catalogs/default_catalog/servingConfigs/${config.servingConfigId}`;

  const request = {
    placement: placement,
    visitorId: visitorId,
    userEvent: {
      visitorId: visitorId,
      eventType: "home-page-view",
      userInfo: { userId: userId },
      productDetails:[{ product: {id:productId}}],
    },
    page_size: 20,
  };

  const [response] = await client.predict(request);
  return {
    isSuccess: true,
    recommendations: response.results.map(result => ({
      id: result.id,
    })),
    attribution_token: response.attribution_token,
  };
};

exports.getOtherMayYouLike = async (visitorId, userId, productId) => {
  const placement = `projects/${config.projectId}/locations/global/catalogs/default_catalog/servingConfigs/${config.servingConfig2Id}`;
  const request = {
    placement: placement,
    visitorId: visitorId,
    userEvent: {
      visitorId: visitorId,
      eventType: "home-page-view",
      userInfo: { userId: userId },
      productDetails:[{ product: {id:productId}}],
    },
    page_size: 20,
  };

  const [response] = await client.predict(request);
  return {
    isSuccess: true,
    recommendations: response.results.map(result => ({
      id: result.id,
    })),
    attribution_token: response.attribution_token,
  };
};