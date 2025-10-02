import jQuery from 'jquery';

declare global {
  interface Window {
    $: typeof jQuery;
    jQuery: typeof jQuery;
  }

  const __BUILD_YEAR__: string;
}

export {};
