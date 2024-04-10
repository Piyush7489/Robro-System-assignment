import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WebcamImage } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { UserResponse } from 'src/app/payload/response/user-response';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-capture-image',
  templateUrl: './capture-image.component.html',
  styleUrls: ['./capture-image.component.css']
})
export class CaptureImageComponent {
  private trigger: Subject<any> = new Subject();
  webcamImage: any;
  private nextWebcam: Subject<any> = new Subject();
  sysImage = '';
  user:UserResponse = new UserResponse();
 constructor(private userService:UserServiceService,private router:Router){}

  public getSnapshot(): void {
    
    this.trigger.next(void 0);
  }

  public captureImg(webcamImage: any): void {
    console.log(webcamImage);
    this.user = this.userService.getUserFromLocalStorage();
    this.user.loginimage = webcamImage.imageAsDataUrl;
    console.log(this.user.loginimage.data);
    
    this.userService.setUserInLocalStorage(this.user)
    this.router.navigate([this.user.role.toLocaleLowerCase()])
    // this.webcamImage = webcamImage;
    // this.sysImage = webcamImage!.imageAsDataUrl;
    // console.info('got webcam image', this.sysImage);

  }

  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }
}