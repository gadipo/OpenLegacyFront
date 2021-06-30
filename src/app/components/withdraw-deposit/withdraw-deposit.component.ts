import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from 'src/app/models/item';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-withdraw-deposit',
  templateUrl: './withdraw-deposit.component.html',
  styleUrls: ['./withdraw-deposit.component.scss']
})
export class WithdrawDepositComponent implements OnInit {

  item:Item;

  withdrawForm:FormGroup;
  depositForm:FormGroup;

  messageForUser:string;

  constructor(private dialogRef:MatDialogRef<WithdrawDepositComponent>,
    @Inject(MAT_DIALOG_DATA) data, private fb:FormBuilder,private service:AdminService,private snack:MatSnackBar) {this.item = data.dataToSend }

  ngOnInit(): void {
    this.withdrawForm = this.fb.group({
      amountToWithdraw:['',Validators.required]
    })
    this.depositForm =this.fb.group({
      amountToDeposit:['',[Validators.required]],
    })
  }

  withdraw(){
    console.log(this.item);
    this.service.withdrawItems(this.item.itemNo,this.withdrawForm.controls['amountToWithdraw'].value).subscribe((res)=>{
      this.messageForUser =res;
      this.showSnack();
      this.dialogRef.close();
    }, (err)=> {
      alert(err.error); 
    });
  } 
  
  deposit(){
    this.service.depositItems(this.item.itemNo,this.depositForm.controls['amountToDeposit'].value).subscribe((res)=>{
      this.messageForUser =res;
      this.showSnack();
      this.dialogRef.close();
    }, (err)=> {
      alert(err.error); 
    });
  }

  showSnack() {
    let snackRef = this.snack.open(this.messageForUser, "close", { duration: 2000 });
    snackRef.onAction().subscribe(() => {
      this.snack.dismiss();
    })
  }

}
