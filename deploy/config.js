require("dotenv").config();

module.exports = {
  storyblok: {
    PRIVATE_MANAGEMENT_TOKEN: process.env.DEPLOY_PRIVATE_MANAGEMENT_TOKEN,
    spaceId: "163682",
    domain: "https://217dd6dd.me.storyblok.com",
    themeToken: process.env.DEPLOY_THEME_TOKEN,
    debug: false,
  },
};
