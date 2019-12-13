const getParkings = (req, res) => {
  res.send(mockParkings);
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
