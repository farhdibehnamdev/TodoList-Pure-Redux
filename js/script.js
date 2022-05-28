"use strict";
const menu = document.querySelector(".menu");
const menus = document.querySelectorAll(".menu li");

const addActiveClass = function (e) {
  menus.forEach((menu) => menu.classList.remove("active-menu"));
  const currentSelectedElement = e.target.className;
  menus.forEach((menu) => {
    if (menu.className === currentSelectedElement) {
      e.target.classList.add("active-menu");
    }
  });
};

menu.addEventListener("click", addActiveClass);
