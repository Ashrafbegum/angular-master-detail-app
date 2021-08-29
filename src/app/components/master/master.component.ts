import { Component, OnInit, Input } from '@angular/core';
import { ApplicationService } from 'src/app/service/application.service';
import { ApplicationModel } from '../../models/application.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  applications !: Array<ApplicationModel>;
  // @Input() applicationObj: ApplicationModel;
    constructor(private appService: ApplicationService, private router: Router) {
   }

  ngOnInit(): void {
    this.applications= this.appService.getApplications();
  }

  editApplication(appNumber: number){
    this.router.navigate(['/edit', appNumber])
  }
}