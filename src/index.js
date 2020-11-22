import "@babel/polyfill";
import "normalize.css";
import "./blocks/b-page/b-page";
import { BNasaApod } from "./apps/b-nasa-apod/b-nasa-apod";

document.addEventListener('DOMContentLoaded', () => {
    const appHtml = `
        <div class="b-nasa-apod">
            <div class="b-nasa-apod__controls">
            <button
                class="b-nasa-apod__button b-nasa-apod__button_type_prev b-nasa-apod__control"
                id="prev"
            >
            < Prev
            </button>
            <button
                class="b-nasa-apod__button b-nasa-apod__button_type_next b-nasa-apod__control"
                id="next"
            >
                Next >
            </button>
            <button
                class="b-nasa-apod__button b-nasa-apod__button_type_next b-nasa-apod__control"
                id="reset"
            >
                Reset
            </button>
            <button id="random" class="b-nasa-apod__button b-nasa-apod__control">Random</button>
            📅&nbsp;
            <input
                type="date"
                id="date"
                class="b-nasa-apod__datepicker b-nasa-apod__control"
                min="1995-06-20"
                />
            </label>
            <label class="b-nasa-apod__control">
                <span class="b-nasa-apod__text">hd</span>
                <input type="checkbox" id="hd" />
            </label>
            <a href="#" id="fullscreen_link" class="b-nasa-apod__link" target="_blank">Open in a new tab</a>&nbsp;&nbsp;
            <a href="https://github.com/tatarianBarbarian/nasa-apod-app" class="b-nasa-apod__link" target="_blank">Source code</a>
            </div>
            <div class="b-nasa-apod__inner">
            <div class="b-nasa-apod__column">
                <div class="b-shower" id="shower"></div>
            </div>
            <div class="b-nasa-apod__column">
                <p class="b-nasa-apod__text b-nasa-apod__title"></p>
                <p class="b-nasa-apod__text b-nasa-apod__description"></p>
            </div>
            </div>
        </div>
    `;



    document.addEventListener('apod-init', ({detail}) => {
        document.querySelector(detail.elem).innerHTML = appHtml;

        const nasaApod = new BNasaApod(detail.elem);
        nasaApod.init();
    })
});

