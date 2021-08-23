import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
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

  applicationForm !: FormGroup;
   applicationObj : ApplicationModel = new ApplicationModel();
  //  applicationObj !: ApplicationModel;

  constructor(private formbuilder: FormBuilder, private appService: ApplicationService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.applicationForm = this.formbuilder.group ({
      appNumber: [''],
      appType: [''],
      amount: [''],
      status: [''],
      applicants: this.formbuilder.array([this.addApplicantsGroup()])
    })

    this.route.paramMap.subscribe(params => {
      const appNumber = Number(params.get('id'));
      console.log("in detail getting params")
      console.log(Number(params.get('id')));
      console.log(params.get('id'));
      console.log(appNumber);

        if(appNumber != 0) {
          this.getApplication(appNumber);  
        }
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

    getApplication(appNumber: Number) {
      console.log("appnumber in getApplication")
      console.log(appNumber);
      // if(appNumber) {
      //     this.applicationObj = {
      //       appNumber: 0,
      //       appType: '',
      //       amount: '',
      //       status: '',
      //       this.applicationForm.setControl('applicants', this.setEmptyApplicantsGroup(applicants))
      //     }
      // } else {
        this.applicationObj = this.appService.getApplication(appNumber);
        this.editApplication(this.applicationObj);
     // }
    }
    
    editApplication(app: ApplicationModel) {
      this.applicationForm.patchValue({
          appNumber: app.appNumber,
          appType: app.appType,
          amount: app.amount,
          status: app.status,
        })
        this.applicationForm.setControl('applicants', this.setApplicantsGroup(app.applicants))
    }

    setApplicantsGroup(applicants: ApplicantModel[]): FormArray{
      const formArray = new FormArray([]);
      applicants.forEach(app => {
        formArray.push(this.formbuilder.group({
          name: app.name,
          gender: app.gender
        }))
      })
      return formArray;
    }
  
   onSave(){
    console.log(this.applicationForm.value)
    this.applicationObj = Object.assign(this.applicationObj, this.applicationForm.value)
    this.appService.addApplication(this.applicationObj)
    this.applicationForm.reset();
    this.router.navigate(['/master']);

  }
}



// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
// import { ApplicationService } from 'src/app/service/application.service';
// import { ApplicationModel } from '../../models/application.model';
// import { ActivatedRoute } from '@angular/router';
// @Component({
//   selector: 'app-detail',
//   templateUrl: './detail.component.html',
//   styleUrls: ['./detail.component.css']
// })
// export class DetailComponent implements OnInit {

//   applicationForm !: FormGroup;
//   applicationObj: ApplicationModel = new ApplicationModel();
//   constructor(private formbuilder: FormBuilder, private appService: ApplicationService, private route: ActivatedRoute ) { }

//   ngOnInit(): void {
//     this.applicationForm = this.formbuilder.group ({
//       appNumber: [''],
//       appType: [''],
//       amount: [''],
//       status: [''],
//       applicant: this.formbuilder.group({
//         name: [''],
//         gender: [''],
//       }),   
//       applicantsArray: this.formbuilder.array([])
//     })
//       // applicants: this.formbuilder.array([this.addApplicantsGroup()])
//   }
    
//     this.route.paramMap.subscribe(params => {
//       const appNumber = params.get('id');
//       if(appNumber) {
//         this.getApplication(appNumber);
//       }
//     })
//   }

//   getApplication(appNumber: any) {
//     this.applicationObj = this.appService.getApplication(appNumber);
//     this.editApplication(this.applicationObj);
//   }

//   editApplication(app: any) {
//     this.applicationForm.patchValue({
//       appNumber: app.appNumber,
//       appType: app.appType,
//       amount: app.amount,
//       status: app.statu,
//       name: app.name,
//       gender: app.gender
//     })
//   }

//   // addApplicantsGroup(){
//   //   return this.formbuilder.group({
//   //     name: [''],
//   //     gender: ['']
//   //   });
//   // }

//   get applicantsArray(){
//     return <FormArray> this.applicationForm.get('applicantsArray');
//   }

//   addApplicant(){
//     // this.applicantsArray.push(this.addApplicantsGroup())
//     this.applicantsArray.push(
//       this.formbuilder.group({
//         name: [''],
//         gender: ['']
//       })
//     )
//   }
//   removeApplicant(index: number) {
//       if(this.applicantsArray.length == 1)  {
//         console.log("Atleast one applicant is required")
//       } else {
//         this.applicantsArray.removeAt(index);
//       }
//   }

//   onSave(): void{
//     console.log(this.applicationForm.value)
//     this.applicationObj = Object.assign(this.applicationObj, this.applicationForm.value)
//     this.appService.addApplication(this.applicationObj)
//     this.applicationForm.reset();
//   }
// }
