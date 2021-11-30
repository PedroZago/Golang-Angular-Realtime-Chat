import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Pusher from 'pusher-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  username = 'username';
  message = '';
  messages: any = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    Pusher.logToConsole = true;

    const pusher = new Pusher('9e37219c9d19f816d1e5', {
      cluster: 'us2'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: any) => {
      this.messages.push(data);
    });
  }

  change(event: any) {
    this.message = event.target.value
  }

  submit(): void {
    this.http.post('http://localhost:8000/api/messages', {
      username: this.username,
      message: this.message
    }).subscribe(() => this.message = '')
  }
}
