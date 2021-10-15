import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import { ApplicationService } from 'src/app/service/application.service';
import { ApplicationModel } from '../../models/application.model';
import { ActivatedRoute } from '@angular/router';
import { ApplicantModel } from 'src/app/models/applicant.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  values = [1,2,3,4,5,6,7]
  
   applicationForm !: FormGroup;
   applicationObj : ApplicationModel = new ApplicationModel();
  //  applicationObj !: ApplicationModel;
  // appIDTypeSeleted: Array<String>=[];
  //public buttonGroup: FormControl; 
  appIDTypeValue: Array<String>=[];

  formErrors: any = {
    'appNumber': '',
    'appType': '',
    'amount': '',
    'status': '',
    'name': '',
    'appIDType': '',
    'gender': ''
  };
  
  validationMessages: any = {
    'appNumber': {
      'required': 'Application number is required.',
      'pattern': 'Application number must be a number.'
    },
    'appType': {
      'required': 'Application type is required.',
    },
    'amount': {
      'required': 'Amount is required.',
      'pattern': 'Amount must be a number.'
    },
    'status': {
      'required': 'Status is required.',
    },
    'name': {
      'required': 'Name is required.',
      'pattern': 'Name must have characters only.',
    },
    'appIDType': {
      'required': 'Application ID Type is required.',
    },
    'gender': {
      'required': 'Gender is required.',
    },
  };
  
  
  constructor(private formbuilder: FormBuilder, private appService: ApplicationService, private router: Router, private route: ActivatedRoute ) { 

  }

  ngOnInit(): void {
   
    //Set validations
    this.applicationForm = this.formbuilder.group ({
      appNumber: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      appType: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      status: ['', Validators.required],
      applicants: this.formbuilder.array([this.addApplicantsGroup()]),
    })

    this.route.paramMap.subscribe(params => {
      const appNumber = Number(params.get('id'));
        if(appNumber != 0) {
          this.getApplication(appNumber);  
        }
    })

     // When any of the form control value in employee form changes
  // our validation function logValidationErrors() is called
  this.applicationForm.valueChanges.subscribe((data) => {
    this.logValidationErrors(this.applicationForm);
  });
  }

  logValidationErrors(group: FormGroup = this.applicationForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        console.log("Abstract control:")
        console.log(abstractControl)
        this.logValidationErrors(abstractControl);
      } else {
        this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid
            && (abstractControl.touched || abstractControl.dirty)) {
          const messages = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }
  
  //Add validations
  addApplicantsGroup(){
    return this.formbuilder.group({
      name: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]+')]],
      appIDType: [[], Validators.required],
      gender: ['', Validators.required],
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
        console.log("At least one applicant is required")
      } else {
        this.applicantsArray.removeAt(index);
      }
   }	

    getApplication(appNumber: Number) {
        this.applicationObj = this.appService.getApplication(appNumber);
        this.editApplication(this.applicationObj);
    }
    
    //Edit application
    editApplication(app: ApplicationModel) {
      this.applicationForm.patchValue({
          appNumber: app.appNumber,
          appType: app.appType,
          amount: app.amount,
          status: app.status,
        })
        this.applicationForm.setControl('applicants', this.setApplicantsGroup(app.applicants))
    }

    // Set Applicantsa on edit
    setApplicantsGroup(applicants: ApplicantModel[]): FormArray{
      const formArray = new FormArray([]);
      applicants.forEach(app => {
        formArray.push(this.formbuilder.group({
          name: app.name,
          appIDType: app.appIDType,
          gender: app.gender,
        }))
      })
      return formArray;
    }

    //Save the application
   onSave(){
    console.log(this.applicationForm.value)
    this.applicationObj = Object.assign(this.applicationObj, this.applicationForm.value)
    this.appService.addApplication(this.applicationObj)
    this.applicationForm.reset();
    this.router.navigate(['/master']);

  }
}
