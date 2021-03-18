import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Enquiry } from '../shared/enquiry';
import { EnquiryService } from '../shared/enquiry.service';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss']
})
export class EnquiryComponent implements OnInit {

  enquiry: Enquiry = new Enquiry;
  enquiries: Enquiry[] = [];
  page: number = 1;



  constructor(private enquiryService: EnquiryService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    console.log('running');
    this.getAllEnquiries();
  }


  getAllEnquiries() {
    this.enquiryService.getAllEnquiries().subscribe(
      response => {
        console.log(response);
        this.enquiries = response;
      }
    )
  }

  newEnquiry(content: any) {

  }

  updateEnquiry(contentEdit: any, enq: Enquiry) {

  }

}
