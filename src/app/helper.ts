import { DataProcessingServiceService } from './data-processing-service.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';

export class Helper {
    constructor(private dps: DataProcessingServiceService) { }
    public hasToRedirect(): boolean {
       return (this.dps.userName !== null) ? true: false;
    }
}
