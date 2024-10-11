import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Chart from 'chart.js';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    status: boolean = true;


    callCompleted = 0;
    chatCompleted = 0;
    avg_rating = 0;
    today_revenue = 0
    total_revenue = 0

    public canvas: any;
    public ctx;
    public chartColor;
    public chartEmail;
    public chartHours;
    chefContent: boolean = false;
    adminContent: boolean = false;
    revenue = 0;
    profile_rating = '';
    total_orders = 0;
    foodItemsCount = '0';
    adminTotalOrders = 0;
    adminTotalRevenue = 0;
    adminMonthRevenue = 0;
    adminTotalChefs = 0;


    public datasets: any;
    public data: any;
    public salesChart;
    public clicked: boolean = true;
    public clicked1: boolean = false;

    constructor(
        private router: Router
    ) { }

    ngOnInit() {

        this.datasets = [
            [0, 20, 10, 30, 15, 40, 20, 60, 60],
            [0, 20, 5, 25, 10, 30, 15, 40, 40]
        ];
        this.data = this.datasets[0];


        var chartOrders = document.getElementById('chart-orders');

    }

    ngAfterViewInit() {

    }


    public updateOptions() {
        this.salesChart.data.datasets[0].data = this.data;
        this.salesChart.update();
    }

}
