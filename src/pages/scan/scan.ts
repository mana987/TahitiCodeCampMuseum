import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

// import { HomePage } from '../home/home';

@Component({
    selector: 'page-scan',
    templateUrl: 'scan.html'
})
export class ScanPage {
    result: any = {};
    options: BarcodeScannerOptions;
    url: string ="http://tcc.1click.pf/museum/index.php?mat=JQF1GZHZLK&oeuvre=";

    constructor(public navCtrl: NavController, public navParams: NavParams, public barcodeScanner: BarcodeScanner, private iab: InAppBrowser) {
        
    }

    scan() {
        this.options = {
            prompt: 'SCANNEZ QR CODE',
            showTorchButton: true,
            disableSuccessBeep: true,
        };

        this.barcodeScanner.scan(this.options)
            .then(res => {
                this.result = res;
                console.log('QR code :', this.result.text);
                this.openWebpage(this.result.text);


            })
            .catch(err => {
                console.log('Error result', err);
            });
    }

    ionViewWillEnter() {
        this.scan();
    }

    openWebpage(url: string) {
        const options: InAppBrowserOptions = {
            zoom: 'no',
            footer: 'yes',

        }
        

        const browser = this.iab.create(this.url + url, '_self', options);
    }

}

