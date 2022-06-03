import User from "./User.js";
import {
  createColor,
  deleteColor,
  deleteAllColors,
  getAllColors,
} from "./database.js";

const app = document.getElementById("App");
const current_year = document.getElementById("current-year");
const app__sidebar = document.querySelector(".App__sidebar");
const color__form = document.getElementById("color__form");
const color = document.getElementById("color");
const colors__list = document.getElementById("colors__list");
const delete_all_colors_btn = document.getElementById("delete_all_colors_btn");
const menu_btn = document.getElementById("menu-btn");
const toggle_theme_btn = document.getElementById("toggle-theme-btn");
const user = new User();

const loadThemeColor = (theme) => {
  user.setCurrentTheme(theme);
  app.setAttribute("data-theme", user.getCurrentTheme());
  toggle_theme_btn.textContent = `${
    theme.charAt(0).toUpperCase() + theme.slice(1)
  } Theme`;
  localStorage.setItem("colorizer-theme", theme);
};

const createThemeColor = () => {
  if (localStorage.getItem("colorizer-theme") == null) {
    localStorage.setItem("colorizer-theme", user.getCurrentTheme());
  }
  loadThemeColor(localStorage.getItem("colorizer-theme"));
};

const displayColors = () => {
  user.setColors(
    getAllColors().then((colors) =>
      colors.map((color) => {
        const color_item = document.createElement("li");
        color_item.classList.add("color__item");
        color_item.setAttribute("data-color_id", color.id);

        const color_box = document.createElement("form");
        color_box.classList.add("color__box");
        color_box.style.backgroundColor = color.color;

        const delete_color_btn = document.createElement("button");
        delete_color_btn.classList.add("delete-color-btn");
        delete_color_btn.setAttribute("id", "delete-color-btn");
        delete_color_btn.setAttribute("type", "submit");
        delete_color_btn.textContent = "Eliminar";

        color_box.addEventListener("submit", () => {
          deleteColor(Number(color_item.getAttribute("data-color_id")));
        });

        color_item.append(color_box);
        color_box.append(delete_color_btn);

        colors__list.append(color_item);
      })
    )
  );
};

document.addEventListener("DOMContentLoaded", () => {
  createThemeColor();
  current_year.textContent = new Date().getFullYear();
  displayColors();
});

menu_btn.addEventListener("click", function () {
  this.classList.toggle("is-active");
  app__sidebar.classList.toggle("show");
});

const toggleDarkTheme = () => {
  user.setCurrentTheme("dark");
  app.setAttribute("data-theme", user.getCurrentTheme());
  toggle_theme_btn.textContent = "Light Theme";
  localStorage.setItem("colorizer-theme", "dark");
};

const toggleLightTheme = () => {
  user.setCurrentTheme("light");
  app.setAttribute("data-theme", user.getCurrentTheme());
  toggle_theme_btn.textContent = "Dark Theme";
  localStorage.setItem("colorizer-theme", "light");
};

toggle_theme_btn.addEventListener("click", () =>
  user.getCurrentTheme() == "light" ? toggleDarkTheme() : toggleLightTheme()
);

color__form.addEventListener("submit", () => {
  createColor(color.value);
});

/* delete_all_colors_btn.addEventListener("click", () => {
  deleteAllColors();
  document.location.reload();
}); */
