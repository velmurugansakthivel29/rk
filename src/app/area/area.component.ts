import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  public actionDetails: any;
  public editUserInfo: any;
  public showEdit: boolean = false;
  public showDelete: boolean = false;
  public showAdd: boolean = false;
  public deleteMsg: string = 'Are you sure want to delete?';
  public updateMsg: string;
  public delUserId: string = '';
  editForm = this.fb.group({
    pin: ['', Validators.required],
    area: ['', Validators.required],
    id: [''],
  });
  addForm = this.fb.group({
    pin: ['', Validators.required],
    area: ['', Validators.required]
  });
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
    this.http.post('https://us-central1-nncouriers18.cloudfunctions.net/area', addForm.value);
  }
  editSubmit(editForm) {
    this.http.post('https://us-central1-nncouriers18.cloudfunctions.net/area/updatearea', editForm.value);
  }
  deleteModal(user) {
    this.showDelete = true;
    this.delUserId = user.id;
  }
  deleteUser() {
    this.http.put('https://us-central1-nncouriers18.cloudfunctions.net/user/delete/XB374ELfe3C2F1p803IG', this.delUserId).pipe(
      map((result: any) => {
        const deleteStatus = result.status;
        this.deleteMsg = deleteStatus.message;
      }));
  }

  getAllAction() {
    return this.http.get('https://us-central1-nncouriers18.cloudfunctions.net/area/list')
      .pipe(
      map((result: any) => {
        const action = result.areaList;
        return action;
      }));


  }

}
