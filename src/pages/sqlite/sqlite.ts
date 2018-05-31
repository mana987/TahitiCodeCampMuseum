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
    Nom: string;
    Prenom: string;
    // Maxworks: number;

    constructor(public navCtrl: NavController, private sqlite: SQLite) {
        this.createDatabaseFile();
    }

      // creation de la database
      
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

          // creation de la table

    private createTables(): void {
        this.db.executeSql('CREATE TABLE IF NOT EXISTS `works_database` ( `id` INTEGER, `lastname` TEXT, `firstname` TEXT, `checked` INTEGER DEFAULT 0, `qr_code` INTEGER, `img` INTEGER, PRIMARY KEY(`id`) )', {})
        .then(() => {
            console.log('table works created');
            this.createEvent();
        })
        
        .catch(e => console.log(e, 'No Tables'));
    }

    
    // creation des données à insérer dans le tableau

    private createEvent(): void {
        this.db.executeSql('INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("ALVAREZ", "Jean-Pierre", 0, "9213750369", "img")'+
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("ARAI", "Poeragni", 0, "6510403686", "img")' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("CHANSIN", "Jerôme", 0, "7216899933", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("CHEUNG-SEN ", "Jonas", 0, "1629568455", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("CUNNY", "Heimana", 0, "9266553664", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("EBB", "Nicolas", 0, "1168085824", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("LEHARTEL", "Alexandre", 0, "2791010818", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("LENOIR", "Tetuaoro", 0, "4173047359", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("LONGINE", "Manaarii ", 0, "9782420312", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("LY", "Joane ", 0, "6872232276", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("MARO", "Teremu ", 0, "1234567890", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("MONACO", "Vaitare", 0, "4653519064", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("PAEAHI", "Ariipaea", 0, "3658034121", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("PAMBRUN", "Aito ", 0, "5175547403", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("PAMBRUN", "Hiomai", 0, "9520532017", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("PEREZ", "Rahiti", 0, "1228597258", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("PERRY", "Matihamu ", 0, "5480211371", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("ROUSSEL", "Christian ", 0, "2462643924", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("TEHUPE", "Tinirau ", 0, "5055364030", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("TEMATAHOTOA", "Tinirau ", 0, "6232447902", "img") ' +
        'INSERT INTO `works_database` (lastname, firstname, checked, qr_code, img)VALUES("TOOFA", "Teparii ", 0, "4235066246", "img");' , {})
        .then(() => console.log('event works created'))
        .catch(e => console.log(e, 'No Event'));
    }


        // lire la donnée

        public retrieveEvent(){
            this.db.executeSql('SELECT * FROM `works_database`', {})
            .then((data) => {
                let event = [];
                console.log('data : ', data);
                console.log(data.rows.item[0]);
                if(data == null) {
                    console.log('data null');
                    return;
                }
                    if(data.rows.length > 0 ) {
                        console.log('data lenght');
                        for(var i = 0; i < data.rows.length; i++){
                            event.push(data.rows.item(i).firstname);
                            console.log('for',event);
                        }
                    }
            });
        }
      
}

 