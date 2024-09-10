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
          const background = createElement("div");
          background.classList.add("background");
          const modal = `
          <div class="modal">
            <img class="bgImage"
              src="${attributes.posterImage.large}"
              alt=""
            />
           <div class="modal-preview">
              <img class="poster" 
              src="${attributes.posterImage.small}" alt=""
              >
              <div class="descriptionContainer">
              <span class="title-modal">${
                attributes.titles.en
                  ? attributes.titles.en
                  : attributes.titles.en_jp
              }</span>
              <div class="button">
                <button class="btnTrailer">Trailer</button>
              <span class="year">${attributes.startDate}</span>
              </div>
              <p class="description">${attributes.description}</p>
              <button class="btnTrailer" id="btnClose">Close</button>
          </div>
        </div>
      </div>`;

          background.innerHTML = modal;

          document.body.appendChild(background);

          const btnClose = document.getElementById("btnClose");

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
