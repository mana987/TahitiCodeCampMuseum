import { Component } from '@angular/core';

//pages 

import { ScanPage } from '../scan/scan';
import { HomePage } from '../home/home';
// import { AboutPage } from '../about/about';
import { SQLitePage } from '../sqlite/sqlite';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ScanPage;
  tab3Root = SQLitePage;

  constructor() {

  }
}
