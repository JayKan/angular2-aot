import { Component, ViewEncapsulation, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'task-item',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:`
  <div class="task-item" 
       [ngClass]="{'task-item-completed': task.completed, 'task-item-editing': editing}"
       tabindex="0">
       
    <div class="cell">
      <button *ngIf="!editing"
              type="button"
              class="task-item-button"
              aria-label="Mark task as completed"
              (click)="toggleStatus()">
        <span class="icon material-icons" [ngClass]="{'icon-active': task.completed}">done</span>
      </button>
    </div>
    
    <div class="cell">
      <div *ngIf="!editing"
           class="task-item-title"
           tabindex="0">
        {{ task.title }}
      </div>
      
      <form class="task-form" *ngIf="editing" (ngSubmit)="saveTitle()" novalidate>
        <input type="text"
               name="title"
               class="task-item-input"
               [(ngModel)]="title"
               (blur)="stopEditing()"
               (keyup.escape)="stopEditing()"
               autocomplete="off"               
               autoFocus>        
      </form>
    </div>
    
    <div class="cell">
      <button *ngIf="editing"
              type="button"
              class="task-item-button"
              aria-label="Cancel editing"
              (click)="stopEditing()">
        <span class="icon material-icons">&#xe14c;</span>
      </button>
      
      <button *ngIf="!editing"
             type="button"            
             aria-label="Edit task title"
             class="task-item-button"
             (click)="editTitle()">
         <span class="icon material-icons">edit</span>
      </button>
      
      <button *ngIf="!editing"
              type="button"             
              aria-label="Delete task"
              class="task-item-button"
              (click)="remove.emit()">
      <span class="icon material-icons">delete</span>
    </button>
    </div>
  </div>
  `,
  styleUrls: ['./task-item.css']
})
export class TaskItemComponent {
  @Input() task: Task;
  @Output() remove: EventEmitter<any> = new EventEmitter<any>(false);
  @Output() update: EventEmitter<any> = new EventEmitter<any>(false);

  editing: boolean = false;
  title: string = '';

  editTitle(): void {
    this.editing = true;
    this.title = this.task.title;
  }

  saveTitle(): void {
    if (this.editing) {
      const title: string = this.title.trim();
      if (title.length && title !== this.task.title) {
        this.update.emit({ title });
      }
      this.stopEditing();
    }
  }

  stopEditing(): void {
    this.editing = false;
  }

  toggleStatus(): void {
    this.update.emit({
      completed: !this.task.completed
    });
  }
}