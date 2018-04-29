import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ProfilePage } from '../profile/profile';
/**
 * Generated class for the MapViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@Component({
  selector: 'page-map-view',
  templateUrl: 'map-view.html',
})
export class MapViewPage {
	//map
	map:any;

	//autocomplete
	GoogleAutoComplete= new google.maps.places.AutocompleteService();
	autocomplete;
	autocompleteItems;
	geocoder=new google.maps.Geocoder;

	//markers
	markers=[];

	//firebase
	subCategories:any;
	categoryMarkers:any;

	//infowindows
	content:any;
	item:any;


	title:any;
  selectedIndex:any;
  constructor(private zone:NgZone, public navCtrl: NavController, public navParams: NavParams, public geolocation:Geolocation, public af:AngularFireDatabase) {
  this.selectedIndex=this.navParams.get('selectedIndex');

  switch(this.selectedIndex){
    case 1:this.title='Food';
           break;
    case 2: this.title='Movies & Event'
          break;
    case 3: this.title='Taxis'
          break;
    case 4: this.title='Lodges'
          break;
    default:this.title=this.navParams.get('title');

  }

	this.subCategories=af.list('/'+this.title+'/subcategories').valueChanges();
  this.subCategories.forEach(category=>{
    console.log(category);
  });

	this.categoryMarkers=af.list('/'+this.title).valueChanges().subscribe(locations =>{
		locations.forEach(location =>{
			this.displayCategoryMarkers(location);
		});
	});
	this.autocomplete={input:''};
	this.autocompleteItems=[];

  }

  viewProfile(location:any){

	  console.log("hello "+location.name);
	  this.navCtrl.push(ProfilePage, {item:location});



  }


  displayCategoryMarkers(location:any){

	  //console.log("clearing Markers");
		console.log("from display categoryMarkers"+location.location.lat);
		this.item=location;
	  this.content='<h3>Name:'+location.name+'</h3><br><h6>'+location.snippet+'</h6><br>';
	  this.content=this.content+'<p id="pleaseWork">View More Details</p>'
	  console.log(this.content);
	  let infowindow=new google.maps.InfoWindow({
		 content:this.content,
     maxWidth:200
	  });
	  let marker = new google.maps.Marker({
			position:{
				lat:location.location.lat,
				lng:location.location.lng
			},
			map:this.map
		});
		marker.addListener('click', function() {
          infowindow.open(this.map, marker);
        });

		google.maps.event.addListenerOnce(infowindow,'domready',()=>{
			document.getElementById('pleaseWork').addEventListener('click',() =>{
				this.viewProfile(location);
			});


		});


  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad MapViewPage');
	this.geolocation.getCurrentPosition().then((resp)=>{
		let pos= {
			lat:resp.coords.latitude,
			lng:resp.coords.longitude
		};
		this.map = new google.maps.Map(document.getElementById('map'),{
		center:pos,
		zoom:15
		});
		let marker = new google.maps.Marker({
			position:pos,
			map:this.map,
			title:'This is You',
			icon:{
        url:"assets/imgs/self_marker.png",
        scaledSize: new google.maps.Size(35,45)
      }
		});
	}).catch((error)=>{
		console.log('Error getting location',error);
	});
  }

  updateSearchResults(){
	if(this.autocomplete.input==""){
		this.autocompleteItems=[];
		return;
	}
	this.GoogleAutoComplete.getPlacePredictions({input:this.autocomplete.input},
		(predictions,status)=>{
			this.autocompleteItems=[];
			this.zone.run(()=>{
				predictions.forEach((prediction)=>{
					this.autocompleteItems.push(prediction);
				});
			});
		});
  }

  selectSearchResult(item){
	this.autocompleteItems=[];

	this.geocoder.geocode({'placeId': item.place_id},(results,status)=>{
		if(status=== 'OK' && results[0]){
			let position={
				lat:results[0].geometry.location.lat,
				lng:results[0].geometry.location.lng
			};
			let marker = new google.maps.Marker({
				position:results[0].geometry.location,
				map:this.map,
			});
			this.markers.push(marker);
			this.map.setCenter(results[0].geometry.location);
		}
	});

  }


  clearMarkers(){
	  for (var i = 1; i < this.markers.length; i++) {
          this.markers[i].setMap(this.map);

        }

	  this.ionViewDidLoad();
  }

  selectCategoryLocations(s:any){
	  this.clearMarkers();

	  setTimeout(()=>{
		  console.log(s);
		  let categoryLocations=this.af.list('/'+this.title+'',ref => ref.orderByChild('subCategory').equalTo(s)).valueChanges().subscribe(locations=>{
		  locations.forEach(location=>{
			 this.displayCategoryMarkers(location);
			});
		});
	  },500);



	}



}
