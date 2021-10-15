import { Injectable } from '@angular/core';
import { ApplicationModel } from '../models//application.model';

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
      [
        {name: 'Ashraf', appIDType: ['Australian Passport', 'Driver Licence'], gender: true}, 
        {name: 'Saqib', appIDType: ['Foreign Passport', 'Forign ID Card'], gender: false}
      ]
    }];

  constructor() {
   }

   //Add application to session storage
  addApplication(applicationObj: ApplicationModel){
    if(sessionStorage.getItem('Saved-Applications')) {
      this.applications = JSON.parse(sessionStorage.getItem('Saved-Applications') || '{}');
      //Check if the application already exist
      const index = this.applications.findIndex(x => x.appNumber === applicationObj.appNumber);
      if (index >= 0) {
        // Replace existing application with the new application
        this.applications.splice(index, 1, applicationObj);
      } else {
        //If it is the new application
        this.applications = [...this.applications, applicationObj]
      }
    } else {
      //If it is the first application to be added 
      this.applications = [applicationObj]
    }
    sessionStorage.setItem('Saved-Applications', JSON.stringify(this.applications))
  }

  //Get all existing applications from the session storage
   getApplications(){
     return JSON.parse(sessionStorage.getItem('Saved-Applications') || '{}');
   }

// Get an application for the given id from the session storage
   getApplication(id: Number): any {
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
