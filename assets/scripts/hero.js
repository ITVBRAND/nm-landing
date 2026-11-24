const playButton = document.querySelector(".hero__play");
const media = document.querySelector(".hero__media");

if (playButton && media) {
    playButton.addEventListener("click", () => {
        const video = media.querySelector("video");

        if (!video) {
            return;
        }

        if (video.paused) {
            video.play();
            playButton.setAttribute("aria-label", "Пауза");
        } else {
            video.pause();
            playButton.setAttribute("aria-label", "Смотреть");
        }
    });
}
