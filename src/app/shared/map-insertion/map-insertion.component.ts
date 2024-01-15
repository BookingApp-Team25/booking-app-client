import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import * as L from "leaflet"
import {MapService} from "../mapService";
@Component({
  selector: 'app-map-insertion',
  templateUrl: './map-insertion.component.html',
  styleUrls: ['./map-insertion.component.css']
})
export class MapInsertionComponent {
  private map: any;
  @Input() searchInput: string;
  @Output() location = new EventEmitter<string>();
  constructor(private mapService: MapService) {}

  ngOnChanges(changes: SimpleChanges){
    console.log("searchInput: " +  this.searchInput)
    if(this.searchInput.length > 5){
      this.search(this.searchInput);
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [45.2396, 19.8227],
      zoom: 13,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);
    this.registerOnClick()
  }

  registerOnClick(): void {
    this.map.on('click', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
      this.mapService.reverseSearch(lat, lng).subscribe((res) => {
        console.log(res.address);
        console.log(res.address.country);
        console.log(res.address.city);
        console.log(res.address.house_number);
        console.log(res.address.road);
        let city: string;
        if(res.address.city === undefined){
          console.log("undefined city");
          if(res.address.city_disctrict === undefined){
            console.log("its a village")
            city = res.address.village;
          }
          else{
            city = res.address.city_district;
          }
        }
        else{
          city = res.address.city;
        }
        console.log("city:" + city);
        this.location.emit(res.address.house_number + ";" + res.address.road + ";" + city + ";" + res.address.country);
      });
      console.log(
        'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
      );
      new L.Marker([lat, lng]).addTo(this.map);
    });
  }

  search(input : string): void {
    this.mapService.search(input).subscribe({
      next: (result) => {
        console.log(result);
        L.marker([result[0].lat, result[0].lon])
          .addTo(this.map)
          .bindPopup("Location:")
          .openPopup();
      },
      error: () => {},
    });
  }

  ngAfterViewInit(): void {
    L.Marker.prototype.options.icon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });
    this.initMap();
  }
}
