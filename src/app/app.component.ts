import { Component } from '@angular/core';
import { CommonService } from './services/common.service';
import { Employee } from './models/Employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  empData = [];
  registerForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private commonService: CommonService) {}
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  
  ngOnInit() {
    this.getEmployeeData();
    this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        empcode: ['', Validators.required],
        department: ['', Validators.required],
        grade: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit = () => {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    // display form values on success
    if(<Employee>this.registerForm.value) {
      console.log('form submitted ===>>>');
      this.commonService.addEmployee(this.registerForm.value).subscribe(
        response => {
          this.getEmployeeData();
          this.submitted = false;
          this.registerForm.reset();
        },
        error => console.log('error ==>>', error)
      );
    } else {
      console.log('form not submitted ===>>>');
    }
  }
  getEmployeeData = () => {
    this.commonService.getEmployData().subscribe(
      response => this.empData = <Employee[]>response.data,
      error => console.log('error in employees data ==>>', error)
    );
  }
}
