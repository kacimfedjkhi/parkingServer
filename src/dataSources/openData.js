import ldfetch from "ldfetch";
//import jsonld from "jsonld";

export const fetchParkingsFromKortrijk = () =>
  fetchParkings("https://kortrijk.datapiloten.be/parking");
export const fetchParkingsFromLeuven = () =>
  fetchParkings("https://leuven.datapiloten.be/parking");
export const fetchParkingsFromSintNiklaas = () =>
  fetchParkings("https://sint-niklaas.datapiloten.be/parking");

const fetchParkings = async url => {
  const parkings = [];
  let fetch = new ldfetch({}); //options: allow to add more headers if needed
  let response = await fetch.get(url);
  let responsetriples = response.triples;
  let objects = triplesToObjects(responsetriples);
  const timeseries = [];

  if (
    objects[response.url] &&
    objects[response.url]["http://www.w3.org/ns/hydra/core#previous"]
  ) {
    const response2 = await fetch.get(
      objects[response.url]["http://www.w3.org/ns/hydra/core#previous"]
    );
    //put all triples in one pile
    responsetriples = response.triples.concat(response2.triples);
    //and we need to run this again
    objects = triplesToObjects(responsetriples);
  }

  const graphs = quadsToObjects(responsetriples);
  //now, create an overview of the timeseries per parking site
  for (const graphname in graphs) {
    for (const subject in graphs[graphname]) {
      const parkingObservation = graphs[graphname][subject];
      if (
        parkingObservation[
          "http://vocab.datex.org/terms#parkingNumberOfVacantSpaces"
        ]
      ) {
        const observation = {};
        observation.time =
          objects[graphname]["http://www.w3.org/ns/prov#generatedAtTime"];
        observation.subject = subject;
        observation.value =
          parkingObservation[
            "http://vocab.datex.org/terms#parkingNumberOfVacantSpaces"
          ];
        observation.max =
          objects[subject][
            "http://vocab.datex.org/terms#parkingNumberOfSpaces"
          ];
        timeseries.push(observation);
      }
    }
  }

  timeseries.sort((a, b) => a.time.getTime() - b.time.getTime());

  for (const subject in objects) {
    const entity = objects[subject];
    if (
      entity["http://www.w3.org/1999/02/22-rdf-syntax-ns#type"] ===
      "http://vocab.datex.org/terms#UrbanParkingSite"
    ) {
      const parking = {
        name: entity["http://www.w3.org/2000/01/rdf-schema#label"],
        latitude: "empty",
        longitude: "empty",
        availableSpaces:
          entity["http://vocab.datex.org/terms#parkingNumberOfVacantSpaces"],
        totalSpaces:
          entity["http://vocab.datex.org/terms#parkingNumberOfSpaces"]
      };

      if (parking.availableSpaces) {
        parkings.push(parking);
      }
    }
  }
  return parkings;
};

// This is the first Linked Data helper function:
// It takes the list of triples as an argument, and returns a summary of everything we know about a certain subject in one object
const triplesToObjects = function(triples) {
  console.log("in triples func!!");

  const objects = {};
  for (const index in triples) {
    const triple = triples[index];
    if (!objects[triple.subject.value]) {
      objects[triple.subject.value] = {};
    }
    objects[triple.subject.value][triple.predicate.value] = triple.object.value;

    if (
      triple.predicate.value === "http://www.w3.org/ns/prov#generatedAtTime"
    ) {
      objects[triple.subject.value][triple.predicate.value] = new Date(
        objects[triple.subject.value][triple.predicate.value]
      );
    }
  }
  return objects;
};

const quadsToObjects = function(quads) {
  const graphs = {};
  for (const index in quads) {
    const quad = quads[index];
    if (!graphs[quad.graph.value]) {
      graphs[quad.graph.value] = {};
    }
    const objects = graphs[quad.graph.value];
    if (!objects[quad.subject.value]) {
      objects[quad.subject.value] = {};
    }
    objects[quad.subject.value][quad.predicate.value] = quad.object.value;
    graphs[quad.graph.value] = objects;
  }
  return graphs;
};
