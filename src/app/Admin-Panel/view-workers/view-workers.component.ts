import { Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/payload/response/user-response';
import { UserServiceService } from 'src/app/service/user-service.service';
import Toasts from 'src/app/utils/Toast';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-workers',
  templateUrl: './view-workers.component.html',
  styleUrls: ['./view-workers.component.css']
})
export class ViewWorkersComponent implements OnInit{
  ngOnInit(): void {
    this.getAllWorkers()
  }
  constructor(private userService:UserServiceService){}

  workers:UserResponse[] = []
  getAllWorkers()
  {
     this.workers = this.userService.getAllUser().filter((worker:any)=> worker.role === "WORKER") ;
  }

  deleteWorker(userId:String)
  {
    Swal.fire({
      icon:"question",
      title:"Are you sure ??",
      confirmButtonText:"Delete",
      denyButtonText:"Cancel",
      showDenyButton: true,

      
    }).then((result) => {
      if (result.isConfirmed) {
        Toasts.fire({
          icon:'success',
          text:"Worker is deleted..."
        })
        this.workers = this.workers.filter((w)=>w.userId != userId)
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
   
    localStorage.setItem("users",JSON.stringify(this.userService.deleteUserById(userId)));
  }

}
