import { Component, OnInit } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FormBuilder, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  public actionDetails: any;
  httpOptions = {
    headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    })
};
  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit() {
    this.completedCustomer().subscribe(
      data => this.actionDetails = data
    );
  }  
  completedCustomer() {
    return this.http.get('https://us-central1-nncouriers18.cloudfunctions.net/customer/completedlist')
    .pipe(
      map((result: any) => {
        const action = result.orderList;
        return action;
      }));
  }


}
