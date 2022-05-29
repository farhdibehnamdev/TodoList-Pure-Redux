"use strict";
const menu = document.querySelector(".menu");
const menus = document.querySelectorAll(".menu li");
const newListBtn = document.querySelector(".new-list-btn");
const containerGroupList = document.querySelector(".container-group-list");
const addTaskList = function () {
  const createIcon = document.createElement("i");
  createIcon.classList.add("ph-list-bold");
  const createNewList = document.createElement("p");
  const untitledList = document.createTextNode("Untitled list");
  createNewList.appendChild(untitledList);
  createNewList.setAttribute("contenteditable", true);
  createNewList.classList.add("active-menu", "new-user-list", "hide-before");
  containerGroupList.insertAdjacentElement("afterend", createNewList);
};

/** 
this mehtod add active class one menus by each click */
const toggleActiveClassHandler = function (e) {
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
menu.addEventListener("click", toggleActiveClassHandler);
newListBtn.addEventListener("click", addTaskList);
