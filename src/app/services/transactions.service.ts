import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transactions } from '../classes/transactions';
import { User } from '../classes/User';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http:HttpClient) { }
  private baseUrl='http://localhost:4000/transactions/';


  saveTransaction(trans:Transactions):Observable<Object>{
    return this.http.post(this.baseUrl,trans);
  }

  getTrans(){
    let url = "http://localhost:4000/transactions/";

      return this.http.get(url)
        .pipe(
         map(responseData => {
           //console.log(responseData);
           const transactions = [];
           for (const key in responseData) {
 
             console.log(responseData[key].transactionDate+"keyvalue")
             if (responseData.hasOwnProperty(key)) {
 
 
              transactions.push({ ...responseData[key], id: key });
             }
           }
           return transactions;
         })
       
       ) 
  }
  getBydate(sd:Date,ed:Date){

    /* console.log(sd)
    console.log(ed+typeof(ed)) */
    
    let  p=new Date();
    //console.log(p)
        let url = "http://localhost:4000/transactions/";
    
        return this.http
         .get(url)
         .pipe(
           map(responseData => {
             //console.log(responseData);
             const transactions = [];
             for (const key in responseData) {
             // console.log(responseData[key].date)
               let a=responseData[key].transactionDate;
               console.log(a)
               let k=new Date(a);
               console.log(k);
               console.log(k.getDate()); 
               console.log(k>sd)
               console.log(k<=ed)
               console.log(k>sd&&k<ed) 
             
               if (k>=sd&&k<=ed) {
                transactions.push({ ...responseData[key], id: key });
               } 
             }
             console.log(transactions)
             return transactions;
           })
         
         )
    
    
    
      }
    
    
}
