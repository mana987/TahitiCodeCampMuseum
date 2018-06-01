import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { AlertController } from 'ionic-angular';

//pages 

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab3Root = AboutPage;

  result: any = {};
  options: BarcodeScannerOptions;
  url: string ="http://tcc.1click.pf/museum/index.php?mat=JQF1GZHZLK&oeuvre=";

  constructor(public navCtrl: NavController, public navParams: NavParams, public barcodeScanner: BarcodeScanner, private iab: InAppBrowser, private alertCtrl: AlertController) {
        
  }

// Scan bar

presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Erreur QrCode',
    subTitle: 'Please Scan another QrCode ',
    buttons: ['Dismiss']
  });
  alert.present();
}
  scan() {
      this.options = {
          // Message sur android
          prompt: 'SCANNEZ QR CODE',
          // bouton lampe torche ANDROID/IOS
          showTorchButton: true,
          // désactivation du beep
          disableSuccessBeep: true,
      };

      this.barcodeScanner.scan(this.options)
          .then(res => {
              this.result = res;
              console.log('QR code :', this.result.text);
              this.openWebpage(this.result.text);
              // if(this.result.text == 6510403686{})


          })
          .catch(err => {
              console.log('Error result', err);
          });
  }


  // Ouverture de l'url

  openWebpage(url: string) {
      const options: InAppBrowserOptions = {
          zoom: 'no',
          footer: 'yes',

      }
      

      const browser = this.iab.create(this.url + url, '_blank', options);
  }

}
