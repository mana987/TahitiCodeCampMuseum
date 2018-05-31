import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'start-home',
  templateUrl: 'start.html'
})
export class StartPage {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    this.navCtrl.push(HomePage),{

    }
    console.log("I'm alive!");
  }
}