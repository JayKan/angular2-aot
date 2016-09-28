import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({ selector: '[autoFocus]' })
export class AutoFocusDirective implements OnInit {
  constructor(public el: ElementRef) {}

  ngOnInit(): void {
    this.el.nativeElement.focus();
  }
}