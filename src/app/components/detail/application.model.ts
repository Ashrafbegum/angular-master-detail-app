import { ApplicantModel } from './applicant.model';

export class ApplicationModel {
     appNumber: number = 0;
     appType: string='';
     amount: string ='';
     status: string ='';
     applicant: Array<ApplicantModel>=[];
}