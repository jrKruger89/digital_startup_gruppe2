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
  </article>
  <div class="container">
  <h3 class="description-title">${_selectedItem.Name}</h3>
  <span class="addFav" onclick="addToFav()">
  <svg width="29" height="26" viewBox="0 0 29 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M27.1977 4.10928L27.198 4.11003C28.68 7.12605 28.1562 10.6235 25.1947 14.6712L25.1929 14.6737C22.8518 17.8945 19.4704 21.1394 14.5043 24.9765C9.53302 21.1331 6.1571 17.8599 3.8131 14.6701C0.84326 10.6228 0.319768 7.12569 1.80156 4.11003L1.80193 4.10928C2.79668 2.08049 5.78423 0.273695 9.41196 1.30672C11.14 1.80301 12.6465 2.86656 13.686 4.32225L14.4998 5.4618L15.3136 4.32225C16.3533 2.86629 17.8601 1.80261 19.5886 1.30644L19.5912 1.3057C23.2036 0.258274 26.2011 2.07681 27.1977 4.10928Z" fill="white" stroke="#DF0921" stroke-width="2"/>
</svg>
</span>
  </div>
  <p class="attraction-description">${_selectedItem.Descriptions[0].Text}</p>
  <div class="container">
  <button class="detail-button see-more-btn" onclick="expandText()">Read more</button>
  <button class="detail-button others-say-btn">See what others say</button>
  </div>
  <h3></h3>
  <i class="geo-pin"></i><p class="address"></p>
  <div id="map" class="map"></div>
  
`;
  navigateTo("#/detailView");
};

export let expandText = () => {
  let attraction = document.querySelector(".attraction-description");
  let button = document.querySelector(".see-more-btn");
  if (attraction.classList.contains("open")) {
    attraction.classList.remove("open");
    button.innerHTML = "READ MORE";
  } else {
    attraction.classList.add("open");
    button.innerHTML = "READ LESS";
  }
};

export let addToFav = () => {
  let span = document.querySelector(".addFav > svg > path");
  /**
   * Change color of heart icon when saved
   * Add item to global array
   */
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
