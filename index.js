const https = require("https"),
  packageId = "2b44db0d-eea9-442d-b038-79335368ad5a";

// promise to retrieve the package
const getPackage = new Promise((resolve, reject) => {
  https.get(
    `https://tor.publicbikesystem.net/ube/gbfs/v1/en/station_status`,
    (response) => {
      let dataChunks = [];
      response
        .on("data", (chunk) => {
          dataChunks.push(chunk);
        })
        .on("end", () => {
          let data = Buffer.concat(dataChunks);
          // console.log("end", JSON.parse(data.toString())["data"]);
          resolve(JSON.parse(data.toString())["data"]);
        })
        .on("error", (error) => {
          reject(error);
        });
    }
  );
});

getPackage
  .then((pkg) => {
    // this is the metadata of the package
    console.log(pkg);
  })
  .catch((error) => {
    console.error(error);
  });
