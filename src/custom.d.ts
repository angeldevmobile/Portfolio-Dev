declare module '*.mp4' {
    const src: string;
    export default src;
  }

// Imports de CSS por efecto secundario (TypeScript 5.9+ los valida)
declare module '*.css';
