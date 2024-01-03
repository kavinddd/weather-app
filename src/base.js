import createElementWithClassName from "./common";

const createHeader = () => {
  const header = createElementWithClassName("div", "header");
  header.textContent = "Weather Application By The Odin Project";
  return header;
};

const createContent = () => {
  const content = createElementWithClassName("div", "content");
  return content;
};

const createFooter = () => {
  const footer = createElementWithClassName("div", "footer");
  footer.textContent = "APIs provided by openweather.org";
  return footer;
};

export default function insertBaseInBody() {
  const container = createElementWithClassName("div", "container");
  const body = document.querySelector("body");

  container.appendChild(createHeader());
  container.appendChild(createContent());
  container.appendChild(createFooter());

  body.appendChild(container);
}
