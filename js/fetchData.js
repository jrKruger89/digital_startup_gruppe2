"use strict";

const category_path_en = "../json/en/categories.json";
const category_path_da = "../json/da/categories.json";
const data_path_en = "../json/en/data.json";
const data_path_da = "../json/da/data.json";

let _categories_en = [];
let _categories_da = [];
let _data_en = [];
let _data_da = [];

let _selectedAttraction;

/**
 * Fetch categories from .json file, english version
 */
export let fetchCategories_en = async () => {
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
export let fetchData_en = async () => {
  const response = await fetch(data_path_en, { method: "GET" });
  const data = await response.json();
  _data_en = data;
  console.log(_data_en);
  appendMuseums(_data_en);
  appendActivities(_data_en);
  appendPlacesToEat(_data_en);

  //logInfo(_data_en);
};
let fetchData_da = async () => {
  const response = await fetch(data_path_da, { method: "GET" });
  const data = await response.json();
  _data_da = data;
  console.log(_data_da);
};

fetchCategories_en();
fetchData_en();
//fetchCategories_da();
//fetchData_da();

let logInfo = (data) => {
  let activities = data.filter((item) => item.Category.Id === 65);
  activities.forEach((item) => {
    console.log(item);
  });
};

let appendMuseums = (data) => {
  let htmlTemplate = "";
  let museums = data.filter((item) => item.Category.Name === "Museums");
  museums.forEach((item) => {
    htmlTemplate += /*html*/ `
    <article class="attraction" onclick="showDetailedView('${item.Id}')" style="background-image: url(${item.Files[0].Uri});">
      <h2 class="attraction-title">${item.Name}</h2>
    </article>
  `;
  });
  document.querySelector(".museums").innerHTML = htmlTemplate;
};

let appendActivities = (data) => {
  let htmlTemplate = "";
  let activities = data.filter((item) => item.Category.Name === "Sightseeing");
  activities.forEach((item) => {
    htmlTemplate += /*html*/ `
    <article class="attraction" onclick="showDetailedView('${item.Id}')" style="background-image: url(${item.Files[0].Uri});">
      <h2 class="attraction-title">${item.Name}</h2>
    </article>
  `;
  });
  document.querySelector(".activities").innerHTML = htmlTemplate;
};

let appendPlacesToEat = (data) => {
  let htmlTemplate = "";
  let restaurants = data.filter((item) => item.Category.Name === "Restaurants");
  restaurants.forEach((item) => {
    if (item.Files.length > 0) {
      htmlTemplate += /*html*/ `
    <article class="attraction" onclick="showDetailedView('${item.Id}')" style="background-image: url(${item.Files[0].Uri});">
      <h2 class="attraction-title">${item.Name}</h2>
    </article>
  `;
    }
  });

  document.querySelector(".eat").innerHTML = htmlTemplate;
};

let showDetailedView = (id) => {
  _selectedAttraction = _data_en.find((attraction) => attraction.id == id);

  document.querySelector("#detailView").innerHTML =
    /*html*/
    `
        <article>
          <h2>${_selectedAttraction.Name}</h2>
        </article>
        `;
  navigateTo("detailView");
};
