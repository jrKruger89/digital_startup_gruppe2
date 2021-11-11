"use strict";
import "./spa.js";
import "./fetchData.js";

import {
  expandText,
  search,
  showDetailedView,
  addToFav,
  loadFavorites,
} from "./fetchData.js";
window.showDetailedView = (id) => showDetailedView(id);
window.search = (value) => search(value);
window.expandText = () => expandText();
window.addToFav = () => addToFav();
window.showTab = () => showTab();
window.hideTab = () => hideTab();

loadFavorites();

/**
 * Hide tabbar on landing page
 */
let hideTabbarOnLoad = () => {
  let home_section = document.querySelector("#home");
  let tabbar = document.querySelector(".tabbar");
  if (home_section.style.display === "block") {
    tabbar.style.display = "none";
  }
};

let showTab = () => {
  let tabbar = document.querySelector(".tabbar");
  tabbar.style.display = "flex";
};

let hideTab = () => {
  let tabbar = document.querySelector(".tabbar");
  tabbar.style.display = "none";
};

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
    title.style.left = "5%";

    for (const city of cards) {
      city.style.left = "50%";
      city.style.transform = "translateX(-50%)";
    }
    hideTabbarOnLoad();
  });
};

load_home_page();

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
