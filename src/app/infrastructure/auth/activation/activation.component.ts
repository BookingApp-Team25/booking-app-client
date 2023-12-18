import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { MessageResponse } from '../model/message-response';
@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {
  activationCode: string;
  successful:boolean;
  message: string;
  constructor(private route: ActivatedRoute, private service:AuthService){}

  ngOnInit() {
    this.activationCode = this.route.snapshot.params['code'];
    this.service.activate(this.activationCode).subscribe({
      next:(response:MessageResponse) => {
        this.successful=response.successful;
        this.message=response.message;
      }
    })
  }
}
