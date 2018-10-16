import { Component, OnInit } from '@angular/core';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import * as jsonConfig from 'src/assets/json/nav-bar-h-data.json';


interface ConfigData {
  bar_icon: string;
  menu_entries: Array<{
    title: string,
    route: string,
    exact_route: boolean
  }>;
}

@Component({
  selector: 'app-nav-bar-h',
  templateUrl: './nav-bar-h.component.html',
  styleUrls: ['./nav-bar-h.component.css', '../app.component.css']
})
export class NavBarHComponent implements OnInit {

  navBarConfig: ConfigData;
  constructor() { }

  ngOnInit() {
    this.navBarConfig = (<ConfigData>(jsonConfig as any));
  }

}
