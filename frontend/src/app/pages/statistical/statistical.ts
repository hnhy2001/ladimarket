import { Component, OnInit } from '@angular/core';
import { NgChartsModule } from 'ng2-charts/public_api';

@Component({
    selector: 'statistical',
    templateUrl: './statistical.component.html',
    // styleUrls: ['./bill.component.scss']
})

export class StatisticalComponent implements OnInit{
    ngOnInit(){
    }
    chartoptions = {
        reponesive: true
    }

}
