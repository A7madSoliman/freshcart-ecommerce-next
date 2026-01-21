"use client";

import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function ProductGallery({ images }: { images: string[] }) {
  const items = (images ?? []).map((url) => ({
    original: url,
    thumbnail: url,
  }));

  if (!items.length) return null;

  return (
    <ReactImageGallery
      items={items}
      showNav
      showFullscreenButton
      showPlayButton={false}
      thumbnailPosition="bottom"
    />
  );
}
