import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Enquiry } from './enquiry';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  constructor(private httpclient: HttpClient) { }


  //list all Enquiries
  getAllEnquiries(): Observable<any> {

    return this.httpclient.get(environment.apiUrl + "/api/course-enquiries");
  }


  updateEnquiry(enq: Enquiry): Observable<any> {
    return this.httpclient.put(environment.apiUrl + "/api/employees", enq);
  }
}
