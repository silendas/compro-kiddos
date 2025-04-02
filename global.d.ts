declare global {
    interface Window {
      gtag: (command: string, targetId: string, options?: Record<string, unknown>) => void;
    }
  }
  
  export {};
  