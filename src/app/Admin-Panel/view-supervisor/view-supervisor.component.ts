import { Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/payload/response/user-response';
import { UserServiceService } from 'src/app/service/user-service.service';
import Toasts from 'src/app/utils/Toast';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-supervisor',
  templateUrl: './view-supervisor.component.html',
  styleUrls: ['./view-supervisor.component.css']
})
export class ViewSupervisorComponent  implements OnInit{


  supervisors:UserResponse[] = [];
  constructor(private userService:UserServiceService){}
  ngOnInit(): void {
    this.getAllSupervisors()
  }
  getAllSupervisors()
  {
     this.supervisors = this.userService.getAllUser() ;
     this.supervisors = this.supervisors.filter((s)=>s.role === "SUPERVISOR")
  }


  deleteSupervisor(userId:String)
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
          text:"Supervisor is deleted..."
        })
        this.supervisors = this.supervisors.filter((w)=>w.userId != userId)
       
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
   
    localStorage.setItem("users",JSON.stringify( this.userService.deleteUserById(userId)));
  }
  }

