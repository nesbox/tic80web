import jQuery from 'jquery';

declare global {
  interface Window {
    $: typeof jQuery;
    jQuery: typeof jQuery;
  }
}

declare module '*.json' {
  const content: any;
  export default content;
}

export {};
