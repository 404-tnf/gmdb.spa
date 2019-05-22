import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DataProcessingServiceService } from './data-processing-service.service';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'signin',  component: SigninComponent },
  { path:'signup', component: SignupComponent },
  { path: 'movielist', component: MovieListComponent},
  { path: 'movie', component: MovieDetailsComponent},
  { path: 'forgotPassword', component: ForgotPasswordComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

