import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from 'src/app/models/item';
import { AdminService } from 'src/app/services/admin.service';
import { WithdrawDepositComponent } from '../withdraw-deposit/withdraw-deposit.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private service: AdminService, private fb: FormBuilder, private snack: MatSnackBar, private dialog:MatDialog) { }

  items:Item[];

  addItemForm: FormGroup;
  searchItemForm: FormGroup;

  messageForUser: string;


  ngOnInit(): void {
    this.addItemForm = this.fb.group({
      amount: ['', Validators.required],
      title: ['', [Validators.required]],
      inventoryCode: ['', Validators.required]
    });

    this.searchItemForm = this.fb.group({
      itemNo: [''],
      inventoryCode: ['']
    });
   
  }

  searchItems() {
    if (this.searchItemForm.controls['itemNo'].value == ''||this.searchItemForm.controls['inventoryCode'].value ==null) {
      this.service.getAllItems().subscribe((comps) => {
        this.items = comps;
        console.log(this.items);
        this.messageForUser = null;
      }, (err) => {
        console.log(err);
        this.messageForUser = err.error;
      });
    } else {
      this.service.getItemByNo(this.searchItemForm.controls['itemNo'].value).subscribe((res) => {
        this.items = new Array(1);
        this.items[0] = res;
        this.messageForUser = null;
      }, (err) => {
        this.messageForUser = err.error;
        alert(err.error);
      })

    }
  }

  withdrawDeposit(item:Item) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.restoreFocus = true;
    dialogConfig.data = {
      dataToSend: item
    };
    const dialogRef = this.dialog.open(WithdrawDepositComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data == undefined)
        return;
      item = data;
      console.log(data);
      console.log(item);
    })
  }

  deleteItem(item:Item) {
    this.service.deleteItem(item.itemNo).subscribe((res) => {
      this.messageForUser = res;
      this.showSnack();
      this.items.splice(this.items.indexOf(item), 1);
    }, (err) => {
      this.messageForUser = err.error;
      alert(err.error);
    });
  }


  addItem() {
    let p = new Item(0, this.addItemForm.controls['title'].value, this.addItemForm.controls['amount'].value,
      this.addItemForm.controls['inventoryCode'].value)
      console.log(p);
    this.service.addItem(p).subscribe((res) => {
      this.messageForUser = res;
      this.showSnack();
      this.formReset(this.addItemForm);
    }, (err) => {
      this.messageForUser = err.error;
      console.log(err);
      alert(err.error);
    });
  }

  showSnack() {
    let snackRef = this.snack.open(this.messageForUser, "close", { duration: 2000 });
    snackRef.onAction().subscribe(() => {
      this.snack.dismiss();
    })
  }

  formReset(form: FormGroup) {

    form.reset();

    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null) ;
    });
}
}
