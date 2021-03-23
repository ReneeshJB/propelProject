import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from './course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpclient : HttpClient) { }

  getAllCourses():Observable<any>{
    return this.httpclient.get(environment.apiUrl + "/api/courses");
  }
}
