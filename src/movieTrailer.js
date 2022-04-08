import { moviesSet } from "./config.js";

// const movieId = moviesSet.selectedMovie.videoLinks[0]
const _parentEl = document.querySelector(".main-wrapper");
let playlist = undefined;
export function render() {
  const list = moviesSet.selectedMovie.youtubeIds;
  if (list.length > 1) {
    playlist = list;
  }
  const firstId = list[0];
  const markup = generateMarkup(firstId, playlist);
  clearParentElement();
  _parentEl.insertAdjacentHTML("afterbegin", markup);
}

function clearParentElement() {
  _parentEl.innerHTML = "";
}

export function backButtonListener(handler) {
  document
    .querySelector(".trailer__window-back-button")
    .addEventListener("click", function (e) {
      e.preventDefault();
      handler("back");
    });
}

function generateMarkup(firstId, playlist) {
  return `<div class="trailer__window">
    <div class="trailer__content-container">
        <div class="trailer__window-top-bar">
            <div class="trailer__window-back-button">
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" class="chevron-left" id="chevron-left" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M18.378 23.369c.398-.402.622-.947.622-1.516 0-.568-.224-1.113-.622-1.515l-8.249-8.34 8.25-8.34a2.16 2.16 0 0 0 .548-2.07A2.132 2.132 0 0 0 17.428.073a2.104 2.104 0 0 0-2.048.555l-9.758 9.866A2.153 2.153 0 0 0 5 12.009c0 .568.224 1.114.622 1.515l9.758 9.866c.808.817 2.17.817 2.998-.021z"></path></svg></>
              <span class="back__button-text">Back</span>
            </div>
            <div class="trailer__window-share-button">
              <button class="share-button" title="share video" role="button" tabindex="0" aria-label="share video" aria-disabled="false"><svg xmlns="http://www.w3.org/2000/svg"class="share-icon" id="icon-share" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"></path></svg></button>
            </div>
      </div>
      
        <div class="trailer__player-window">
          <iframe id="ytplayer" type="text/html" 
      src="https://www.youtube.com/embed/${firstId}?version=3&${
    playlist ? `${`playlist=${playlist}`}` : ""
  }&autoplay=1&mute=1&cc_load_policy=1&controls=1&modestbranding=1&rel=0&showinfo=1"
      frameborder="0" allowfullscreen="1"></iframe>
        </div>
      </div>
      <div class="trailer__details">
        <span class="text">Text</span>
      </div>
</div>`;
}
