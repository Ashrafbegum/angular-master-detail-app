import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ApplicationService } from 'src/app/service/application.service';
import { ApplicationModel } from './application.model';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  applicationForm !: FormGroup;
  applicationObj: ApplicationModel = new ApplicationModel();
  constructor(private formbuilder: FormBuilder, private application: ApplicationService ) { }

  ngOnInit(): void {
    this.applicationForm = this.formbuilder.group ({
      appNumber: [''],
      appType: [''],
      amount: [''],
      status: [''],
      applicants: this.formbuilder.array([this.addApplicantsGroup()])
    })
  }

  addApplicantsGroup(){
    return this.formbuilder.group({
      name: [''],
      gender: ['']
    });
  }

  get applicantsArray(){
    return <FormArray> this.applicationForm.get('applicants');
  }

  addApplicant(){
    this.applicantsArray.push(this.addApplicantsGroup())
  }
  removeApplicant(index: number) {
      if(this.applicantsArray.length == 1)  {
        console.log("Atleast one applicant is required")
      } else {
        this.applicantsArray.removeAt(index);
      }
  }

  onSave(){
    console.log(this.applicationForm.value)
    this.applicationObj = Object.assign(this.applicationObj, this.applicationForm.value)
    this.application.addApplication(this.applicationObj)
    this.applicationForm.reset();
  }
}
