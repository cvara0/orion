import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {



  constructor(public auth: AuthService,@Inject(DOCUMENT) public document: Document) { 
    
    
    
  }

  ngOnInit(): void {
    
  }

  

}
