import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast } from 'ngx-toastr';
import { UserResponse } from 'src/app/payload/response/user-response';
import { UserServiceService } from 'src/app/service/user-service.service';
import Toasts from 'src/app/utils/Toast';

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.css']
})
export class AddWorkerComponent implements OnInit{
  worker: UserResponse = new UserResponse();


  constructor(private userService: UserServiceService, private router: Router) {}

  ngOnInit(): void {
    // this.getAllUsers();
  }

  addWorkerData = new FormGroup({
    name:new FormControl('',[
      Validators.required, Validators.minLength(3), Validators.maxLength(10)
    ]),
    email:new FormControl('',[
      Validators.required,
      Validators.email,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/),
    ]),
    password:new FormControl('',[
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    ]),
    phone:new FormControl('',[
      Validators.required,
      Validators.pattern(/^\d{10}$/)
    ]),
  })

  get email(){
    return this.addWorkerData.get('email')
  }
  get password()
  {
    return this.addWorkerData.get('password')
  }
  get phone()
  {
    return this.addWorkerData.get('phone')
  }
  get name()
  {
    return this.addWorkerData.get('name')
  }

  

  public addWorker(data:FormGroup):void{
  
  // Add the worker using UserService method
  this.worker = data.value;
  this.worker.role =  "WORKER";
  this.userService.addWorkerAndSupervisor(this.worker).subscribe({
    next: () => {
      // Worker added successfully, now update the list of users in localStorage
      
      // Fetch the existing list of users from localStorage
      const usersString = localStorage.getItem('users');
      const users: UserResponse[] = usersString ? JSON.parse(usersString) : [];
      
      
      // Save the updated list of users back to localStorage
      localStorage.setItem('users', JSON.stringify(users));
      
      // Show success message
      Toasts.fire({
        icon: 'success',
        text: 'Worker Added Successfully'
      }).then(() => {
        // Redirect to appropriate page after adding worker
        const user = this.userService.getUserFromLocalStorage();
        if (user) {
          this.router.navigate([user.role.toLowerCase()]);
        } else {
          // Handle if user is not found in local storage
          console.error('User not found in local storage');
        }
      });
    },
    error: (error: any) => {
      console.error('Error adding worker:', error);
   
    }
  });
}

}
