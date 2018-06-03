import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

//Pages 
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = HomePage;
    tab3Root = AboutPage;

    private result: any;
    options: BarcodeScannerOptions;
    optionsInapp: InAppBrowserOptions;
    url: string = "http://tcc.1click.pf/museum/index.php?mat=JQF1GZHZLK&oeuvre=";
    private db: SQLiteObject;

    // private db: SQLiteObject;

    constructor(public navCtrl: NavController, public navParams: NavParams, public barcodeScanner: BarcodeScanner, private iab: InAppBrowser, private sqlite: SQLite) {

    }

    // Scan bar options

    public scan() {
        this.options = {
            // Message sur android
            prompt: 'SCANNEZ QR CODE',
            // bouton lampe torche ANDROID/IOS
            showTorchButton: true,
            // désactivation du beep
            disableSuccessBeep: true,
        };

        // Open Scan bar

        this.barcodeScanner.scan(this.options)
            .then(res => {
                console.log('QR code :', this.result.text);
                this.result = res;                
                this.updtateChecked();
            })
            .catch(err => {
                console.log('Error result', err);
            });
    }

    // Update checkbox

    public updtateChecked() {
        this.db.executeSql("UPDTATE `oeuvres` SET checked=[ios-checkmark-circle] where oeuvres.qr_code ="+this.result +";", {})
            .then(() => {
                console.log('check good')
                this.openWebpage();
            })
            .catch(() => {
                console.log('check FAIL')
            })
    }

    //Open url

    public openWebpage() {
        this.optionsInapp = {
            zoom: 'no',
            footer: 'yes',
        };
        this.iab.create(this.url + this.result.text, '_system', this.options);
    }

}
