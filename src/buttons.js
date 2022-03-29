import { TRANSITIONSPEED } from "./config.js";

let buttons;

const markup = `<div class="trailer__button prev" id="prev_slide">
<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" class="trailer__left-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M18.378 23.369c.398-.402.622-.947.622-1.516 0-.568-.224-1.113-.622-1.515l-8.249-8.34 8.25-8.34a2.16 2.16 0 0 0 .548-2.07A2.132 2.132 0 0 0 17.428.073a2.104 2.104 0 0 0-2.048.555l-9.758 9.866A2.153 2.153 0 0 0 5 12.009c0 .568.224 1.114.622 1.515l9.758 9.866c.808.817 2.17.817 2.998-.021z"></path></svg>
</div>
<div class="trailer__button next" id="next_slide">
<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" class="trailer__right-icon"  viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path></svg>
</div>`;

export function render() {
  const _parentEl = document.querySelector(".carousel");
  _parentEl.insertAdjacentHTML("afterbegin", markup);
}

export function addButtonListeners(handler) {
  buttons = document.querySelectorAll(".trailer__button");
  buttons.forEach((btn) =>
    btn.addEventListener("click", function (e) {
      if (
        e.currentTarget.classList.contains("next") &&
        !btn.classList.contains("disabled")
      ) {
        handler("next");
      }
      if (
        e.currentTarget.classList.contains("prev") &&
        !btn.classList.contains("disabled")
      ) {
        handler("prev");
      }
      disableButton(btn);
    })
  );
}

export function disableButton(btn) {
  btn.classList.add("disabled");
  setTimeout(() => {
    btn.classList.remove("disabled");
  }, TRANSITIONSPEED);
}

export default buttons;
