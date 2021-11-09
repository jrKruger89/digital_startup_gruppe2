"use strict";
import { navigateTo } from "./spa.js";
const data_path_en = "../json/en/data.json";
let _data_en = [];

let _selectedItem;

/**
 * Fetch categories from .json file, english version
 */

export let fetchData_en = async () => {
  const response = await fetch(data_path_en, { method: "GET" });
  const data = await response.json();
  _data_en = data;
  console.log(_data_en);
  appendMuseums(_data_en);
  appendActivities(_data_en);
  appendPlacesToEat(_data_en);
  showLoader(false);
};
fetchData_en();

let appendMuseums = (data) => {
  let htmlTemplate = "";
  let museums = data.filter((item) => item.Category.Name === "Museums");
  museums.forEach((item) => {
    htmlTemplate += /*html*/ `
    <article class="attraction" onclick="showDetailedView(${item.Id})" style="background-image: url(${item.Files[0].Uri});">
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
    <article class="attraction" onclick="showDetailedView(${item.Id})" style="background-image: url(${item.Files[0].Uri});">
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
    <article class="attraction" onclick="showDetailedView(${item.Id})" style="background-image: url(${item.Files[0].Uri});">
      <h2 class="attraction-title">${item.Name}</h2>
    </article>
  `;
    }
  });

  document.querySelector(".eat").innerHTML = htmlTemplate;
};

export let showDetailedView = (id) => {
  _selectedItem = _data_en.find((item) => item.Id == id);
  console.log(_selectedItem);

  document.querySelector("header").innerHTML += /*html*/ `
  <span class="left nav-link">&lt;</span>
  `;
  document.querySelector(".left").addEventListener("click", () => {
    navigateTo("#/explore");
    location.reload();
  });

  document.querySelector("#detailView").innerHTML = /*html*/ `
  <article class="attraction-details attraction-hero" style="background-image: url(${_selectedItem.Files[0].Uri});">
  <div class="frame">
    <h2 class="attraction-title">${_selectedItem.Name}</h2>
    <h3 class="hashtag">#visitdenmark</h3>
  </div>
  <h3 class="description-title">${_selectedItem}</h3>
  <i class="favorite-icon"></i>
  <p class="attraction-description"></p>
  <button></button>
  <button></button>
  <h3></h3>
  <i class="geo-pin"></i><p class="adress"></p>
  <div id="map" class="map"></div>
  </article>
`;
  navigateTo("#/detailView");
};

/**
 * Make append function for search results
 */
let appendSearchResults = (data) => {
  let htmlTemplate = "";
  let restaurants = data;
  restaurants.forEach((item) => {
    if (item.Files.length > 0) {
      htmlTemplate += /*html*/ `
    <article class="attraction" onclick="showDetailedView(${item.Id})" style="background-image: url(${item.Files[0].Uri});">
      <h2 class="attraction-title">${item.Name}</h2>
    </article>
  `;
    }
  });

  document.querySelector(".search-results").innerHTML = htmlTemplate;
};

export let search = (value) => {
  let searchQuery = value.toLowerCase();
  console.log(searchQuery);
  let filteredResults = [];
  for (const result of _data_en) {
    let categoryName = result.Category.Name.toLowerCase();
    let attractionName = result.Name.toLowerCase();
    let mainCategory = result.MainCategory.Name.toLowerCase();
    if (
      categoryName.includes(searchQuery) ||
      attractionName.includes(searchQuery) ||
      mainCategory.includes(searchQuery)
    ) {
      filteredResults.push(result);
      appendSearchResults(filteredResults);
    }
  }
};

function showLoader(show = true) {
  let loader = document.querySelector("#loader");
  if (show) {
    loader.classList.remove("hide");
  } else {
    loader.classList.add("hide");
  }
}
