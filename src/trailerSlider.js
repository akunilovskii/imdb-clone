class trailerSlider {
  _data;
  _parentEl;
  let;
  render(data) {
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
                <div class="poster">
                  <img class="poster__img" src="${
                    movie["poster"]
                  }" alt="Poster image" id="poster-img-${i}"/>
                <div class="ribbon">
                    <img class="ribbon__watchlist" src="../icons/ribbon.svg">
                </div>
              </div>
            </div>
    </a>`;
      })
      .join("");
  }
}

export default new trailerSlider();
