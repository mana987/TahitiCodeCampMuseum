import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

const DATABASE_WORKS: string = 'data.db';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'

})
export class HomePage {

  public total;
  private db: SQLiteObject;
  tabBarElement: any;
  splash = true;
  event: string[] = [];

  constructor(public navCtrl: NavController, private sqlite: SQLite) {
    this.tabBarElement = document.querySelector('.tabbar');
    this.createDatabaseFile();
  }

  // Démarrage de la page

  ionViewDidLoad() {
    this.tabBarElement.style.display = 'none';
    setTimeout(() => {
      this.splash = false;
      this.tabBarElement.style.display = 'flex';
    }, 4000);
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
    this.db.executeSql('CREATE TABLE IF NOT EXISTS `oeuvres` ( `id` INTEGER, `lastname` TEXT, `firstname` TEXT, `checked` TEXT, `qr_code` INTEGER, `img` INTEGER, PRIMARY KEY(`id`) )', {})
      .then(() => {
        console.log('table works created');
        this.db.executeSql('SELECT * FROM `oeuvres`', {})
          .then((table) => {
            if (table.rows.length == 21) {

            } else {
            this.createEvent();
            }
            this.retrieveEvent();
          })
      })
      .catch(e => console.log(e, 'No Tables'));
  }


  // creation des données à insérer dans le tableau

  private createEvent(): void {
    this.db.executeSql("INSERT INTO `oeuvres` VALUES (1,'ALVAREZ', 'Jean-Pierre','ios-radio-button-off', '9213750369', 'img')," +
      "(2,'ARAI', 'Poeragni','ios-radio-button-off', '6510403686', 'img')," +
      "(3,'CHANSIN', 'Jerôme','ios-radio-button-off', '7216899933', 'img')," +
      "(4,'CHEUNG-SEN ', 'Jonas','ios-radio-button-off', '1629568455', 'img')," +
      "(5,'CUNNY', 'Heimana','ios-radio-button-off', '9266553664', 'img'), " +
      "(6,'EBB', 'Nicolas','ios-radio-button-off', '1168085824', 'img'), " +
      "(7,'LEHARTEL', 'Alexandre','ios-radio-button-off', '2791010818', 'img'), " +
      "(8,'LENOIR', 'Tetuaoro','ios-radio-button-off', '4173047359', 'img'), " +
      "(9,'LONGINE', 'Manaarii ','ios-radio-button-off', '9782420312', 'img'), " +
      "(10,'LY', 'Joane ','ios-radio-button-off', '6872232276', 'img'), " +
      "(11,'MARO', 'Teremu ','ios-radio-button-off', '1234567890', 'img'), " +
      "(12,'MONACO', 'Vaitare','ios-radio-button-off', '4653519064', 'img'), " +
      "(13,'PAEAHI', 'Ariipaea','ios-radio-button-off', '3658034121', 'img'), " +
      "(14,'PAMBRUN', 'Aito ','ios-radio-button-off', '5175547403', 'img'), " +
      "(15,'PAMBRUN', 'Hiomai','ios-radio-button-off', '9520532017', 'img'), " +
      "(16,'PEREZ', 'Rahiti','ios-radio-button-off', '1228597258', 'img'), " +
      "(17,'PERRY', 'Matihamu ','ios-radio-button-off', '5480211371', 'img'), " +
      "(18,'ROUSSEL', 'Christian ','ios-radio-button-off', '2462643924', 'img'), " +
      "(19,'TEHUPE', 'Tinirau ','ios-radio-button-off', '5055364030', 'img'), " +
      "(20,'TEMATAHOTOA', 'Tinirau ','ios-radio-button-off', '6232447902', 'img'), " +
      "(21,'TOOFA', 'Teparii ','ios-radio-button-off', '4235066246', 'img');'", {})
  }

  // Affiche la donnée

  public retrieveEvent() {
    this.db.executeSql('SELECT * FROM `oeuvres`', {})
      .then((data) => {
        console.log('data : ', data);
        console.log(data.rows.item[0]);
        if (data == null) {
          console.log('data null');
          return;
        }
        if (data.rows.length > 0) {
          console.log('data length');
          for (var i = 0; i < data.rows.length; i++) {
            this.event.push(data.rows.item(i));
            this.total = data.rows.length;
            console.log('for', data.rows.item(i)); 
          }
        }
      });
    this.countChecked();
  }

  // Rechercher tout les checks dans la table

  private countChecked(): any {
    this.db.executeSql("SELECT COUNT(checked) FROM oeuvres WHERE oeuvres.checked = [ios-checkmark-circle]", {})
      .then((data) => {
        console.log('count check done')
      })
      .catch(() => {
        console.log('count check fail')
      })
  }

}

