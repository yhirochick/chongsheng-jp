import { Chongshengde } from './../../shared/chongshengde';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posted',
  templateUrl: './posted.component.html',
  styleUrls: ['./posted.component.css']
})
export class PostedComponent implements OnInit {

  posts: Chongshengde[] = [];
  data: Observable<any>;

  constructor(
    private db: AngularFireDatabase
  ) { 
    this.data = db.list(
      'chongshengde/posts',
      ref => ref.orderByChild('date').limitToFirst(5)
    ).valueChanges();
  }

  ngOnInit() {
    this.getPosts();
  }
  
  getPosts(): void {
    this.data.subscribe(data => {
      console.log(data);
      this.posts = data;
    },
    error => console.log(error)
    );
  }


}
