import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Transactions } from '../classes/transactions';
import { User } from '../classes/User';
import { AuthenticationService } from '../services/authentication.service';
import { TransactionsService } from '../services/transactions.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'make-transaction',
  templateUrl: './make-transaction.component.html',
  styleUrls: ['./make-transaction.component.css']
})
export class MakeTransactionComponent implements OnInit {
  currentUser: User;

  constructor(private userService:UserService,private authservice:AuthenticationService,private transactionService:TransactionsService) { 
    this.currentUser = this.authservice.currentUserValue;

  }
  ngOnInit(): void {
     //this.userService.getUserById();
   

  }
   curUser = this.authservice.currentUserValue;

   form = new FormGroup({
   // fromaccno: new FormControl(t),
      toaccno: new FormControl(''),
      ammount: new FormControl('')
    });

  
  loading:boolean;

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.loading=true;
    console.warn(this.form.value.ammount);
    const currentUser = this.authservice.currentUserValue;

this.transaction(currentUser.account.AccNo,this.form.value.toaccno,this.form.value.ammount);
this.loading=false;

  }




 transaction(fromAccNo:number,toAccNo:number,Ammount:number){
let touser=new User();
let fromUser=new User();


this.userService.getByAccNo(fromAccNo).subscribe(res=>{

     

touser=res[0];
console.log(res);
console.log(touser.account.balance);

touser.account.balance=touser.account.balance+Ammount
this.userService.updateUser(touser.id,touser).subscribe();

this.userService.getByAccNo(toAccNo).subscribe(res=>{

fromUser=res[0];
fromUser.account.balance=fromUser.account.balance-Ammount
this.userService.updateUser(fromUser.id,fromUser).subscribe();
this.transactionService.getTrans().subscribe(ind=>{

let trans=new Transactions();
trans.fromAccNo=fromAccNo;
trans.toAccNo=toAccNo;
trans.transactionAmmount=Ammount;
trans.transactionDate=new Date();
trans.transactionRemarks="sucessfull"
trans.BalanceOnDate=fromUser.account.balance;
trans.transactionId=ind.length+1

this.transactionService.saveTransaction(trans).subscribe();
});

}) 


});



 }



  
}
