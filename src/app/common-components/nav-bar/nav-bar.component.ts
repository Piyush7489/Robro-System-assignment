import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/payload/response/user-response';
import { UserServiceService } from 'src/app/service/user-service.service';
import Toasts from 'src/app/utils/Toast';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  constructor(private userService:UserServiceService,private router:Router){}
  ngOnInit(): void {
    this.getCurrentUser()
  }
  user:UserResponse = new UserResponse();
  imageUrl = 'http://localhost:4200/assets/profileImage/'

  getCurrentUser()
  {
    this.user = this.userService.getUserFromLocalStorage();
    this.imageUrl = this.imageUrl+this.user.profileImage
    console.log(this.imageUrl);
    
  }
  
  logout()
  {
    Swal.fire({
      icon:"warning",
      title:"Are you sure for Logout ??",
      confirmButtonText:"Logout",
      confirmButtonColor:'red',
      denyButtonText:"Cancel",
      denyButtonColor:"blue",
      showDenyButton: true,

      
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user")
        Toasts.fire({
          icon:'success',
          text:"Logout success"
        }).then(()=>{
          this.router.navigate([""])
        })
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }


}
