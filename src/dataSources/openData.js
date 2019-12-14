import ldfetch from "ldfetch";
import jsonld from "jsonld";

export const fetchParkingsFromKortrijk = () =>
  fetchParkings("https://kortrijk.datapiloten.be/parking");
export const fetchParkingsFromLeuven = () =>
  fetchParkings("https://leuven.datapiloten.be/parking");
export const fetchParkingsFromSintNiklaas = () =>
  fetchParkings("https://sint-niklaas.datapiloten.be/parking");

const fetchParkings = async url => {
  try {
    let fetch = new ldfetch({}); //options: allow to add more headers if needed
    let response = await fetch.get(url);
    for (let i = 0; i < response.triples.length; i++) {
      let triple = response.triples[i];
      if (
        triple.subject.value === response.url &&
        triple.predicate.value === "http://www.w3.org/ns/hydra/core#next"
      ) {
        console.error("The next page is: ", triple.object.value);
      }
    }
    jsonld.frame(response.triples, {}).then(object => {
      console.log(
        "Or you can also use the JSON-LD frame functionality to get what you want in a JS object",
        object
      );
    });
  } catch (e) {
    console.error(e);
  }
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
