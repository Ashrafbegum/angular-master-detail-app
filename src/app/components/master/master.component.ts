import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/service/application.service';
import { ApplicationModel } from '../detail/application.model';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  applications !: Array<ApplicationModel>;
    constructor(private application: ApplicationService ) {
   }

  ngOnInit(): void {
    this.getAllApplications();
  }

  getAllApplications(){
    this.applications= this.application.getApplications();
  }

  onEdit(application: ApplicationModel){
    console.log("in onEdit")
  }

  // removeAllApplications(){
  //   this.application.removeApplication()
  //  }
}