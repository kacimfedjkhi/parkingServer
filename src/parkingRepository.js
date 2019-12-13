import { distance } from "./locationUtils";
import { fetchParkingsFromGhent } from "./dataSources/gent";
import {
  fetchParkingsFromKortrijk,
  fetchParkingsFromLeuven,
  fetchParkingsFromSintNiklaas
} from "./dataSources/openData";

const getParkingsForLocation = async (latitude, longitude) => {
  const dataSource = findClosestDataSource(latitude, longitude);
  console.log("closest source", dataSource);
  return await dataSource.fetchParkings();
};

const findClosestDataSource = (latitude, longitude) => {
  const closestSource = dataSources
    .map(source => {
      console.log(distance);
      const distanceToSource = distance(
        source.latitude,
        source.longitude,
        latitude,
        longitude,
        "K"
      );
      return {
        distance: distanceToSource,
        fetchParkings: source.fetchParkings
      };
    })
    .sort(sortByDistance)[0];
  console.log(closestSource);
  return closestSource;
};

const sortByDistance = (a, b) => a.distance - b.distance;

const radius = 50; // 50 km

const dataSources = [
  {
    name: "Ghent",
    latitude: 51.05434,
    longitude: 3.717424,
    fetchParkings: fetchParkingsFromGhent
  },
  {
    name: "Kortrijk",
    latitude: 50.827969,
    longitude: 3.26493,
    fetchParkings: fetchParkingsFromKortrijk
  },
  {
    name: "Leuven",
    latitude: 50.879829,
    longitude: 4.70054,
    fetchParkings: fetchParkingsFromLeuven
  },
  {
    name: "Sint-Niklaas",
    latitude: 51.164551,
    longitude: 4.13922,
    fetchParkings: fetchParkingsFromSintNiklaas
  }
];

export default getParkingsForLocation;
