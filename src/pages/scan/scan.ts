import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { HomePage } from '../home/home';

@Component({
    selector: 'page-scan',
    templateUrl: 'scan.html'
})
export class ScanPage {
    options: BarcodeScannerOptions;
    encodText: string = '';
    scannedData: any = {};
    constructor(public navCtrl: NavController, public barcodeScanner: BarcodeScanner) {
    
    }

    ionViewWillLeave() {
        this.scan();
    }

    scan() {
        this.options = {
            prompt: 'SCANNEZ QR CODE',
            showTorchButton: true
        };

        this.barcodeScanner.scan(this.options).then(barcodeData => {
            // if(barcodeData.cancelled) this.navCtrl.push(HomePage);
            console.log('Barcode data', barcodeData);
        }).catch(err => {
            console.log('Error', err);
        });
    }
}

