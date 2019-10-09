import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(public routes: Router) { }

  ngOnInit() {
  }

  goTo(data){
    this.routes.navigate([data])
  }

}
