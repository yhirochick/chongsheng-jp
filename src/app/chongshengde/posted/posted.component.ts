import { Chongshengde } from './../../shared/chongshengde';
import { ChongshengdeService } from './../../service/chongshengde.service';
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
    private chongshengdeService: ChongshengdeService,
    private db: AngularFireDatabase
  ) { 
    this.data = db.object('chongshengde').valueChanges();
  }

  ngOnInit() {
    this.getPosts();
  }
  
  getPosts(): void {
    this.data.subscribe(data => {
      console.log(data.posts);
      Object.keys(data.posts).reverse().forEach(key => {
        this.posts.push(data.posts[key]);
      });
    },
    error => console.log(error)
    );
  }


}
