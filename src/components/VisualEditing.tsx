"use client";

import { useEffect } from 'react';

export default function VisualEditing() {
  useEffect(() => {
    const isPreview = new URLSearchParams(window.location.search).has('preview');

    if (process.env.NODE_ENV === 'development' || isPreview) {
      import('@sanity/visual-editing').then(({ enableOverlays }) => {
        enableOverlays({
          zIndex: 999999,
        });
      });
    }
  }, []);

  return null;
}
