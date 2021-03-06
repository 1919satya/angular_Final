import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../classes/User';
import { Account } from '../classes/Account';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient ) { }

  private baseUrl='http://localhost:3000/users/';


  createUser(user:User):Observable<Object>{
    return this.http.post(this.baseUrl,user);
  }

  getUsersLList(){
    return this.http.get(this.baseUrl).pipe(
      map(responseData => {
        //console.log(responseData);
        const data = [];
        for (const key in responseData) {

          //console.log(responseData[key].date+"keyvalue")
          if (responseData.hasOwnProperty(key)) {


           data.push({ ...responseData[key]});
          }
        }
        return data;
      })
    
    );
  }


getUserById(id:number){
  return this.http.get<User>(this.baseUrl+id);

}

  updateUser(id:number,user:User){
    return this.http.put(this.baseUrl+`${id}`,user);
  }


  getByAccNo(accno){

    return this.http.get<User>(this.baseUrl+"?account.AccNo="+accno)

}

}