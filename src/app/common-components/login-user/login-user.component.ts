import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast } from 'ngx-toastr';
import { LoginData } from 'src/app/payload/request/login-data';
import { UserResponse } from 'src/app/payload/response/user-response';
import { UserServiceService } from 'src/app/service/user-service.service';
import Toasts from 'src/app/utils/Toast';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  constructor(private userService: UserServiceService, private router: Router) { }
  ngOnInit(): void {
    this.getAllUsers()
  }

  user: UserResponse[] = []
  flag: Boolean = false;
  loginData:LoginData = new LoginData();
  loginForm = new FormGroup({
    email:new FormControl('',[
      Validators.required,
      Validators.email,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/),
    ]),
    password:new FormControl('',[
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    ])
  })
  
  get email(){
    return this.loginForm.get('email')
  }
  get password()
  {
    return this.loginForm.get('password')
  }
  getAllUsers() {
     this.userService.getUsersFromJSON().subscribe({
      next:(data:any)=>{
        this.user = data.user
        
      }
     })
  }
  login(loginForm:FormGroup) {
    for (let u of this.user) {
      console.log(u.email === loginForm.get("email")?.value && u.password === loginForm.get('password')?.value);
      
      if (u.email === loginForm.get("email")?.value && u.password === loginForm.get('password')?.value) {
        this.userService.setUserInLocalStorage(u);
        Toasts.fire({
          icon: 'success',
          text: 'Login Success'
        }).then(() => {
          this.router.navigate(['/capture-image']);
        })
        break;
      }else{
        {
          alert("Hii")
          Toasts.fire({
            icon: 'error',
            text: "Invalid Credentials"
          })
        }
      }

    }
  }
}
