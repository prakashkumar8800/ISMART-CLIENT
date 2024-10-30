import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [

  { path: '/audit', title: 'AUDIT',  icon:'ni-bullet-list-67 text-granite-gray', class: '' },
    { path: '/assign', title: 'ASSIGN',  icon:'ni-bullet-list-67 text-granite-gray', class: '' },
    { path: '/check-list', title: 'CHECK LIST',  icon:'ni-bullet-list-67 text-granite-gray', class: '' },
    // { path: '/report', title: 'REPORT',  icon:'ni-bullet-list-67 text-granite-gray', class: '' },
    { path: '/user-role', title: 'USER ROLE',  icon:'ni-bullet-list-67 text-granite-gray', class: '' },
    { path: '/user', title: 'USER',  icon:'ni-bullet-list-67 text-granite-gray', class: '' },
    { path:'/restaurant' , title:"RESTAURANT" ,icon:'ni-bullet-list-67 text-granite-gray',class:'' }
    
];

const Auditor: RouteInfo[] = [
  { path: '/audit', title: 'AUDIT',  icon:'ni-bullet-list-67 text-granite-gray', class: '' },
]

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
