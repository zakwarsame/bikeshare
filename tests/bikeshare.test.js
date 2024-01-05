const {
  getStations,
  getStationsInfo,
  getSystemInfo,
  getSystemPricingPlans,
} = require("../lib/bikeshare");
jest.mock("../lib/utils/get");

describe("getStations", () => {
  it("should resolve with station data on success", async () => {
    const mockStation = {
      station_id: "7000",
      name: "Fort York  Blvd / Capreol Ct",
      physical_configuration: "REGULAR",
      lat: 43.639832,
      lon: -79.395954,
      altitude: 0,
      address: "Fort York  Blvd / Capreol Ct",
      capacity: 35,
      is_charging_station: false,
      rental_methods: ["KEY", "TRANSITCARD", "CREDITCARD", "PHONE"],
      groups: [],
      obcn: "647-643-9607",
      nearby_distance: 500,
      _ride_code_support: true,
      rental_uris: {},
    };

    require("../lib/utils/get").mockImplementation((url, callback) => {
      callback(null, {
        data: {
          stations: [mockStation],
        },
        last_updated: "2023-03-22T22:00:00Z",
      });
    });

    const result = await getStations();
    expect(result.stations).toContainEqual(mockStation);
  });

  it("should reject with an error on failure", async () => {
    require("../lib/utils/get").mockImplementation((url, callback) => {
      callback(new Error("Network error"), null);
    });

    await expect(getStations()).rejects.toThrow("Network error");
  });
});

describe("getStationsInfo", () => {
  it("should resolve with station info on success", async () => {
    const mockStationInfo = {
      station_id: "7000",
      num_bikes_available: 19,
      num_bikes_available_types: {
        mechanical: 19,
        ebike: 0,
      },
      num_bikes_disabled: 1,
      num_docks_available: 15,
      num_docks_disabled: 0,
      last_reported: 1704423724,
      is_charging_station: false,
      status: "IN_SERVICE",
      is_installed: 1,
      is_renting: 1,
      is_returning: 1,
      traffic: null,
    };

    require("../lib/utils/get").mockImplementation((url, callback) => {
      callback(null, {
        data: {
          stations: [mockStationInfo],
        },
        last_updated: "2023-03-23T22:00:00Z",
      });
    });

    const result = await getStationsInfo();
    expect(result.stations).toContainEqual(mockStationInfo);
    expect(result.meta).toBeDefined();
    expect(result.meta.count.total).toBe(1);
  });

  it("should reject with an error on failure", async () => {
    require("../lib/utils/get").mockImplementation((url, callback) => {
      callback(new Error("Network error"), null);
    });

    await expect(getStationsInfo()).rejects.toThrow("Network error");
  });
});

describe("getSystemInfo", () => {
  it("should resolve with system information on success", async () => {
    const mockSystemInfo = {
      station_id: "7000",
      name: "Fort York  Blvd / Capreol Ct",
      physical_configuration: "REGULAR",
      lat: 43.639832,
      lon: -79.395954,
      altitude: 0,
      address: "Fort York  Blvd / Capreol Ct",
      capacity: 35,
      is_charging_station: false,
      rental_methods: ["KEY", "TRANSITCARD", "CREDITCARD", "PHONE"],
      groups: [],
      obcn: "647-643-9607",
      nearby_distance: 500,
      _ride_code_support: true,
      rental_uris: {},
    };

    require("../lib/utils/get").mockImplementation((url, callback) => {
      callback(null, { data: mockSystemInfo });
    });

    const result = await getSystemInfo();
    expect(result).toEqual(mockSystemInfo);
  });

  it("should reject with an error on failure", async () => {
    require("../lib/utils/get").mockImplementation((url, callback) => {
      callback(new Error("Network error"), null);
    });

    await expect(getSystemInfo()).rejects.toThrow("Network error");
  });
});

describe("getSystemPricingPlans", () => {
  it("should resolve with system pricing plans on success", async () => {
    const mockPricingPlans = {
      plans: [
        {
          plan_id: "186",
          name: "Annual 30",
          currency: "CAD",
          price: 105,
          description: "Unlimited 30-min trips on classic bikes",
          is_taxable: 1,
        },
      ],
    };

    require("../lib/utils/get").mockImplementation((url, callback) => {
      callback(null, { data: mockPricingPlans });
    });

    const result = await getSystemPricingPlans();
    expect(result.plans).toEqual(mockPricingPlans.plans);
  });

  it("should reject with an error on failure", async () => {
    require("../lib/utils/get").mockImplementation((url, callback) => {
      callback(new Error("Network error"), null);
    });

    await expect(getSystemPricingPlans()).rejects.toThrow("Network error");
  });
});
