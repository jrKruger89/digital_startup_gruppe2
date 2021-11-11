"use strict";

import { showLoader, _selectedItem } from "./fetchData.js";
/**
 * JSONBIN
 */

// ========== GLOBAL VARIABLES ==========

const _baseUrl = "https://api.jsonbin.io/b/618cd857763da443125f3243";
const _headers = {
    "X-Master-Key":
        "$2b$10$yXtf3jr2oK/eU70ltpOs1ers5RS4wtrg6vE5aGxGJIUhMjlrrXOCe",
    "Content-Type": "application/json",
};

let _favorites = [];

/**
 * Fetchs attraction data from jsonbin
 */
export async function loadFavorites() {
    const url = _baseUrl + "/latest"; // make sure to get the latest version
    const response = await fetch(url, { headers: _headers });
    const data = await response.json();
    console.log(data);
    _favorites = data;
    appendFavorites(_favorites);
    //console.log(_favorites);
}

/**
 * Change color of heart icon when saved
 * Add item to jsonbin
 */
export let addToFav = async () => {
    let span = document.querySelector(".addFav > svg > path");
    span.style.fill = "red";

    _favorites.push(_selectedItem);
    await updateJSONBIN(_favorites);
};

let appendFavorites = (data) => {
    let htmlTemplate = "";
    for (let item of data) {
        htmlTemplate += /*html*/ `
    <article class="attraction favorite" onclick="showDetailedView(${item.Id})" style="background-image: url(${item.Files[0].Uri});">
      <h2 class="attraction-title">${item.Name}</h2>
    </article>
  `;
    }

    document.querySelector(".my-favorites").innerHTML = htmlTemplate;

    showLoader(false);
};

// ========== Services ==========
/**
 * Updates the data source on jsonbin with a given attraction arrays
 * @param {Array} attractions
 */
export async function updateJSONBIN(attractions) {
    // put users array to jsonbin
    const response = await fetch(_baseUrl, {
        method: "PUT",
        headers: _headers,
        body: JSON.stringify(attractions),
    });
    const result = await response.json();
    appendFavorites(result);
}
