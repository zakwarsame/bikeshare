const get = require("./utils/get");

function getStations(cb) {
  return new Promise((resolve, reject) => {
    get("/station_status", (err, res) => {
      if (err) {
        if (cb) cb(err);
        return reject(err);
      }

      try {
        let stations = res["data"].stations.map((station) => {
          for (let k in station) {
            let v = station[k];

            if (
              typeof v === "string" &&
              (v.trim() === "" || v.trim() === "null")
            ) {
              v = null;
            }

            station[k] = v;
          }

          if (station.last_reported) {
            station.last_reported = new Date(station.last_reported);
          }

          return station;
        });

        let total = stations.length;
        let active = stations.filter(
          (station) => station.status === "IN_SERVICE"
        ).length;

        let updated = new Date(res.last_updated);

        let parsed = {
          meta: {
            updated,
            count: { active, total },
          },
          stations,
        };

        if (cb) cb(null, parsed);
        return resolve(parsed);
      } catch (e) {
        if (cb) cb(e);
        reject(e);
      }
    });
  });
}

function getStationsInfo(cb) {
  return new Promise((resolve, reject) => {
    get("/station_information", (err, res) => {
      if (err) {
        if (cb) cb(err);
        return reject(err);
      }

      try {
        let stations = res["data"].stations.map((station) => {
          for (let k in station) {
            let v = station[k];

            if (
              typeof v === "string" &&
              (v.trim() === "" || v.trim() === "null")
            ) {
              v = null;
            }

            station[k] = v;
          }

          return station;
        });

        let total = stations.length;

        let updated = new Date(res.last_updated);

        let parsed = {
          meta: {
            updated,
            count: { total },
          },
          stations,
        };

        if (cb) cb(null, parsed);
        return resolve(parsed);
      } catch (e) {
        if (cb) cb(e);
        reject(e);
      }
    });
  });
}

module.exports = { getStations, getStationsInfo };
