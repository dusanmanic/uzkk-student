import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Props = {
  photos: string[];
  index: number;
  altPrefix: string;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export function GalleryLightbox({
  photos,
  index,
  altPrefix,
  onClose,
  onIndexChange,
}: Props) {
  const src = photos[index];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        onIndexChange((index - 1 + photos.length) % photos.length);
      }
      if (e.key === "ArrowRight") {
        onIndexChange((index + 1) % photos.length);
      }
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, photos.length, onClose, onIndexChange]);

  if (!src) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Преглед фотографије"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 cursor-pointer rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
        aria-label="Затвори"
      >
        <X className="h-5 w-5" />
      </button>

      {photos.length > 1 ? (
        <>
          <button
            type="button"
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 sm:left-4"
            aria-label="Претходна"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((index - 1 + photos.length) % photos.length);
            }}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 sm:right-4"
            aria-label="Следећа"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((index + 1) % photos.length);
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
          className="max-h-[85vh] max-w-[min(96vw,1200px)] object-contain"
        />
        <figcaption className="mt-3 font-mono text-xs text-white/70">
          {index + 1} / {photos.length}
        </figcaption>
      </figure>
    </div>
  );
}
