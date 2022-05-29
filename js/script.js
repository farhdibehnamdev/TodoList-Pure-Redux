"use strict";
const menu = document.querySelector(".menu");
const menus = document.querySelectorAll(".menu li");

const toggleActiveClass = function (e) {
  menus.forEach((menu) => {
    menu.classList.remove("active-menu");
    menu.classList.add("hide-before");
  });
  const currentSelectedElement = e.target.className;
  menus.forEach((menu) => {
    if (menu.className === currentSelectedElement) {
      e.target.classList.add("active-menu");
      e.target.classList.remove("hide-before");
    }
  });
};

menu.addEventListener("click", toggleActiveClass);
