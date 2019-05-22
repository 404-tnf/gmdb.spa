import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataProcessingServiceService } from '../data-processing-service.service';
import { IMovies } from '../interfaces/IMovies';
import { ISearch } from '../interfaces/ISearch';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IReview } from '../interfaces/IReview';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit{
  public criteria: string;
  public value: string;
  public movieDetailsData: IMovies;
  private searchCriteria: ISearch;
  public userEmail: string;
  public showBoxes: boolean;
  public screenName: string;
  public reviewForm: FormGroup;
  public openReviews: boolean = false;
  
  constructor(private route: ActivatedRoute, private dps: DataProcessingServiceService, private router: Router, private fb: FormBuilder, private toastr: ToastrService) { 
    this.criteria = this.route.snapshot.queryParamMap.get('criteria');
    this.value =  this.route.snapshot.queryParamMap.get('value')
    this.searchCriteria = {
      criteria: this.criteria,
      text: this.value
    }
  }

  public ngOnInit(): void { 
    this.reviewForm = this.fb.group({
      title: ['', Validators.required],
      reviewText: ['', Validators.required]
    }); 
    this.refreshData();
  }

  public redirectToSign(): void {
    this.dps.urlString.next(this.router.url);
    this.router.navigate(['/signin']);
  }

  public showReviewBoxes(): void {
    this.showBoxes = true;
  }

  public hideReviewBoxes(): void {
    this.showBoxes = false;
    this.clearData();
  }

  public saveReview(): void {
    let reviewObject: IReview = {
      email: this.userEmail,
      reviewText: this.reviewForm.controls["reviewText"].value,
      movieTitle: this.movieDetailsData.title,
      reviewTitle: this.reviewForm.controls["title"].value
    }
    this.dps.postReviews(reviewObject).subscribe(value => {
      if(value) {
        this.toastr.success("Review Added Successfully" , null , {
          positionClass:'toast-top-full-width'
        });
        this.showBoxes = false;
        this.refreshData();
        this.clearData();
      }
    });
  }

  public refreshData(): void {
    this.dps.getMoviesBasedOnSearch(this.searchCriteria).subscribe(val => {
      if(val != null && val.length > 0) {
        this.movieDetailsData = val[0];
        this.dps.userName.subscribe(name => {
          this.screenName = name;
        });
        this.dps.userEmail.subscribe(email => {
          this.userEmail = email;
        }) 
      }
    });
  }

  public clearData(): void {
    this.reviewForm.controls["title"].setValue("");
    this.reviewForm.controls["reviewText"].setValue("");
  }

  public showReviews() {
    this.openReviews = !this.openReviews;
  }
}
