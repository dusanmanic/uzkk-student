import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Props = {
  photos: string[];
  index: number;
  altPrefix: string;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

const SWIPE_THRESHOLD = 50;

export function GalleryLightbox({
  photos,
  index,
  altPrefix,
  onClose,
  onIndexChange,
}: Props) {
  const src = photos[index];
  const touchStartX = useRef<number | null>(null);

  function goPrev() {
    onIndexChange((index - 1 + photos.length) % photos.length);
  }

  function goNext() {
    onIndexChange((index + 1) % photos.length);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, photos.length, onClose, onIndexChange]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current == null || photos.length < 2) return;
    const endX = e.changedTouches[0]?.clientX;
    if (endX == null) return;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    if (delta > 0) goPrev();
    else goNext();
  }

  if (!src) return null;

  const navBtnClass =
    "cursor-pointer rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Преглед фотографије"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        type="button"
        onClick={onClose}
        className={`absolute right-4 top-4 z-10 ${navBtnClass}`}
        aria-label="Затвори"
      >
        <X className="h-5 w-5" />
      </button>

      {photos.length > 1 ? (
        <>
          <button
            type="button"
            className={`absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 sm:flex ${navBtnClass}`}
            aria-label="Претходна"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            className={`absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 sm:flex ${navBtnClass}`}
            aria-label="Следећа"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      ) : null}

      <figure
        className="relative flex max-h-full max-w-full flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={`${altPrefix} — ${index + 1}`}
          draggable={false}
          className="max-h-[78vh] max-w-[min(96vw,1200px)] touch-pan-y select-none object-contain sm:max-h-[85vh]"
        />
        <figcaption className="mt-3 font-mono text-xs text-white/70">
          {index + 1} / {photos.length}
          {photos.length > 1 ? (
            <span className="ml-2 sm:hidden">· превуци</span>
          ) : null}
        </figcaption>

        {photos.length > 1 ? (
          <div className="mt-4 flex items-center gap-4 sm:hidden">
            <button
              type="button"
              className={navBtnClass}
              aria-label="Претходна"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              className={navBtnClass}
              aria-label="Следећа"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        ) : null}
      </figure>
    </div>
  );
}
