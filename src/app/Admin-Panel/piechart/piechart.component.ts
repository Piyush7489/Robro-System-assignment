import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit{
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
  this.chartOptions.series=[this.countOfWorkers,this.countOfUsers,this.countOfSupervisors]
}
public chartOptions: any = {
  series: [44, 55, 13],
  chart: {
    width: 380,
    type: 'pie',
  },
  labels: ["Workers","Users","Supervisor"],
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
};

}
