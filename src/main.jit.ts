import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

// enable prod for faster renders
if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

// import app module
import { AppModule } from './app';

export function main() {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(error => console.error(error));
}

if (document.readyState === 'complete') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}






