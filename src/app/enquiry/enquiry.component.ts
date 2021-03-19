import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Enquiry } from '../shared/enquiry';
import { EnquiryService } from '../shared/enquiry.service';
import { Status } from '../shared/status';
import { StatusService } from '../shared/status.service';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss']
})
export class EnquiryComponent implements OnInit {

  enquiry: Enquiry = new Enquiry;
  enquiries: Enquiry[] = [];
  page: number = 1;

  closeResult = '';
  addForm!: FormGroup;
  editForm!: FormGroup;
  statuses: Status[] = [];



  constructor(private enquiryService: EnquiryService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private statusService: StatusService) { }

  ngOnInit(): void {
    console.log('running');
    this.getAllEnquiries();
    this.getAllStatus();

    // this.addForm = this.fb.group();

    this.addForm = this.fb.group(
      {
        name: ['',Validators.required,Validators.pattern('[a-zA-Z]*'),Validators.minLength(2)],

        // name: new FormControl(this.enquiry.name, [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(2)])
        dob:[''],
        email:[''],
        highestQual:[''],
        status:['']

      }
    );
  }

  //Get all Status
  getAllStatus() {
    this.statusService.getAllStatuses().subscribe(
      response => {
        this.statuses = response;
      }
    )
  }

  //Get All Enquiries
  getAllEnquiries() {
    this.enquiryService.getAllEnquiries().subscribe(
      response => {
        console.log(response);
        this.enquiries = response;
      }
    )
  }

  //New Enquiry Form
  newEnquiry(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;

      }, (reason) => {
        this.closeResult = ` Dismissed with : ${this.getDismissedReason(reason)}`;
      }

    )
  }

  //Submit Enquiry 
  onSubmit() {
    //Assigning values from editForm to Model
    this.enquiry = this.addForm?.value;
    console.log(this.enquiry);

    //Call Service for update
    this.enquiryService.updateEnquiry(this.enquiry).subscribe(
      (result) => {
        console.log(result);
        this.ngOnInit();
      }
    )
    this.modalService.dismissAll();
  }

  //Get DismissReason
  private getDismissedReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }

  }

  updateEnquiry(contentEdit: any, enq: Enquiry) {

  }

}
