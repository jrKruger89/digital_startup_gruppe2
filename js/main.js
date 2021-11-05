"use strict";
import "./spa.js";
import "./fetchData.js";

/**
 * Hide tabbar on landing page
 */
let hideTabbar = () => {
  let home_section = document.querySelector("#home");
  let tabbar = document.querySelector(".tabbar");
  let header = document.querySelector("header");
  if (home_section.style.display === "block") {
    tabbar.style.display = "none";
    header.style.display = "none";
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
