import { Component, ViewEncapsulation, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'task-form',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:`
  <form class="task-form" (ngSubmit)="submit()" novalidate>
    <input type="text"          
           class="task-form-input"
           placeholder="What needs to be done?"
           name="title"
           [(ngModel)]="title"
           (keyup.escape)="clear()"
           autocomplete="off"
           autoFocus
           required>
  </form>
  `,
  styleUrls: ['./task-form.css']
})
export class TaskFormComponent {
  title: string = '';

  @Output() createTask: EventEmitter<any> = new EventEmitter<any>(false);

  clear(): void {
    this.title = '';
  }

  submit(): void {
    const title: string = this.title.trim();
    if (title.length) {
      this.createTask.emit(title);
    }
    this.clear();
  }
}