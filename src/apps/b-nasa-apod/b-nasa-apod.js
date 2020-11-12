/*
  Cool dates:
  2018-09-15 
*/

/* TODO:
  kbd / touch events, 
  errors processing
  tests
  favorites?
  fullscreen
  responsive controls
*/

import axios from "axios";
import { BButton } from "../../blocks/b-button/b-button";
import { BShower } from "../../blocks/b-shower/b-shower";
import { format, addDays, subDays } from "date-fns";

import "./b-nasa-apod.css";

export class BNasaApod {
  constructor(selector) {
    this.wrapper = document.querySelector(selector);
    this.dateEl = document.querySelector(".b-nasa-apod__date");
    this.descEl = document.querySelector(".b-nasa-apod__description");
    this.titleEl = document.querySelector(".b-nasa-apod__title");
    this.datePickerEl = document.querySelector(".b-nasa-apod__datepicker");
    this.hdCheckboxEl = document.querySelector("#hd");
    this.shouldShowHdPics = false;

    this.prevBtn = new BButton("#prev");
    this.nextBtn = new BButton("#next");
    this.randomBtn = new BButton("#random");
    this.resetBtn = new BButton("#reset");
    this.calendarBtn = new BButton("#caldendar");
    this.shower = new BShower("#shower");
    this.today = null;
    this.currentDate = null;
  }

  get formattedDay() {
    return format(this.currentDate, "yyyy-MM-dd");
  }

  formatDate(rawDate) {
    return format(rawDate, "yyyy-MM-dd");
  }

  getRandomDate() {
    /* 
      Project started at 20-06-1995, 
      so randomizer should generate dates after this day
    */

    const minYear = 1995;
    const maxYear = this.today.getFullYear();
    const year = minYear + Math.round(Math.random() * (maxYear - minYear));
    const month =
      year === minYear
        ? Math.round(Math.random() * 11 + 5)
        : Math.round(Math.random() * 11);
    const day =
      month === 5
        ? Math.round(Math.random() * 30 + 19)
        : Math.round(Math.random() * 30);
    const rawDate = new Date(year, month, day);

    this.currentDate = rawDate;

    return this.formatDate(rawDate);
  }

  async init() {
    await this.changePicture();

    this.prevBtn.onClick(() => {
      this.changePicture(this.getPrevDay());
    });

    this.nextBtn.onClick(() => {
      this.changePicture(this.getNextDay());
    });

    this.resetBtn.onClick(() => {
      this.currentDate = this.today;
      this.changePicture(this.formattedDay);
    });

    this.randomBtn.onClick(() => {
      this.changePicture(this.getRandomDate());
    });

    this.datePickerEl.addEventListener("change", ({ target }) => {
      const dateRegex = /\d\d\d\d-\d\d-\d\d/;
      const isDateCorrect =
        dateRegex.test(target.value) &&
        new Date(target.value) >= new Date("1995-06-20") &&
        new Date(target.value) <= this.today;

      if (isDateCorrect) {
        this.currentDate = new Date(target.value);
        this.changePicture(target.value);
      }
    });

    this.calendarBtn.onClick(() => {
      this.datePickerEl.click();
    });

    this.hdCheckboxEl.addEventListener("click", ({ target }) => {
      this.shouldShowHdPics = target.checked;
    });
  }

  async getPictureData(date = "") {
    const { data } = await axios.get("https://api.nasa.gov/planetary/apod", {
      params: {
        api_key: "1stq95d2ZMp5pEfn0giUmYPlZLv7genwK3BnFnad",
        date
      }
    });

    return data;
  }

  updateInfo({ date, title, explanation, copyright = "" }) {
    this.dateEl.textContent = date;
    this.titleEl.textContent = title;
    this.descEl.innerText =
      explanation +
      "\n" +
      "\n" +
      `${copyright.length ? "Copyright " + copyright : ""}`;
  }

  async changePicture(date = "") {
    const data = await this.getPictureData(date);

    if (!this.today) {
      this.today = new Date(data.date);
      this.currentDate = new Date(data.date);
    }

    this.formatDate(this.today) === data.date
      ? this.nextBtn.disable()
      : this.nextBtn.enable();

    this.formatDate(this.currentDate) === "1995-06-20"
      ? this.prevBtn.disable()
      : this.prevBtn.enable();

    if (this.shouldShowHdPics && data.hdurl) {
      this.shower.changeSlide(data.media_type, data.hdurl);
    } else {
      this.shower.changeSlide(data.media_type, data.url);
    }

    this.updateInfo(data);
  }

  getNextDay() {
    this.currentDate = addDays(this.currentDate, 1);

    return this.formattedDay;
  }

  getPrevDay() {
    this.currentDate = subDays(this.currentDate, 1);

    return this.formattedDay;
  }
}
