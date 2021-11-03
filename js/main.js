"use strict";
import "./spa.js";

const category_path_en = "../json/en/categories.json";
const category_path_da = "../json/da/categories.json";
const data_path_en = "../json/en/data.json";
const data_path_da = "../json/da/data.json";

let _categories_en = [];
let _categories_da = [];
let _data_en = [];
let _data_da = [];

/**
 * Fetch categories from .json file, english version
 */
let fetchCategories = async () => {
  const response = await fetch(category_path_en, { method: "GET" });
  const data = await response.json();
  _categories_en = data;
  console.log(_categories_en);
};

fetchCategories();

/**
 * Hide tabbar on landing page
 */
let hideTabbar = () => {
  let home_section = document.querySelector("#home");
  let tabbar = document.querySelector(".tabbar");
  if (home_section.style.display === "block") {
    tabbar.style.display = "none";
  }
};

hideTabbar();

/**
 * Animate city cards and logo on load
 */
let load_home_page = () => {
  let logo = document.querySelector(".logo-load");
  let cards = document.querySelectorAll(".city-link");
  let title = document.querySelector(".city-section-title");
  window.addEventListener("load", () => {
    logo.style.top = "0";
    logo.style.width = "200px";
    title.style.left = "18.75px";
    for (const city of cards) {
      city.style.left = "18.75px";
    }
  });
};

load_home_page();
