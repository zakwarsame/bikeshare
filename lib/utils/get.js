const https = require("https");

function get(path = "", cb) {
  const options = {
    hostname: "tor.publicbikesystem.net",
    path: `/ube/gbfs/v1/en/${path}`,
    method: "GET",
  };
  let body, req;

  req = https.request(options, (res) => {
    let dataChunks = [];

    res.on("data", (chunk) => {
      dataChunks.push(chunk);
    });

    res.on("end", () => {
      try {
        let data = Buffer.concat(dataChunks);

        return cb(null, JSON.parse(data.toString()));
      } catch (e) {
        return cb(e, null);
      }
    });
  });

  req.on("error", (error) => cb(error));

  req.end();
}

module.exports = exports = get;
