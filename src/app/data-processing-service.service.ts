import { Injectable } from '@angular/core';
import { ISearch } from './interfaces/ISearch';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environments } from './constants/environments';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IMovies } from './interfaces/IMovies';
import { ILogin } from './interfaces/ILogin';
import { IRegister } from './interfaces/IRegister';
import { IReview } from './interfaces/IReview';
import { IPassword } from './interfaces/IPassword';
import { ToastrService } from 'ngx-toastr';
import { Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class DataProcessingServiceService {
  public moviesData: BehaviorSubject<Array<IMovies>> = new BehaviorSubject<Array<IMovies>>(null);
  public userName: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public userEmail: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  

  constructor(private http: HttpClient , private toastr: ToastrService , private router : Router , private spinner: NgxSpinnerService) { }

    public getMoviesBasedOnSearch(searchCriteria: ISearch): BehaviorSubject<Array<IMovies>> {
      this.spinner.show();
      this.http
        .get<any>(environments.baseURL + '/movies', {
          params: {
            criteria: searchCriteria.criteria,
            value: searchCriteria.text
          },observe: 'response'
        })
        .subscribe(response => {
            let movies: Array<IMovies> = [];
            if(response.body.length > 0) {
              response.body.forEach(element => {
                let reviewsVal: Array<IReview> = [];
                if(element.reviews != null && element.reviews.length > 0) {
                  element.reviews.forEach(review => {
                    reviewsVal.push({
                      email: review.email,
                      reviewText: review.reviewText,
                      movieTitle: review.movieTitle,
                      reviewTitle: review.reviewTitle,
                    });
                  });
                }
                movies.push({
                  movieId: element.movieId,
                  metaScore: element.metaScore,
                  boxOffice: element.boxOffice,
                  website: element.website,
                  imdbRating: element.imdbRating,
                  imbdVotes: element.imbdVotes,
                  runTime: element.runTime,
                  language: element.language,
                  rated: element.rated,
                  production: element.production,
                  released: element.released,
                  imdbId: element.imdbId,
                  plot: element.plot,
                  director: element.director,
                  title: element.title,
                  actors: element.actors,
                  response: element.response,
                  type: element.type,
                  awards: element.awards,
                  dvd: element.dvd,
                  year: element.year,
                  poster: element.poster,
                  country: element.country,
                  genre: element.genre,
                  writer: element.writer,
                  reviews: reviewsVal
                });
              });
              setTimeout(() => {
                this.spinner.hide();
                return this.moviesData.next(movies);
            }, 200);
            }
            else {
              setTimeout(() => {
                this.spinner.hide();
                return this.moviesData.next(null);
            }, 200);
            }
          });
        return this.moviesData;
    } 

    public postLoginData(login: ILogin): void {
      this.http.post(environments.baseURL + "/login", {
        email: login.email,
        password: login.password
      },{responseType: 'text'})
      .subscribe((value) => {
        if (value.includes("Successfully")) {
          this.toastr.success(this.parseString(value)[0] , null , {
            positionClass:'toast-top-full-width',
            timeOut: 700 
          });
          this.userName.next(this.parseString(value)[1]);
          this.userEmail.next(this.parseString(value)[2]);
          this.router.navigate(['/']);
        }}, (error) => {
          if(error.error != null) {
            this.toastr.error("Please validate your credentials" , null , {
              positionClass:'toast-top-full-width',
              timeOut: 700 
            });
          }
        }) 
    }

    public postRegisterData(register : IRegister): void {
      this.http.post(environments.baseURL + "/register",{
        firstName : register.firstName,
        lastName : register.lastName,
        email :register.email,
        password: register.password,
        validatePassword: register.validatePassword
      },{responseType: 'text'}).subscribe((value)=> {
        if (value.includes("Created")) {
          this.toastr.success(value , null , {
            positionClass:'toast-top-full-width',
            timeOut: 700 
          });
        }},(error) => {
          if(error.error != null) {
            this.toastr.error("Email already exists" , null , {
              positionClass:'toast-top-full-width',
              timeOut: 700 
            });
          }
      });
    }

    public postForgotPasswordData(forgotPasswordData : IPassword): void {
      this.http.post(environments.baseURL + "/forgotPassword",{
        email: forgotPasswordData.email,
        tempPassword: forgotPasswordData.tempPassword,
        updatedPassword: forgotPasswordData.updatedPassword
      },{responseType: 'text'}).subscribe(
         (val) => {
           if (val.includes("Updated")) {
             this.toastr.success(val , null , {
              positionClass:'toast-top-full-width'
            } );
            this.router.navigate(['/signin']);
           } else {
             this.toastr.error(val , null , {
              positionClass:'toast-top-full-width'
            } );
           }
         }
        );
    }

    public postReviews(review: IReview): BehaviorSubject<boolean> {
      let reviewAdded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
      this.http.post(environments.baseURL + "/review", {
        email: review.email,
        reviewText: review.reviewText,
        movieTitle: review.movieTitle,
        reviewTitle: review.reviewTitle
      },{responseType: 'text'}).subscribe((value)=> {
        if(value.includes("Added")) {
          reviewAdded.next(true);
        }
      });
      return reviewAdded;
    }

    private parseString(successMessage: string): Array<string> {
      return successMessage.split('-');
    }

}