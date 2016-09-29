import { Component, ViewEncapsulation, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { ITask } from '../models/task';

@Component({
  selector: 'task-list',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:`
  <ul class="task-filters">
    <li><a [class.active]="!filter" [routerLink]="['/tasks']">View All</a></li>
    <li><a [class.active]="filter === 'false'" [routerLink]="['/tasks', { completed: false }]">Active</a></li>
    <li><a [class.active]="filter === 'true'" [routerLink]="['/tasks', { completed: true }]">Completed</a></li>
  </ul>
  
  <div class="task-list">
    <task-item *ngFor="let task of tasks | async"
               [task]="task"
               (remove)="remove.emit(task)"
               (update)="update.emit({ task: task, changes: $event })">     
    </task-item>
  </div>
  `,
  styleUrls: ['./task-list.css']
})
export class TaskListComponent {
  @Input() filter: string;
  @Input() tasks: FirebaseListObservable<ITask[]>;

  @Output() remove: EventEmitter<any> = new EventEmitter<any>(false);
  @Output() update: EventEmitter<any> = new EventEmitter<any>(false);
}