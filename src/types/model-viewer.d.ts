import type { DetailedHTMLProps, HTMLAttributes } from "react";

type ModelViewerAttributes = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  src?: string;
  poster?: string;
  alt?: string;
  ar?: boolean | string;
  "ar-modes"?: string;
  "camera-controls"?: boolean | string;
  "auto-rotate"?: boolean | string;
  "shadow-intensity"?: number | string;
  "exposure"?: number | string;
  "interaction-prompt"?: string;
  "environment-image"?: string;
  "scale"?: string;
  "rotation"?: string;
};

declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": ModelViewerAttributes;
  }
}


