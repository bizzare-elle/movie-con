import { createElement } from "./createElement.js";

export const createLoader = (container , count) => {
  for (let i = 1; i <= count; i++) {
    const loadContainer = createElement("div");
    loadContainer.classList.add("cardSkeleton");
    container.appendChild(loadContainer);
  }
};
