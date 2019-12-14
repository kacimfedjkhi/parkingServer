import axios from "axios";

export const fetchParkingsFromGhent = async () => {
  const rawData = await fetchRawData();
  //console.log("raw data", rawData);
  return rawData.map(parseParking);
};

const fetchRawData = async () => {
  const response = await axios(
    "https://datatank.stad.gent/4/mobiliteit/bezettingparkingsrealtime.json"
  );
  return response.data;
};

const parseParking = raw => {
  return {
    name: raw.description,
    latitude: raw.latitude,
    longitude: raw.longitude,
    availableSpaces: raw.parkingStatus.availableCapacity,
    totalSpaces: raw.parkingStatus.totalCapacity
  };
};
/*
{
  "id": 18408,
  "lastModifiedDate": "2016-04-12T12:58:15.673Z",
  "name": "P07 Sint-Michiels",
  "description": "Sint-Michiels",
  "latitude": 51.05367,
  "longitude": 3.7186,
  "address": "Sint-Michielsplein 8\n9000 Gent",
  "contactInfo": "Tel.: 09 266 29 20",
  "city": {
      "id": 1004,
      "name": "Gent"
  },
  "parkingServer": {
      "id": 1005,
      "name": "ITG Gent"
  },
  "suggestedFreeThreshold": 4,
  "suggestedFullThreshold": 4,
  "capacityRounding": 1,
  "totalCapacity": 450,
  "openingTimes": [
      {
          "days": [
              "MONDAY",
              "TUESDAY",
              "WEDNESDAY",
              "THURSDAY",
              "FRIDAY",
              "SATURDAY",
              "SUNDAY"
          ],
          "from": "00:00",
          "to": "23:59"
      }
  ],
  "parkingStatus": {
      "availableCapacity": 99,
      "totalCapacity": 465,
      "open": true,
      "suggestedCapacity": "ACTUAL",
      "activeRoute": "",
      "lastModifiedDate": "13/12/2019 16:29:00"
  }
}
*/
