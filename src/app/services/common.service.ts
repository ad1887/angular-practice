import { Injectable } from '@angular/core';
import { Employee } from '../models/Employee.model';
import { EmpData } from '../models/empdataResponse.model';
import { Observable } from 'rxjs';
import { Users } from '../mockdata/Users'
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  empData: Employee[] = Users;
  apiUrl = 'http://localhost:3000/api/';
  constructor(private http: HttpClient) { }

  public getEmployData(): Observable<EmpData> {
    return this.http.get<EmpData>(this.apiUrl + 'employee');
  }

  public addEmployee(empData: Employee): any {
    return this.http.post(this.apiUrl + 'employee', empData);
  }

  public add(x:number, y:number): number {
    return x + y;
  }
}
