_data;
_parentEl = document.querySelector("");

export function render(data) {
  this._data = data;
  const markup = this.generateMarkup();
  this._parentEl.insertAdjacentHTML("afterbegin", markup);
}

export function generateMarkup() {
  return this._data.map((movie, i) => {});
}
