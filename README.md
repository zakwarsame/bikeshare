# bike-share-lib

> A lightweight Node js library to simplify the Toronto bike share API

## Installation

`npm install bike-share-lib`

## Usage

#### Find a station by Name

```es6
const bikeshare = require("bike-share-lib/lib/bikeshare");

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

findBikeStationByName("Toronto Eaton Centre");
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

## Misc

### List of all original endpoints

Available [here](https://ckan0.cf.opendata.inter.prod-toronto.ca/dataset/2b44db0d-eea9-442d-b038-79335368ad5a/resource/b69873a1-c180-4ccd-a970-514e434b4971/download/bike-share-gbfs-general-bikeshare-feed-specification.json)

```json
{
  "last_updated": 1563373889,
  "ttl": 19,
  "data": {
    "en": {
      "feeds": [
        {
          "name": "system regions",
          "url": "https://tor.publicbikesystem.net/ube/gbfs/v1/en/system_regions"
        },
        {
          "name": "system_information",
          "url": "https://tor.publicbikesystem.net/ube/gbfs/v1/en/system_information"
        },
        {
          "name": "station_information",
          "url": "https://tor.publicbikesystem.net/ube/gbfs/v1/en/station_information"
        },
        {
          "name": "station_status",
          "url": "https://tor.publicbikesystem.net/ube/gbfs/v1/en/station_status"
        },
        {
          "name": "system_pricing_plans",
          "url": "https://tor.publicbikesystem.net/ube/gbfs/v1/en/system_pricing_plans"
        }
      ]
    }
  }
}
```

Sourced via [Open Data - City of Toronto](https://www.toronto.ca/city-government/data-research-maps/open-data/)

Inspired by: https://github.com/kshvmdn/bikeshare (The API in that repo no longer works)
