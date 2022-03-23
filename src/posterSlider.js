class posterSlider {
  _data;
  _parentEl = document.querySelector(".poster__list-items");
  render(data) {
    this._data = data;
    const markup = this.generateMarkup();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  itemMove(direction) {
    if (direction === "next" || direction === "auto") {
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
        <div class="poster__list-item" style="transform:  translateY(${
          100 * (i - 1)
        }%)">
        <div class="item__img-wrapper"><img class="item__img" src="img/${
          movie["poster"]
        }" alt=""></div>
        <div class="item__details-wrapper">
          <div class="item__details-block">
             <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" class="item__detail-icon" id="iconContext-play-circle-outline-large-inline" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path><path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path></svg>
            <span class="item__detail-duration">${movie["duration"]}</span>
        </div>
          <div class="item__detail-title">
            <span>${movie["title"]}</span>
          </div>
          <div class="item__detail-subtitle">
            <span>Watch the New Trailer</span>
          </div>
        </div> 
      </div>`;
      })
      .join("");
  }
}

export default new posterSlider();
