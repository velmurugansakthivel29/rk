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
  public editUserInfo: any;
  public showEdit: boolean = false;
  public showDelete: boolean = false;
  public showAdd: boolean = false;
  public deleteMsg: string = 'Are you sure want to delete?';
  public updateMsg: string;
  public delUserId: string = '';
  editForm = this.fb.group({
    name: ['', Validators.required],
    mobile: ['', Validators.required],
    area: ['', Validators.required],
    address: ['', Validators.required],
    date: ['', Validators.required],
    id: [''],
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
  editModal(area) {
    this.showEdit = true;
    this.editForm.patchValue({
      pin: area.pin,
      area: area.area,
      id: area.id
    });
  }
  addSubmit(addForm) {
    this.http.post('https://us-central1-nncouriers18.cloudfunctions.net/customer', addForm.value,this.httpOptions).subscribe(
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
    return this.http.get('https://us-central1-nncouriers18.cloudfunctions.net/customer/orderlist')
      .pipe(
      map((result: any) => {
        const action = result.orderList;
        return action;
      }));


  }
}
