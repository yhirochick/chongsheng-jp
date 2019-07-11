import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posted',
  templateUrl: './posted.component.html',
  styleUrls: ['./posted.component.css']
})
export class PostedComponent implements OnInit {

  posts = [
    1,
    2,
    3
  ];

  constructor() { }

  ngOnInit() {
  }


}
