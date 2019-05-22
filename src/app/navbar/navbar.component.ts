import { Component, OnInit } from '@angular/core';
import { DataProcessingServiceService } from '../data-processing-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public navbarCollapsed: boolean;
  public myAccount: boolean;
  public userName: string;

  constructor(private dps: DataProcessingServiceService , private toastrService:ToastrService) { }

  public ngOnInit(): void {
    this.dps.userName.subscribe(val => this.userName = val);
  }

  public logout(): void {
    this.dps.urlString.next("");
    this.dps.userName.next(null);
    this.toastrService.success("Logged out" , null , {
      positionClass:'toast-top-full-width'
    } );
  }
}
