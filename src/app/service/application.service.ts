import { Injectable } from '@angular/core';
import { ApplicationModel } from '../models//application.model';
import { ApplicantModel } from '../models/applicant.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
// private applicantsMod: ApplicantModel = [{name: 'Ashraf', gender: 'Female'}, {name: 'Saqib', gener: 'Male'}]
  private applications: ApplicationModel[] =[
    {
    appNumber: 1,
    appType:"Home loan",
    amount:"100",
    status:"active",
    applicants:
    [{name: 'Ashraf', gender: true}, {name: 'Saqib', gender: false}]
      }];

  constructor() {
    // sessionStorage.setItem('Saved-Applications', JSON.stringify(this.applications));
   }
  addApplication(applicationObj: ApplicationModel){
   // let isFound = false;
   // let applications: ApplicationModel[];
    if(sessionStorage.getItem('Saved-Applications')) {
      this.applications = JSON.parse(sessionStorage.getItem('Saved-Applications') || '{}');
      // this.applications = JSON.parse(sessionStorage.getItem('Saved-Applications'));
    //  this.applications = [...this.applications, applicationObj]
      for (var app of this.applications) {
        if(app.appNumber == applicationObj.appNumber) {
          console.log("in if condition of addApplication ")
          console.log(app.appNumber)
          console.log(applicationObj.appNumber)
          // const index = this.applications.findIndex(app => app.appNumber === applicationObj.appNumber);

            const index = this.applications.indexOf(applicationObj);
             if(index !== -1) {
            //   this.applications.splice(this.applications.indexOf(app), index, applicationObj)

            // console.log("index")
            // console.log(index)
             this.applications[index] = applicationObj;
             break;
            }
        } else {
          console.log("addApplication called by new application")
            this.applications = [...this.applications, applicationObj]
        }
      }  
      //   isFound = true;
            // console.log(this.applications[index])
           // break;
        // } if(!isFound) {
        //   console.log("in else condition of addApplication ")

        //   this.applications = [...this.applications, applicationObj]
        // }
    // }
    } else {
      console.log("in addApplication  no storage exist")

      this.applications = [applicationObj]
    }
    sessionStorage.setItem('Saved-Applications', JSON.stringify(this.applications))
  }

   getApplications(){
     return JSON.parse(sessionStorage.getItem('Saved-Applications') || '{}');
   }

   getApplication(id: Number): any {
    // let applications: ApplicationModel[];
    if(sessionStorage.getItem('Saved-Applications')) {
      this.applications = JSON.parse(sessionStorage.getItem('Saved-Applications') || '{}');  
      for (var app of this.applications) {
        if(app.appNumber == id) {
          return(app)
        } 
      }  
    }
      return null;
  }
  //  removeApplication(){
  //   sessionStorage.removeItem('Saved-Applications');
  //  }
}
