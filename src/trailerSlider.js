class trailerSlider {
  _data;
  _parentEl = document.querySelector(".carousel__slider-wrapper");

  render(data) {
    this._data = data;
    const markup = this.generateMarkup();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
    this._parentEl.prepend(this._parentEl.lastElementChild);
  }

  itemMove(direction) {
    if (direction === "next") {
      this._parentEl.appendChild(this._parentEl.firstElementChild);
    } else {
      this._parentEl.prepend(this._parentEl.lastElementChild);
    }
  }

  initializeItemsOrder(directionXY, itemClass, k) {
    document.querySelectorAll(`.${itemClass}`).forEach((s, i) => {
      s.style.transform = `translate${directionXY}(${100 * (i - k)}%)`;
    });
  }

  generateMarkup() {
    return this._data
      .map((movie, i) => {
        return `
    <div class="slide" style="transform: translateX(${100 * i}%)"><img src="${
          movie["image"]
        }" alt="Trailer image" class="trailer__img" id="trailer-img-${i}">
          <div class="poster">
            <img class="poster__img" src="${
              movie["poster"]
            }" alt="Poster image" id="poster-img-${i}">
          <div class="ribbon">
              <img class="ribbon__watchlist" src="../icons/ribbon.svg">
          </div>
        </div>
    </div>`;
      })
      .join("");
  }
}

export default new trailerSlider();
