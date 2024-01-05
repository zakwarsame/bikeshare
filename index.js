const bikeshare = require("./lib/bikeshare");
const get = require("./lib/utils/get");

const findBikeStationById = (stationId) => {
  bikeshare
    .getStationsInfo()
    .then((res) => {
      const station = res.stations.find(
        (station) => station.station_id == stationId
      );
      if (station) {
        console.log(station);
        return station;
      }
    })
    .catch((err) => console.error(err));
};

const findBikeStationByName = (stationName) => {
  bikeshare
    .getStationsInfo()
    .then((res) => {
      const searchRegex = new RegExp(stationName.split(" ").join(".*"), "i");
      const matchingStations = res.stations.filter((station) =>
        searchRegex.test(station.name)
      );
      if (matchingStations.length > 0) {
        console.log(matchingStations);
        return matchingStations;
      } else {
        throw new Error("No matching station found");
      }
    })
    .catch((err) => console.error(err));
};

const getSystemInfo = bikeshare.getSystemInfo;

const getSystemPricingPlans = bikeshare.getSystemPricingPlans;

const displaySystemPricingPlans = () => {
  bikeshare
    .getSystemPricingPlans()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.error(err));
};

findBikeStationByName("Toronto Eaton Centre");
