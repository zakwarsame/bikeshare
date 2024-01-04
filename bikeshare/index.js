const bikeshare = require("./lib/bikeshare");
require("dotenv").config();
const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

let ebikeAvailable = false;

const checkBikeStation = (stationId) => {
  bikeshare
    .getStations()
    .then((res) => {
      const station = res.stations.find(
        (station) => station.station_id == stationId
      );
      if (station) {
        if (station.num_bikes_available_types.ebike > 0 && !ebikeAvailable) {
          ebikeAvailable = true;
          client.messages
            .create({
              body: `E-bike available at station ${station.id}!}. E-bikes: ${station.num_bikes_available_types.ebike}`,
              from: process.env.TWILIO_PHONE_NUMBER,
              to: process.env.MY_PHONE_NUMBER,
            })
            .then((message) => console.log(message.sid))
            .catch((err) => console.error(err));
        } else if (station.num_bikes_available_types.ebike === 0) {
          ebikeAvailable = false;
        }
      }
    })
    .catch((err) => console.error(err));
};

const findBikeStationWithId = (stationId) => {
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

const findBikeStationWithName = (stationName) => {
  bikeshare
    .getStationsInfo()
    .then((res) => {
      // A regex from the search string, splitting on spaces and joining with '.*' to match any characters in between words
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

// Check every 10 minutes
// setInterval(checkBikeStation, 10 * 60 * 1000);

findBikeStationWithName("Lake Shore Blvd");
