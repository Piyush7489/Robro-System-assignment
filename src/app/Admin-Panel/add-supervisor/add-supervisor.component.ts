import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/payload/response/user-response';
import { UserServiceService } from 'src/app/service/user-service.service';
import Toasts from 'src/app/utils/Toast';

@Component({
  selector: 'app-add-supervisor',
  templateUrl: './add-supervisor.component.html',
  styleUrls: ['./add-supervisor.component.css']
})
export class AddSupervisorComponent implements OnInit{

  ngOnInit(): void {
  }
  constructor(private userService:UserServiceService,private router:Router){}
  supervisor:UserResponse = new UserResponse();

  addSupervisorData = new FormGroup({
    
    email:new FormControl('',[
      Validators.required,
      Validators.email,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/),
    ]),
    name:new FormControl('',[
      Validators.required, Validators.minLength(3), Validators.maxLength(10)
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

  get name()
  {
    return this.addSupervisorData.get('name')
  }
  get email(){
    return this.addSupervisorData.get('email')
  }
  get password()
  {
    return this.addSupervisorData.get('password')
  }
  get phone()
  {
    return this.addSupervisorData.get('phone')
  }
 


  addSupervisor(data:FormGroup)
  {
    this.supervisor = data.value;
    this.supervisor.role = "SUPERVISOR";
    console.log(data.value);
    
    // Add the worker using UserService method
  this.userService.addWorkerAndSupervisor(this.supervisor).subscribe({
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
        text: ' Supervisor Added Successfully'
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
