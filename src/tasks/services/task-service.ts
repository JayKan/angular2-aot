import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AuthService } from '../../auth';
import { ITask, Task } from '../models/task';

@Injectable()
export class TaskService {
  visibleTasks$: Observable<ITask[]>;

  private _filter$: ReplaySubject<any> = new ReplaySubject<any>(1);
  private _filteredTasks$: FirebaseListObservable<ITask[]>;
  private _tasks$: FirebaseListObservable<ITask[]>;

  constructor(public af: AngularFire, public auth: AuthService) {
    const path: string = `/tasks/${auth.id}`;

    this._tasks$ = af.database.list(path);

    this._filteredTasks$ = af.database.list(path, { query: {
      orderByChild: 'completed',
      equalTo: this._filter$
    }});

    this.visibleTasks$ = this._filter$
      .switchMap(filter => filter === null ? this._tasks$ : this._filteredTasks$);
  }

  filterTasks(filter: string): void {
    switch (filter) {
      case 'false':
        this._filter$.next(false);
        break;

      case 'true':
        this._filter$.next(true);
        break;

      default:
        this._filter$.next(null);
        break;
    }
  }

  createTask(title: string): firebase.Promise<any> {
    return this._tasks$.push(new Task(title));
  }

  removeTask(task: ITask): firebase.Promise<any> {
    return this._tasks$.remove(task.$key);
  }

  updateTask(task: ITask, changes?: any): firebase.Promise<any> {
    return this._tasks$.update(task.$key, changes);
  }

}