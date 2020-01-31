import { Injectable } from '@angular/core';
import { Employee } from '../models/Employee.model';
// import { Observable } from 'rxjs';
import { Users } from '../mockdata/Users'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  empData: Employee[] = Users;
  apiUrl = 'http://localhost:3000/api/';
  constructor(private http: HttpClient) { }

  public getEmployData(): any {
    // const employeeObservable = new Observable(observer => {
    //   setTimeout(() => {
    //     observer.next(this.empData);
    //     observer.complete();
    //   }, 1000);
    // });
    // return employeeObservable;
    return this.http.get(this.apiUrl + 'employee');
  }

  public addEmployee(empData: Employee): any {
    return this.http.post(this.apiUrl + 'employee', empData);
  }
}
