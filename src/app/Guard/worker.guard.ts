import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserServiceService } from '../service/user-service.service';
import { UserResponse } from '../payload/response/user-response';

@Injectable({
  providedIn: 'root'
})
export class workerGuard implements CanActivate {
  constructor(private router:Router,private userService:UserServiceService){}
  
  user:UserResponse = new UserResponse();
  canActivate(): boolean {
    this.user = this.userService.getUserFromLocalStorage();
    if(this.user.role === "WORKER"  && this.user != null) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

};
