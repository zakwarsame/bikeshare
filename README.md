# bike-share-lib

> A lightweight Node js library to simplify the Toronto bike share API

Inspired by: https://github.com/kshvmdn/bikeshare (The API in that repo no longer works)

## Usage

#### Find a station by ID

```es6
const bikeshare = require("./lib/bikeshare");

const findBikeStationByName = (stationName) => {
  bikeshare
    .getStationsInfo()
    .then((res) => {
      const searchRegex = new RegExp(stationName.split(" ").join(".*"), "i");
      const matchingStations = res.stations.filter((station) =>
        searchRegex.test(station.name)
      );
      if (matchingStations.length > 0) {
        return matchingStations;
      } else {
        throw new Error("No matching station found");
      }
    })
    .catch((err) => console.error(err));
};
```

Example response

```es6
[
  {
    station_id: "7269",
    name: "Toronto Eaton Centre (Yonge St) - SMART",
    physical_configuration: "SMARTMAPFRAME",
    lat: 43.655431,
    lon: -79.380653,
    altitude: 0,
    address: "Toronto Eaton Centre (Yonge St)",
    capacity: 20,
    is_charging_station: false,
    rental_methods: ["KEY", "TRANSITCARD", "PHONE"],
    groups: [],
    obcn: "647-669-0729",
    nearby_distance: 1000,
    _ride_code_support: true,
    rental_uris: {},
  },
];
```

See more in `index.js`

## Testing

`npm test tests/bikeshare.test.js`
