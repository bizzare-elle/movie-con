import { createElement } from "./helpers/createElement.js";
import { createLoader } from "./helpers/createLoaders.js";

const container = document.getElementById("container");

const getAnimes = () => {
  createLoader(container, 20);
  fetch("https://kitsu.io/api/edge/anime?page[limit]=20")
    .then((response) => response.json())
    .then((data) => {
      const animeList = data.data;
      container.innerHTML = "";

      animeList.forEach(({ attributes, type }) => {
        //create elements
        const card = createElement("div");
        card.classList.add("card");
        const image = createElement("img");
        const animeAttributes = createElement("div");
        const title = createElement("span");
        title.classList.add("title");
        const info = createElement("div");
        info.classList.add("info");
        const year = createElement("p");
        year.classList.add("year");
        const movieType = createElement("div");
        movieType.classList.add("type");

        image.src = attributes.posterImage.medium;
        title.innerText = attributes.titles.en
          ? attributes.titles.en
          : attributes.titles.en_jp;
        year.innerText = attributes.startDate;
        movieType.innerText = type;

        card.addEventListener("click", () => {
          // create elements
          const background = createElement("div");
          background.classList.add("background");
          const modal = createElement("div");
          const bgImage = createElement("img");
          const modalPreview = createElement("div");
          const posterImg = createElement("img");
          const descriptionContainer = createElement("div");
          const title = createElement("span");
          const btnContainer = createElement("div");
          const btnTrailer = createElement("button");
          const year = createElement("span");
          const containLow = createElement("div");
          const description = createElement("p");
          const btnClose = createElement("button");

          // class assign
          modal.classList.add("modal");
          bgImage.classList.add("bgImage");
          modalPreview.classList.add("modal-preview");
          posterImg.classList.add("poster");
          descriptionContainer.classList.add("descriptionContainer");
          title.classList.add("title-modal");
          btnContainer.classList.add("button");
          btnTrailer.classList.add("btnTrailer");
          year.classList.add("year");
          containLow.classList.add("containLow");
          description.classList.add("description");
          btnClose.classList.add("btnClose");

          // assign values
          bgImage.src = attributes.posterImage.large;
          posterImg.src = attributes.posterImage.small;
          title.innerText = attributes.titles.en
            ? attributes.titles.en
            : attributes.titles.en_jp;
          btnTrailer.innerText = "Trailer";
          year.innerText = attributes.startDate;
          description.innerText = attributes.description;
          btnClose.innerText = "Close";

          // append childs
          modal.appendChild(bgImage);
          modal.appendChild(modalPreview);
          modalPreview.appendChild(posterImg);
          modalPreview.appendChild(descriptionContainer);
          descriptionContainer.appendChild(title);
          descriptionContainer.appendChild(btnContainer);
          descriptionContainer.appendChild(containLow);
          btnContainer.appendChild(btnTrailer);
          btnContainer.appendChild(year);
          containLow.appendChild(description);
          containLow.appendChild(btnClose);

          background.appendChild(modal);
          document.body.appendChild(background);

          btnClose.addEventListener("click", () => {
            document.body.removeChild(background);
          });
        });

        card.appendChild(image);
        card.appendChild(animeAttributes);

        animeAttributes.appendChild(title);
        animeAttributes.appendChild(info);
        info.appendChild(year);
        info.appendChild(movieType);
        container.appendChild(card);
      });
    })
    .catch(() => {
      const button = createElement("button");
      button.innerText = "Retry";
      container.innerHTML = "";
      button.addEventListener("click", getAnimes);
      container.appendChild(button);
    });
};

getAnimes();
