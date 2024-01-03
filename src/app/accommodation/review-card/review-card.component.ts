import { Component, Input, OnInit } from '@angular/core';
import { ReviewResponse } from '../model/review-response';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent implements OnInit {
  @Input() review:ReviewResponse;
  role='';
  constructor(private authService:AuthService){}

  ngOnInit(){
    this.role=this.authService.getRole();
  }
}
