"use client";

import { RotateCcw, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const CRAFT_FILM_EVENT = "the-curator:open-craft-film";

export default function CraftFilmOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef(null);

  const playFromStart = useCallback(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = true;
    video.currentTime = 0;
    const playPromise = video.play();

    if (playPromise?.catch) {
      playPromise.catch(() => {});
    }
  }, []);

  const openFilm = useCallback(() => {
    setIsOpen(true);
    playFromStart();
  }, [playFromStart]);

  const closeFilm = useCallback(() => {
    const video = videoRef.current;

    if (video) {
      video.pause();
    }

    setIsOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener(CRAFT_FILM_EVENT, openFilm);

    return () => window.removeEventListener(CRAFT_FILM_EVENT, openFilm);
  }, [openFilm]);

  useEffect(() => {
    document.body.classList.toggle("craft-film-open", isOpen);
    document.documentElement.classList.toggle("craft-film-open", isOpen);

    return () => {
      document.body.classList.remove("craft-film-open");
      document.documentElement.classList.remove("craft-film-open");
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeFilm();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeFilm]);

  return (
    <section
      aria-hidden={!isOpen}
      className={`craft-film-viewer${isOpen ? " is-open" : ""}`}
    >
      <div className="craft-film-vignette" />
      <div className="craft-film-track">
        <div className="craft-film-aside">
          <p className="craft-film-kicker">THE CRAFT</p>
          <h2>Inside the atelier</h2>
          <span />
        </div>

        <div className="craft-film-panel" role="dialog" aria-label="Craft film">
          <video
            ref={videoRef}
            src="/craft-film.mp4"
            className="craft-film-video"
            controls
            muted
            playsInline
            preload="metadata"
          />

          <div className="craft-film-controls">
            <button
              type="button"
              className="craft-film-action"
              onClick={playFromStart}
              aria-label="Replay video"
              title="Replay video"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Replay</span>
            </button>
            <button
              type="button"
              className="craft-film-action craft-film-action-close"
              onClick={closeFilm}
              aria-label="Close video"
              title="Close video"
            >
              <X className="h-4 w-4" />
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
