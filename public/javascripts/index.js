import define from "./Exoplanet.js";
import {Runtime, Library, Inspector} from "./runtime.js";

const runtime = new Runtime();
const main = runtime.module(define, Inspector.into(document.body));

document.getElementsByClassName("observablehq")[0].className="vue";
