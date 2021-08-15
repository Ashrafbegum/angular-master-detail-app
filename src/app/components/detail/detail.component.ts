import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      name: [''],
      gender: ['']
    })
  }

  handleSubmit(){
    //console.log(this.applicationForm.value)
    this.applicationObj = Object.assign(this.applicationObj, this.applicationForm.value)
    this.application.addApplication(this.applicationObj)
    this.applicationForm.reset();
  }
  retrieve(){
    this.application.getApplication()
   }
   remove(){
    this.application.removeApplication()
   }
}
