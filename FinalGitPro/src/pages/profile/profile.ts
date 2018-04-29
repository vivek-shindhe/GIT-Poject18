import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
	location:any;
	tabs=['Overview','Reviews','Photos'];
	overviewShow:boolean=false;
	reviewShow:boolean=true;
	photoShow:boolean=true;
	features:any=[];

	reviews=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {

	  this.location=this.navParams.get('item');
    console.log(this.location.reviews);
    this.location.reviews.forEach(review=>{
      console.log(review);
      this.reviews.push(review);
    });
    console.log(this.reviews);







  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  optionSelected(tab:any){
	  if(tab=="Overview"){
		this.overviewShow=false;
		this.reviewShow=true;
		this.photoShow=true;
		console.log(tab);
	  }
	  else if(tab=="Reviews"){
		this.overviewShow=true;
		this.reviewShow=false;
		this.photoShow=true;
		console.log(tab);
	  }
	  else if(tab=="Photos"){
		this.overviewShow=true;
		this.reviewShow=true;
		this.photoShow=false;

		console.log(tab);
	  }

  }

}
