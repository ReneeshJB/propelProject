import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  constructor(private httpclient: HttpClient) { }


  //list all Enquiries
  getAllEnquiries(): Observable<any> {

    return this.httpclient.get(environment.apiUrl + "/api/course-enquiries");
  }
}
