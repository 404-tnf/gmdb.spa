import { Component, OnInit } from '@angular/core';
import { DataProcessingServiceService } from '../data-processing-service.service';
import { IMovies } from '../interfaces/IMovies';
import { Router, ActivatedRoute } from '@angular/router';
import { ISearch } from '../interfaces/ISearch';

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  public moviesData: Array<IMovies> = [];
  public criteria: string;
  public value: string;
  public hasData: boolean = false;
  private searchCriteria: ISearch;

  constructor(private router: Router, private dps: DataProcessingServiceService, private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.criteria = this.route.snapshot.queryParamMap.get('criteria');
    this.value =  this.route.snapshot.queryParamMap.get('value')
    this.searchCriteria = {
      criteria: this.criteria,
      text: this.value
    }
    this.dps.getMoviesBasedOnSearch(this.searchCriteria).subscribe(val => {
      if(val != null && val.length > 0) {
        this.hasData = true;
        this.moviesData = val;
      } else {
        this.hasData = false;
      }
    });
  }

  public redirectToPage(title: string) {
    this.router.navigate(['/movie'], { queryParams: { criteria: this.criteria, value: title} });
  }
}
