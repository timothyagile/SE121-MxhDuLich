require("dotenv").config();

module.exports = {
  keyFilename: process.env.KEY_FILE,
  projectId: process.env.PROJECT_ID,
  servingConfigId: process.env.SERVING_CONFIG_ID,
};