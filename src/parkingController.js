import getParkingsForLocation from "./parkingRepository";

const getParkings = async (req, res) => {
  // get parameters
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  console.log("location", { latitude, longitude });

  // get parkings for location
  const parkings = await getParkingsForLocation(latitude, longitude);

  // send parkings
  // res.send(mockParkings);
  res.send(parkings);
};

export default getParkings;

const mockParkings = [
  {
    name: "P Broeltorens",
    availableSpaces: 129,
    totalSpaces: 320,
    latitude: 50.7654,
    longitude: 0.5433
  },
  {
    name: "P K in kortrijk",
    availableSpaces: 329,
    totalSpaces: 620,
    latitude: 50.7654,
    longitude: 0.5433
  }
];
