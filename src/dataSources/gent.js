import axios from "axios";

export const fetchParkingsFromGhent = async () => {
  const rawData = await fetchRawData();
  console.log("raw data", rawData);
  return rawData;
};

const fetchRawData = async () => {
  const response = await axios(
    "https://datatank.stad.gent/4/mobiliteit/bezettingparkingsrealtime.json"
  );
  return response.data;
};
