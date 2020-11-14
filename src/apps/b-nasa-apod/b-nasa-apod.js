/*
  Cool dates:
  2018-09-15 
*/

/* TODO:
  kbd / touch events, 
  errors processing
  tests
  favorites?
*/

import axios from "axios";
import { BButton } from "../../blocks/b-button/b-button";
import { BShower } from "../../blocks/b-shower/b-shower";
import { format, addDays, subDays } from "date-fns";

import "./b-nasa-apod.css";

export class BNasaApod {
  constructor() {
    this.PROJECT_START_DATE = "1995-06-20";

    this.descEl = document.querySelector(".b-nasa-apod__description");
    this.titleEl = document.querySelector(".b-nasa-apod__title");
    this.datePickerEl = document.querySelector(".b-nasa-apod__datepicker");
    this.hdCheckboxEl = document.querySelector("#hd");
    this.fullscreenLink = document.querySelector("#fullscreen_link");
    this.shouldShowHdPics = false;

    this.prevBtn = new BButton("#prev");
    this.nextBtn = new BButton("#next");
    this.randomBtn = new BButton("#random");
    this.resetBtn = new BButton("#reset");
    this.shower = new BShower("#shower");
    this.today = null;
    this._currentDate = null;
  }

  set curDate(value) {
    this._currentDate = value;
    this.datePickerEl.value = this.formatDate(value);
  }

  get curDate() {
    return this._currentDate;
  }

  get formattedCurrentDay() {
    return this.formatDate(this._currentDate);
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

    this.curDate = rawDate;

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
      this.curDate = this.today;
      this.changePicture();
    });

    this.randomBtn.onClick(() => {
      this.changePicture(this.getRandomDate());
    });

    this.datePickerEl.addEventListener("input", ({ target }) => {
      const dateRegex = /\d\d\d\d-\d\d-\d\d/;
      const isDateCorrect =
        dateRegex.test(target.value) &&
        new Date(target.value) >= new Date(this.PROJECT_START_DATE) &&
        new Date(target.value) <= this.today;

      if (isDateCorrect) {
        this.curDate = new Date(target.value);
        this.changePicture(target.value);
      }
    });

    this.hdCheckboxEl.addEventListener("change", ({ target }) => {
      this.shouldShowHdPics = target.checked;
      this.changePicture(this.formattedCurrentDay);
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
    this.titleEl.textContent = title;
    this.descEl.innerText =
      explanation +
      "\n" +
      "\n" +
      `${copyright.length ? "Copyright " + copyright : ""}`;
  }

  async changePicture(date = "") {
    const data = await this.getPictureData(date);
    const {date: picDate, url, hdurl, media_type} = data;

    if (!this.today) {
      this.today = new Date(picDate);
      this.curDate = new Date(picDate);
    }

    this.formatDate(this.today) === picDate
      ? this.nextBtn.disable()
      : this.nextBtn.enable();

    this.formatDate(this.curDate) === this.PROJECT_START_DATE
      ? this.prevBtn.disable()
      : this.prevBtn.enable();

    if (this.shouldShowHdPics && hdurl) {
      this.shower.changeSlide(media_type, hdurl);
      this.fullscreenLink.setAttribute('href', data.hdurl);
    } else {
      this.shower.changeSlide(media_type, url);
      this.fullscreenLink.setAttribute('href', url);
    }

    this.updateInfo(data);
  }

  getNextDay() {
    this.curDate = addDays(this.curDate, 1);

    return this.formattedCurrentDay;
  }

  getPrevDay() {
    this.curDate = subDays(this.curDate, 1);

    return this.formattedCurrentDay;
  }
}
