import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-image-window',
  templateUrl: './image-window.component.html',
  styleUrls: ['./image-window.component.css']
})
export class ImageWindowComponent {
  @Input() image : any;
}
