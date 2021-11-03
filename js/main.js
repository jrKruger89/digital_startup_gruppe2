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
let fetchCategories_en = async () => {
  const response = await fetch(category_path_en, { method: "GET" });
  const data = await response.json();
  _categories_en = data;
  console.log(_categories_en);
};
let fetchCategories_da = async () => {
  const response = await fetch(category_path_da, { method: "GET" });
  const data = await response.json();
  _categories_da = data;
  console.log(_categories_da);
};
let fetchData_en = async () => {
  const response = await fetch(data_path_en, { method: "GET" });
  const data = await response.json();
  _data_en = data;
  console.log(_data_en);
};
let fetchData_da = async () => {
  const response = await fetch(data_path_da, { method: "GET" });
  const data = await response.json();
  _data_da = data;
  console.log(_data_da);
};

fetchCategories_en();
fetchData_en();
fetchCategories_da();
fetchData_da();

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
