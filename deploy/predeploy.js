const axios = require("axios");
const axiosConcurrency = require("axios-concurrency");
const config = require("./config.js");
const fs = require("fs");
const glob = require("glob");

let renderer = axios.create({
  baseURL: "https://api.storyblok.com/v1/spaces/" + config.storyblok.spaceId,
});
axiosConcurrency.ConcurrencyManager(renderer, (MAX_CONCURRENT_REQUESTS = 1));

const init = () => {
  let dir = "dist";

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    fs.mkdirSync("dist/assets");
  }

  glob(".output/public/**", { nodir: true }, (error, filePaths) => {
    filePaths.forEach((filePath) => {
      if (filePath.includes("_nuxt")) {
        const newPath = filePath.replace(".output/public/_nuxt", "dist/assets");
        fs.copyFile(filePath, newPath, (err) => {
          if (err) throw err;
        });
      } else if (filePath.includes("page.liquid")) {
        const newPath = filePath.replace(".output/public", "dist");
        fs.copyFile(filePath, newPath, (err) => {
          if (err) throw err;
        });
      }
    });
  });
};

init();
