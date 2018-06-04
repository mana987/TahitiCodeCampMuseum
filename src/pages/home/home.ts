import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Platform } from 'ionic-angular';


// component native

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


const DATABASE_WORKS: string = 'data.db';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'

})
export class HomePage {

  public total;
  private db: SQLiteObject;
  public count: any;

  tabBarElement: any;
  splash = true;
  event: string[] = [];


  constructor(public navCtrl: NavController, private sqlite: SQLite, public navParams: NavParams, platform:Platform) {
    this.tabBarElement = document.querySelector('.tabbar');
    this.createDatabaseFile();
  }

  // Démarrage de la page d'accueille

  ionViewDidLoad() {
    this.tabBarElement.style.display = 'none';
    setTimeout(() => {
      this.splash = false;
      this.tabBarElement.style.display = 'flex';
    }, 4000);
  }


  // Creation de la database

  public createDatabaseFile(): void {
    this.sqlite.create({
      name: DATABASE_WORKS,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        console.log('bd créée');
        this.db = db;
        // this.dropTable();
        this.createTables();
      })
      .catch(e => console.log(e));
  }

  // DELETE TABLE

  //    private dropTable(): void {
  //   this.db.executeSql('DROP TABLE `oeuvres`', {})
  //     .then(() => {
  //       console.log('DELETE TABLE !');
  //     })
  //     .catch(e => console.log(e));
  // } 

  // Creation de la table

  public createTables(): void {
    this.db.executeSql('CREATE TABLE IF NOT EXISTS `oeuvres` ( `id` INTEGER, `lastname` TEXT, `firstname` TEXT, `checked` TEXT, `qr_code` INTEGER, `img` INTEGER, PRIMARY KEY(`id`) )', {})
      .then(() => {
        console.log('table works created');
        this.db.executeSql('SELECT * FROM `oeuvres`', {})
          .then((data) => {
            if (data.rows.length == 21) {
            } else {
              this.createEvent();
            }
            this.retrieveEvent();
          })
      })
      .catch(e => console.log(e, 'No Tables'));
  }


  // Creation des données à insérer dans le tableau

  public createEvent(): void {
    this.db.executeSql("INSERT INTO `oeuvres` VALUES (1,'ALVAREZ', 'Jean-Pierre', 'radio-button-off' , '9213750369', 'img')," +
      "(2,'ARAI', 'Poeragni', 'radio-button-off' , '6510403686', 'img')," +
      "(3,'CHANSIN', 'Jerôme', 'radio-button-off' , '7216899933', 'img')," +
      "(4,'CHEUNG-SEN ', 'Jonas', 'radio-button-off' , '1629568455', 'img')," +
      "(5,'CUNNY', 'Heimana', 'radio-button-off' , '9266553664', 'img'), " +
      "(6,'EBB', 'Nicolas', 'radio-button-off' , '1168085824', 'img'), " +
      "(7,'LEHARTEL', 'Alexandre', 'radio-button-off' , '2791010818', 'img'), " +
      "(8,'LENOIR', 'Tetuaoro', 'radio-button-off' , '4173047359', 'img'), " +
      "(9,'LONGINE', 'Manaarii ', 'radio-button-off' , '9782420312', 'img'), " +
      "(10,'LY', 'Joane ', 'radio-button-off' , '6872232276', 'img'), " +
      "(11,'MARO', 'Teremu ', 'radio-button-off' , '1234567890', 'img'), " +
      "(12,'MONACO', 'Vaitare', 'radio-button-off' , '4653519064', 'img'), " +
      "(13,'PAEAHI', 'Ariipaea', 'radio-button-off' , '3658034121', 'img'), " +
      "(14,'PAMBRUN', 'Aito ', 'radio-button-off' , '5175547403', 'img'), " +
      "(15,'PAMBRUN', 'Hiomai', 'radio-button-off' , '9520532017', 'img'), " +
      "(16,'PEREZ', 'Rahiti', 'radio-button-off' , '1228597258', 'img'), " +
      "(17,'PERRY', 'Matihamu ', 'radio-button-off' , '5480211371', 'img'), " +
      "(18,'ROUSSEL', 'Christian ', 'radio-button-off' , '2462643924', 'img'), " +
      "(19,'TEHUPE', 'Tinirau ', 'radio-button-off' , '5055364030', 'img'), " +
      "(20,'TEMATAHOTOA', 'Tinirau ', 'radio-button-off' , '6232447902', 'img'), " +
      "(21,'TOOFA', 'Teparii ', 'radio-button-off' , '4235066246', 'img');'", {})
  }

  // Affiche la donnée

  public retrieveEvent() {
    this.db.executeSql('SELECT * FROM `oeuvres`', {})
      .then((data) => {
        console.log('data : ', data);
        console.log(data.rows.item[0]);
        // if (data == null) {
        //   console.log('data null');
        //   return;
        // }
        // if (data.rows.length > 0) {
        //   console.log('data length');
          for (var i = 0; i < data.rows.length; i++) {
            this.event.push(data.rows.item(i));
            this.total = data.rows.length;
            console.log('for', data.rows.item(i));
          // }
        }
      });
    this.countChecked();
  }


  // Rechercher tout les checks dans la table

  public countChecked(): any {
    this.db.executeSql("SELECT COUNT(checked) AS seenChecked FROM oeuvres WHERE checked='checkmark-circle'", {})
      .then((data) => {
        this.count = data.rows.item(0).seenChecked;
        console.log('count check done', data.rows.item(0).seenChecked)
      })
      .catch(() => {
        console.log('count check fail')
      })
  }

}

