declare module 'drift-zoom' {
  export interface DriftOptions {
    namespace?: string;
    showWhitespaceAtEdges?: boolean;
    containInline?: boolean;
    inlinePane?: boolean | number;
    inlineOffsetY?: number;
    inlineOffsetX?: number;
    sourceAttribute?: string;
    zoomFactor?: number;
    paneContainer?: HTMLElement;
    inlineContainer?: HTMLElement;
    handleTouch?: boolean;
    onShow?: () => void;
    onHide?: () => void;
    injectBaseStyles?: boolean;
    hoverBoundingBox?: boolean;
    touchDelay?: number;
    hoverDelay?: number;
  }

  export default class Drift {
    constructor(triggerEl: HTMLElement, options?: DriftOptions);
    destroy(): void;
    disable(): void;
    enable(): void;
    setZoomImageURL(imageURL: string): void;
  }
}
