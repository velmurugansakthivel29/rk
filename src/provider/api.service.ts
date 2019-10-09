import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { Observable } from 'rxjs';
@Injectable()

export class ApiService {
    httpOptions = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) {

    }

    public createDriver(formData): Observable<any> {
        console.log('entered');
        return this.http.post(environment.baseurl + environment.addDriver, formData, this.httpOptions);
    }

    
    // public createSupervisor(formData): Observable<any> {
    //     return this.http.post(environment.baseurl + environment.addSupervisor, formData, this.httpOptions);
    // }

    // public editOperator(formData): Observable<any> {
    //     return this.http.post(environment.baseurl + environment.editOperator, formData, this.httpOptions);
    // }

    
    // public editSupervisor(formData): Observable<any> {
    //     return this.http.post(environment.baseurl + environment.editSupervisor, formData, this.httpOptions);
    // }

    // public getOperatorList(): Observable<any> {
    //     return this.http.get(environment.baseurl + environment.listOperator, this.httpOptions);
    // }

    // public getSupervisorList(): Observable<any> {
    //     return this.http.get(environment.baseurl + environment.listSupervisor, this.httpOptions);
    // }

    // public deleteOperator(id): Observable<any> {
    //     return this.http.get(environment.baseurl + environment.deleteOperator +'/'+ id , this.httpOptions);
    // }

    // public deleteSupervisor(id): Observable<any> {
    //     return this.http.get(environment.baseurl + environment.deleteSupervisor +'/'+ id, this.httpOptions);
    // }

    // public profile(params): Observable<any> {
    //     console.log(params)
    //     return this.http.post(environment.baseurl + environment.registerCustomer, params);
    // }

    // public notifyPreference(params): Observable<any> {
    //     return this.http.post(environment.baseurl + environment.notifyCustomer, params);
    // }

}