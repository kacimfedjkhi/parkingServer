import fetch from "node-fetch";

export const fetchParkingsFromGhent = async () => {
  const rawData = await fetchRawData();
  console.log("raw data", rawData);
  return rawData;
};

const fetchRawData = async () => {
  const response = await fetch(
    "https://datatank.stad.gent/4/mobiliteit/bezettingparkingsrealtime.json"
  );
  const json = await response.json();
  return json;
};
