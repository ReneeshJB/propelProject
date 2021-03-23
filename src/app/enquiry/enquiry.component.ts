import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Course } from '../shared/course';
import { CourseService } from '../shared/course.service';
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
  courses: Course[] = [];

  isSubmitted = false;
  error = '';
  // enquiredCourses:any;


  constructor(private enquiryService: EnquiryService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private statusService: StatusService,
    private courseService: CourseService) { }

  ngOnInit(): void {
    console.log('running');
    this.getAllEnquiries();
    this.getAllStatus();
    this.getAllCourses();

    this.addForm = this.fb.group(
      {
        // name: ['', [Validators.required]],
        // // name: new FormControl(this.enquiry.name, [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(2)])
        // dob: ['', [Validators.required]],
        // email: ['', [Validators.required,Validators.email]],
        // highestQual: ['', [Validators.required]],
        // status: ['', [Validators.required]]
        name: [''],
        dob: [''],
        email: [''],
        highestQual: [''],
        status: [''],
        // enquiredCourses: this.fb.array(this.enquiredCourses.map(x =>this.courses.indexOf(x) > -1))
        enquiredCourses: this.fb.array([])
      }
    );
  }

  get formControls() {
    return this.addForm.controls;
  }

  onCheckChange(event: any) {
    const formArray: FormArray = this.addForm.get('enquiredCourses') as FormArray;

    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else {
      // find the unselected element
      let i: number = 0;

      formArray.controls.forEach(
        (ctrl: any) =>{
        if (ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  //Get all Status
  getAllStatus() {
    this.statusService.getAllStatuses().subscribe(
      response => {
        this.statuses = response;
      }
    )
  }

  getAllCourses() {

    this.courseService.getAllCourses().subscribe(
      response => {
        console.log("courses");
        console.log(response);
        this.courses = response;
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
  newEnquiry(targetModal: any) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'md'
    });
  }

  //Submit Enquiry 
  onSubmit() {
    this.isSubmitted = true;
    if (this.addForm.invalid) {
      console.log("invalid");
      this.error = "Invalid";
      return;
    }
    if (this.addForm.valid) {
      console.log("valid");
      //Assigning values from editForm to Model
      this.enquiry = this.addForm?.value;
      console.log(this.enquiry);

      //Call Service for insert
      this.enquiryService.insertEnquiry(this.enquiry).subscribe(
        (result) => {
          console.log(result);
          this.ngOnInit();
        }
      )
      this.modalService.dismissAll();
    }
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
