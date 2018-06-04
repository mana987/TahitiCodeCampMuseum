import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { Platform } from 'ionic-angular';

//Pages 
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';

// Native components

import { BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner';
import { InAppBrowser, InAppBrowserOptions} from '@ionic-native/in-app-browser';
import { SQLiteObject } from '@ionic-native/sqlite';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = HomePage;
    tab3Root = AboutPage;

    private res: any;
    private  url: string = "http://tcc.1click.pf/museum/index.php?mat=JQF1GZHZLK&oeuvre=";
    private db: SQLiteObject;

    options: BarcodeScannerOptions;
    optionsInapp: InAppBrowserOptions;

    constructor(public navCtrl: NavController,public navParams: NavParams, public barcodeScanner: BarcodeScanner, private iab: InAppBrowser, platform: Platform) {
        
    }

    // Scan bar options

    public scan():any {

        this.options = {
            // Android message
            prompt: 'SCANNEZ VOTRE QR CODE',
            // torch button ANDROID/IOS
            showTorchButton: true,
            // disable beep
            disableSuccessBeep: true,
        };

        // Open Scan bar

        this.barcodeScanner.scan(this.options)
            .then(resultData => {
                this.res = resultData.text; 
                console.log('QR code :', resultData.text);              
                this.updateChecked();
            })
            .catch(err => {
                console.log('Error result', err);
            });
    }

    // Update checkbox

    public updateChecked(): any {
        this.db.executeSql("UPDATE `oeuvres` SET checked ='checkmark-circle' WHERE qr_code ="+this.res+";", {})
            .then(() => {
                console.log('check good update')
                this.openWebpage();
            })
            .catch(() => {
                console.log('check FAIL update')
            })
    }

    //Open url

    public openWebpage(): void {
        this.optionsInapp = {
            zoom: 'no',
            footer: 'yes',
        };
        this.iab.create(this.url + this.res, '_blank', this.options);
    }

}
