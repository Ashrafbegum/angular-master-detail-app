import { Injectable } from '@angular/core';
import { ApplicationModel } from '../components/detail/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor() {
   }
  addApplication(applicationObj: ApplicationModel){
    let applications: ApplicationModel[];
    if(sessionStorage.getItem('Applications')) {
      applications = JSON.parse(sessionStorage.getItem('Applications') || '{}');
      applications = [...applications, applicationObj]
    } else {
      applications = [applicationObj]
    }
    sessionStorage.setItem('Applications', JSON.stringify(applications))
   }

   getApplications(){
     return JSON.parse(sessionStorage.getItem('Applications') || '{}');
   }
  //  removeApplication(){
  //   sessionStorage.removeItem('Applications');
  //  }
}
