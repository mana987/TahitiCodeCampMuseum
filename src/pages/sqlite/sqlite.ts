import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//Native Components

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

const DATABASE_WORKS: string = 'data.db';

@Component({
    selector: 'sqlite-home',
    templateUrl: 'sqlite.html'
})
export class SQLitePage {

    private db: SQLiteObject;

    constructor(public navCtrl: NavController, private sqlite: SQLite) {
        this.createDatabaseFile();
    }

    private createDatabaseFile(): void {
        this.sqlite.create({
            name: DATABASE_WORKS,
            location: 'default'
        })
            .then((db: SQLiteObject) => {
                console.log('bd créée');
                this.db = db;
                this.createTables();
            })
            .catch(e => console.log(e));
    }

    private createTables(): void {
        this.db.executeSql('CREATE TABLE IF NOT EXISTS `works_database` ( `id` INTEGER, `lastname` TEXT, `firstname` TEXT, `checked` INTEGER DEFAULT 0, `qr_code` INTEGER, `img` INTEGER, PRIMARY KEY(`id`) )', {})
        .then(() => {
            console.log('table works created');
            this.createEvent();
        })
        
        .catch(e => console.log(e, 'No Tables'));
    }

    private createEvent(): void {
        this.db.executeSql('INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("ALVAREZ", "Jean-Pierre", 0, "qrcode", "img");' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("ARAI", "Poeragni", 0, "qrcode", "img");' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("CHANSIN", "Jerôme", 0, "qrcode", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("CHEUNG-SEN ", "Jonas", 0, "qrcode", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("CUNNY", "Heimana", 0, "qrcode", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("EBB", "Nicolas", 0, "qrcode", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("LEHARTEL", "Alexandre", 0, "qrcode", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("LENOIR", "Tetuaoro", 0, "qrcode", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("LONGINE", "Manaarii ", 0, "qrcode", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("LY", "Joane ", 0, "qrcode", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("MONACO", "Vaitare", 0, "qrcode", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("PAEAHI", "Ariipaea", 0, "qrcode", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("PAMBRUN", "Aito ", 0, "qrcode", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("PAMBRUN", "Hiomai", 0, "qrcode", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("PEREZ", "Rahiti", 0, "qrcode", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("PERRY", "Matihamu ", 0, "qrcode", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("ROUSSEL", "Christian ", 0, "qrcode", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("TEHUPE", "Tinirau ", 0, "qrcode", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("TEMATAHOTOA", "Tinirau ", 0, "qrcode", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("TOOFA", "Teparii ", 0, "qrcode", "img");' , {})
        .then(() => console.log('event works created'))
        .catch(e => console.log(e, 'No Event'));
    }



}

