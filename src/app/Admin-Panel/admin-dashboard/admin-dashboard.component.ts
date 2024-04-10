import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
  ngOnInit(): void {
    this.getDataOfChart()
  }
  countOfWorkers:any
countOfUsers:any
countOfSupervisors:any
  constructor(private userService:UserServiceService){}
getDataOfChart()
{
  this.countOfSupervisors = this.userService.getSupervisorChartData();
  this.countOfUsers = this.userService.getUserChartData();
  this.countOfWorkers = this.userService.getWorkerChartData();
}

}
