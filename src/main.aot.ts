import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';

import { AppModuleNgFactory } from 'build/src/app/app.module.ngfactory';

// enable prod for faster renders
if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

export function main() {
  return platformBrowser()
    .bootstrapModuleFactory(AppModuleNgFactory)
    .catch(err => console.error(err));
}

if (document.readyState === 'complete') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}



