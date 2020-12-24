import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ISecondMenu, IStartMenu } from '../../app/shared/interfaces';

@Injectable()
export class DataService {

    baseUrl: string = 'assets/';
    
    constructor(private http: HttpClient) { }

    getSecondMenu(id: string) : Observable<ISecondMenu[]> {
      return this.http.get<ISecondMenu[]>(this.baseUrl + 'second-menu.json')
        .pipe(
          map(data => {
            let menu = data.filter((type: ISecondMenu) => type.id === id);
            return menu;          
          }),
          catchError(this.handleError)
        );
    }

    getStartMenu() : Observable<IStartMenu[]> {
       return this.http.get<IStartMenu[]>(this.baseUrl + 'start-menu.json')
          .pipe(
            catchError(this.handleError)
          );
    }
    



    private handleError(error: any) {
      console.error('server error:', error);
      if (error.error instanceof Error) {
          const errMessage = error.error.message;
          return Observable.throw(errMessage);
          // Use the following instead if using lite-server
          // return Observable.throw(err.text() || 'backend server error');
      }
      return Observable.throw(error || 'Node.js server error');
    }

}