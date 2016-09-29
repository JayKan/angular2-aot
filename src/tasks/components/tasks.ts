import 'rxjs/add/operator/do';
import 'rxjs/add/operator/pluck';

import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TaskService } from '../services/task-service';

@Component({
  selector: 'tasks',
  encapsulation: ViewEncapsulation.None,
  template:`
  <div class="g-row">
    <div class="g-col">
      <task-form (createTask)="taskService.createTask($event)"></task-form>
    </div>
    
    <div class="g-col">
      <task-list 
        [filter]="filter$ | async"
        [tasks]="taskService.visibleTasks$"
        (remove)="taskService.removeTask($event)"
        (update)="taskService.updateTask($event)">        
      </task-list>
    </div>
  </div>
  `
})
export class TasksComponent {
  filter$: Observable<any>;

  constructor(public taskService: TaskService, public route: ActivatedRoute) {
    this.filter$ = route.params
      .pluck('completed')
      .do((value: string) => taskService.filterTasks(value));
  }
}