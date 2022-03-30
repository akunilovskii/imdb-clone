import { moviesSet } from "./config.js";

class trailerSlider {
  _data;
  _parentEl;

  render(data) {
    moviesSet.counter = 0;
    this._parentEl = document.querySelector(".carousel__slider-wrapper");
    this._data = data;
    const markup = this.generateMarkup();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
    this._parentEl.prepend(this._parentEl.lastElementChild);
  }

  rendercontainerMarkup() {
    this.clearLocation();
    const firstParentEl = document.querySelector(".main-wrapper");
    this.clearParentElement(firstParentEl);
    firstParentEl.insertAdjacentHTML("afterbegin", this.containerMarkup);
  }

  clearLocation() {
    history.pushState(
      "",
      document.title,
      window.location.pathname + window.location.search
    );
  }

  clearParentElement(element) {
    element.innerHTML = "";
  }

  itemMove(direction) {
    if (direction === "next") {
      this._parentEl.appendChild(this._parentEl.firstElementChild);
    } else {
      this._parentEl.prepend(this._parentEl.lastElementChild);
    }
  }

  initializeItemsOrder(directionXY, itemClass, k) {
    document
      .querySelectorAll(`.${itemClass}`)
      .forEach(
        (s, i) =>
          (s.style.transform = `translate${directionXY}(${100 * (i - k)}%)`)
      );
  }

  containerMarkup = `
      <div class="container__carousel">
          <div class="carousel">
              <div class="carousel__slider-wrapper"></div>
          </div>
          <div class="poster__list-container">
            <div class="poster__list-background">
              <div class="poster__list-title">Up next</div>
              <div class="poster__list-items"></div>
            </div>
                </div>
      </div>`;

  generateMarkup() {
    return this._data
      .map((movie, i) => {
        return `
        <a href=#${movie["id"]}>
            <div class="slide" id=${movie["id"]} style="transform: translateX(${
          100 * i
        }%)">
            <img src="${
              movie["image"]
            }" alt="Trailer image" class="trailer__img" id="trailer-img-${i}"/>
            <div class="slide__basement">
            <div class="poster">
                  <img class="poster__img" src="${
                    movie["poster"]
                  }" alt="Poster image" id="poster-img-${i}"/>
                <div class="ribbon">
                    <img class="ribbon__watchlist" src="../icons/ribbon.svg">
                </div>
              </div>
              <div class="trailer__basement-details">
                <div class="trailer__detail-icon-wrapper">
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" class="trailer__detail-icon" id="iconContext-play-circle-outline-large-inline" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path><path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path></svg>
                  </div>

                  <div class="trailer__details-text">
                  <div class="trailer__details-block">
                    <span class="trailer__detail-title">${movie["title"]}</span>
                    <span class="trailer__detail-duration">${
                      movie["duration"]
                    }</span>
                  </div>
                  <div class="trailer__detail-subtitle">
                    Watch the New Trailer
                  </div>
                  </div>
        </div>
        </div>
      </div>
    </a>`;
      })
      .join("");
  }
}

export default new trailerSlider();
