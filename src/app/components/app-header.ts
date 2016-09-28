import { Component, ViewEncapsulation, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:`
  <header class="header">
    <div class="g-row">
      <div class="g-col">
        <h1 class="header-title">Angular2 AoT</h1>
        <ul class="header-links">
          <li *ngIf="authenticated"><a class="header-link" (click)="signOut.emit()" href="#">Sign out</a></li>
          <li><a class="header-link header-link-github" href="https://github.com/JayKan/angular2-aot" target="_blank"></a></li>
        </ul>
      </div>
    </div>
  </header>
  `,
  styleUrls:['./app-header.css']
})
export class AppHeaderComponent {
  @Input() authenticated: boolean;
  @Output() signOut: EventEmitter<any> = new EventEmitter<any>(false);
}