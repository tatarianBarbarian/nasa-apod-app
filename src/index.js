import "@babel/polyfill";
import "normalize.css";
import "./blocks/b-page/b-page";
import { BNasaApod } from "./apps/b-nasa-apod/b-nasa-apod";

const nasaApod = new BNasaApod("#app");

nasaApod.init();
