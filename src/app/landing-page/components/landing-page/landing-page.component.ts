import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  email: string = "me@home.com";
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onContinue(): void{
    this.router.navigateByUrl("facesnaps");
  }

  onSubmitForm(form: NgForm){
    console.log(form.value);
  }
}
