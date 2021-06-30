import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private client: HttpClient) { }

  addItem(item: Item) {
    console.log(item);
    return this.client.post("http://localhost:8080/admin/addItem/" + sessionStorage.getItem('userId'), item, { responseType: 'text' });
  }

  depositItems(itemNo: number, amountToDeposit: number) {
    return this.client.put("http://localhost:8080/admin/depositItems/" + itemNo + "/" + amountToDeposit + "/" + sessionStorage.getItem('userId'), null, { responseType: 'text' });
  }

  deleteItem(itemNo: number) {
    return this.client.delete("http://localhost:8080/admin/deleteItem/" + itemNo + "/" + sessionStorage.getItem('userId'), { responseType: 'text' });
  }

  getAllItems() {
    return this.client.get<Item[]>("http://localhost:8080/admin/getAllItems/" + sessionStorage.getItem('userId'));
  }

  getItemByNo(itemNo: number) {
    return this.client.get<Item>("http://localhost:8080/admin/getItemByNo/" + itemNo + "/" + sessionStorage.getItem('userId'));
  }

  withdrawItems(itemNo: number, amountToWithdraw: number) {
    return this.client.put("http://localhost:8080/admin/withdrawItems/" + itemNo + "/" + amountToWithdraw + "/" + sessionStorage.getItem('userId'), null, { responseType: 'text' });
  }

}
