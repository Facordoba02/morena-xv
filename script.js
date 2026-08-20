const audio = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const copyAliasButton = document.getElementById("copyAlias");
const aliasValue = document.getElementById("aliasValue");

if (audio && musicToggle) {
  audio.load();

  function setMusicState(isPlaying) {
    musicToggle.classList.toggle("is-playing", isPlaying);
    musicToggle.setAttribute(
      "aria-label",
      isPlaying ? "Pausar música" : "Reproducir música"
    );
  }

  async function playMusic() {
    try {
      audio.muted = false;
      audio.volume = 0.7;
      await audio.play();
      setMusicState(true);
    } catch (error) {
      setMusicState(false);
      console.warn("No se pudo iniciar la música:", error.name, error.message);
    }
  }

  function pauseMusic() {
    audio.pause();
    setMusicState(false);
  }

  window.playMusic = playMusic;

  audio.addEventListener("play", () => setMusicState(true));
  audio.addEventListener("pause", () => setMusicState(false));
  audio.addEventListener("ended", () => setMusicState(false));
  audio.addEventListener("error", () => {
    const error = audio.error;
    console.warn("Error cargando el audio:", error?.code, error?.message);
    setMusicState(false);
  });

  musicToggle.addEventListener("click", async () => {
    if (audio.paused) {
      await playMusic();
      return;
    }

    pauseMusic();
  });
}

if (copyAliasButton && aliasValue) {
  copyAliasButton.addEventListener("click", async () => {
    const value = aliasValue.textContent.trim();

    try {
      await navigator.clipboard.writeText(value);
      copyAliasButton.classList.add("copied");
      copyAliasButton.setAttribute("aria-label", "Alias copiado");

      setTimeout(() => {
        copyAliasButton.classList.remove("copied");
        copyAliasButton.setAttribute("aria-label", "Copiar alias");
      }, 1400);
    } catch (error) {
      console.warn("No se pudo copiar el alias:", error);
      copyAliasButton.setAttribute("aria-label", "No se pudo copiar el alias");
    }
  });
}
