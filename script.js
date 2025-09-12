const start8tn = document.querySelector(".start-btn");
const popupinfo = document.querySelector(".popup-info");
const exit8tn = document.querySelector(".exit-btn");
const main = document.querySelector(".main");
const continue8tn = document.querySelector(".continue-btn");
const quisSection = document.querySelector(".quis-section");

start8tn.onclick = () => {
  popupinfo.classList.add("active");
  main.classList.add("active");
};

exit8tn.onclick = () => {
  popupinfo.classList.remove("active");
  main.classList.remove("active");
};

continue8tn.onclick = () => {
  quisSection.classList.add("active");
  popupinfo.classList.remove("active");
  main.classList.remove("active");
};
