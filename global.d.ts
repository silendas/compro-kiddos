/// <reference types="react" />

declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      options?: Record<string, unknown>
    ) => void;
  }
}

export {};

// CSS & Stylesheet side-effect module declarations
declare module "*.css" {
  const content: Record<string, string> | string;
  export default content;
}

// Swiper CSS side-effect module declarations
declare module "swiper/css" {
  const content: string;
  export default content;
}

declare module "swiper/css/*" {
  const content: string;
  export default content;
}

declare module "swiper/less" {
  const content: string;
  export default content;
}

declare module "swiper/less/*" {
  const content: string;
  export default content;
}

declare module "swiper/scss" {
  const content: string;
  export default content;
}

declare module "swiper/scss/*" {
  const content: string;
  export default content;
}

// Static image asset module declarations
declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.webp" {
  const content: string;
  export default content;
}

declare module "*.svg" {
  const content: string;
  export default content;
}