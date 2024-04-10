import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponse } from '../payload/response/user-response';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private usersUrl: string = "assets/User.json";
  private users: UserResponse[] = [];

  constructor(private http: HttpClient) { }

  // SET USER IN LOCAL STORAGE
  public setUserInLocalStorage(user: UserResponse): void {
    localStorage.setItem("user", JSON.stringify(user));
  }

  // // SET WORKERS IN LOCAL STORAGE
  // public setWorkersInLocalStorage(workers: UserResponse[]): void {
  //   localStorage.setItem("workers", JSON.stringify(workers));
  // }

  // GET USER FROM LOCAL STORAGE
  public getUserFromLocalStorage() {
    const user = localStorage.getItem("user");
    console.log(user);
    
    if (user != null)
      return JSON.parse(user)
  }

  // GET LIST OF ALL USERS FROM USER.JSON
  getAllUsers(): Observable<UserResponse[]> {
    return this.http.get<{ users: UserResponse[] }>(this.usersUrl)
      .pipe(
        map(response => response.users),
        catchError(error => {
          console.error('Error fetching users:', error);
          return throwError(error); // Rethrow the error to be handled by the caller
        })
      );
  }

  // ADD WORKER AND SUPERVISOR IN LOCAL STORAGE
  addWorkerAndSupervisor(user: any): Observable<any> {
    return new Observable<any>(observer => {
      // Fetch the existing list of users from localStorage
      const usersString = localStorage.getItem('users');
      let users: any[] = usersString ? JSON.parse(usersString) : [];
      user.userId = this.getRandomInt(1000, 9999) + "";

      user.profileImage = "user.png"
      // Add the new worker to the list of users
      users.push(user);

      // Save the updated list back to localStorage
      localStorage.setItem('users', JSON.stringify(users));

      // Emit the updated list as a response
      observer.next(users);
      observer.complete();
    }).pipe(
      catchError(error => {
        console.error('Error adding worker:', error);
        return throwError(error);
      })
    );
  }


  // Generate a random integer between min and max (inclusive)
  private getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // // GET ALL WORKERS
  // getAllWorkers(): Observable<UserResponse[]> {
  //   return new Observable<UserResponse[]>(observer => {
  //     const existingWorkersString = localStorage.getItem("workers");
  //     const existingWorkers: UserResponse[] = existingWorkersString ? JSON.parse(existingWorkersString) : [];

  //     this.getAllUsers().subscribe((users: UserResponse[]) => {
  //       const newWorkers = users.filter((user) => user.role === 'WORKER');
  //       const uniqueNewWorkers = newWorkers.filter(newWorker => !existingWorkers.some(existingWorker => existingWorker.userId === newWorker.userId));
  //       const updatedWorkers = existingWorkers.concat(uniqueNewWorkers);
  //       localStorage.setItem('workers', JSON.stringify(updatedWorkers));
  //       observer.next(updatedWorkers);
  //       observer.complete();
  //     });
  //   });
  // }

  // GET ALL USER FROM LOCAL STORAGE
  getAllUser() {
    let userStr = localStorage.getItem("users")
    if (userStr != null) {
      return JSON.parse(userStr);
    }
  }
  // // GET ALL WORKERS FROM LOCAL STORAGE
  // public getAllWorkersFromLocalStorage(): UserResponse[] {
  //   const str = localStorage.getItem("workers");
  //   return str ? JSON.parse(str) : [];
  // }

  // // SET ALL USERS IN LOCAL STORAGE
  // public setAllUsersInLocalStorage(users: UserResponse[]): void {
  //   localStorage.setItem("users", JSON.stringify(users));
  // }

  // DELETE/REMOVE FROM LOCAL STORAGE BY USER ID
  public deleteUserById(userId: String) {
    return this.getAllUser().filter((user: any) => user.userId != userId)
  }

  // GET USERS FROM JSON FILE FOR LOGIN
  public getUsersFromJSON()
  {
    return this.http.get(this.usersUrl); 
  }

  public getWorkerChartData()
  {
   
    let workers:any
    let countOfWorkers:any
    workers = this.getAllUser().filter((worker:any)=>worker.role === "WORKER")
    countOfWorkers = workers.length;
    return countOfWorkers;
  }

  public getSupervisorChartData()
  {
    let supervisors:any
    let countOfSupervisors:any
    supervisors = this.getAllUser().filter((supervisor:any)=>supervisor.role === "SUPERVISOR")
    countOfSupervisors = supervisors.length;
    return countOfSupervisors;
  }

  public getUserChartData()
  {
    let users:any
    let countOfUsers:any
    users = this.getAllUser()
    countOfUsers = users.length;
    return countOfUsers
  }
}
