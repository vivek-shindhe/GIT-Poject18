import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapViewPage } from '../map-view/map-view';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	mainCategories=['Food','Movies & Event','Taxis','Lodges'];
  constructor(public navCtrl: NavController) {
    console.log("new");
  }

  mapViewPage(m:any){
	this.navCtrl.push(MapViewPage,{title:m});
	console.log(m);
  }

}
