import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { async } from 'q';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {

  public userDetails: any;
  public editUserInfo: any;
  public showEdit: boolean = false;
  public showDelete: boolean = false;
  public showAdd: boolean = false;
  public deleteMsg: string = 'Are you sure want to delete?';
  public updateMsg: string;
  public delUserId: string = '';
  editUserForm = this.fb.group({
    name: ['', Validators.required],
    mobile: ['', Validators.required],
    area: ['', Validators.required],
    address: ['', Validators.required],
    id: [''],
  });
  addUserForm = this.fb.group({
    name: ['', Validators.required],
    mobile: ['', Validators.required],
    area: ['', Validators.required],
    address: ['', Validators.required],
    password: ['', Validators.required],
  });

  httpOptions = {
    headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    })
};

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit() {
    this.getAllUser().subscribe(
      data => this.userDetails = data
    );
  }
  editModal(user) {
    this.showEdit = true;
    this.editUserForm.patchValue({
      name: user.name,
      mobile: user.mobile,
      area: user.area,
      address: user.address,
      id: user.id
    });
  }
  addSubmit(addUserForm) {
    console.log(addUserForm.value);
    this.http.post('https://us-central1-nncouriers18.cloudfunctions.net/user', addUserForm.value, this.httpOptions).subscribe(
      (async(result: any) => {
        const updateStatus = result.status;
        this.updateMsg = updateStatus.message;
        this.showAdd= false;
      }));
  }
  editSubmit(editUserForm) {
    this.http.post('https://us-central1-nncouriers18.cloudfunctions.net/user/updateuserdata/', editUserForm.value).subscribe(
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
    this.http.get('https://us-central1-nncouriers18.cloudfunctions.net/user/delete/'+this.delUserId).subscribe(
      (async(result: any) => {
        const deleteStatus = result.status;
        this.deleteMsg = deleteStatus.message;
        this.showDelete = false;
      }));
  }

  getAllUser() {
    return this.http.get('https://us-central1-nncouriers18.cloudfunctions.net/user/allusers')
      .pipe(
      map((result: any) => {
        const user = result.userDetails;
        return user;
      }));


  }

}
