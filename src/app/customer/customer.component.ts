import { Component, OnInit } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  public actionDetails: any;
  public driverDetails: any;
  public editUserInfo: any;
  public showEdit: boolean = false;
  public showDelete: boolean = false;
  public showAdd: boolean = false;
  public showAssign: boolean = false;
  public deleteMsg: string = 'Are you sure want to delete?';
  public updateMsg: string;
  public delUserId: string = '';
  assignForm = this.fb.group({
    driverId: ['', Validators.required],
    customerId: [''],
  });
  addForm = this.fb.group({
    name: ['', Validators.required],
    mobile: ['', Validators.required],
    area: ['', Validators.required],
    address: ['', Validators.required],
    date: ['', Validators.required],
  });
  httpOptions = {
    headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    })
};
  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit() {
    this.getAllAction().subscribe(
      data => this.actionDetails = data
    );
  }
  assignSubmit(assignForm){

    this.assignForm.patchValue({
      id: '3v1tJelsfqEWvEer0YlR'
    });
    this.http.post('https://us-central1-nncouriers18.cloudfunctions.net/customer/assigntrip', assignForm.value,this.httpOptions).subscribe(
      (async(result: any) => {
        const updateStatus = result.status;
        this.updateMsg = updateStatus.message;
        this.showAssign= false;
      }));
  }
  addSubmit(addForm) {
    this.http.post('https://us-central1-nncouriers18.cloudfunctions.net/customer/assigntrip', addForm.value,this.httpOptions).subscribe(
      (async(result: any) => {
        const updateStatus = result.status;
        this.updateMsg = updateStatus.message;
        this.showAdd= false;
      }));
  }
  editSubmit(editForm) {
    this.http.post('https://us-central1-nncouriers18.cloudfunctions.net/area/updatearea', editForm.value).subscribe(
      (async(result: any) => {
        const updateStatus = result.status;
        this.updateMsg = updateStatus.message;
        this.showEdit= false;
      }));
  }
  deleteModal(user) {
    this.showDelete = true;
    this.delUserId = user.id;
  }
  deleteUser() {
    this.http.put('https://us-central1-nncouriers18.cloudfunctions.net/user/delete/', this.delUserId).subscribe(
      (async(result: any) => {
        const deleteStatus = result.status;
        this.deleteMsg = deleteStatus.message;
        this.showDelete = false;
      }));
  }
  completedCustomer() {
    return this.http.get('https://us-central1-nncouriers18.cloudfunctions.net/customer/completedlist')
      .pipe(
      map((result: any) => {
        this.actionDetails = result.orderList;
      }));
  }
  getAllAction() {
    return this.http.get('https://us-central1-nncouriers18.cloudfunctions.net/customer/pendinglist')
      .pipe(
      map((result: any) => {
        const action = result.orderList;
        return action;
      }));
  }
  getAllUser(customer) {
    this.showAssign=true;
    return this.http.get('https://us-central1-nncouriers18.cloudfunctions.net/user/allusers')
      .subscribe( result=> this.driverDetails = result.userDetails);
   
  }
}
