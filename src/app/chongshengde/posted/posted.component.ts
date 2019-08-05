import { Chongshengde } from './../../shared/chongshengde';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { post } from 'selenium-webdriver/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-posted',
  templateUrl: './posted.component.html',
  styleUrls: ['./posted.component.css']
})
export class PostedComponent implements OnInit {

  posts: Observable<Chongshengde[]>;
  post: Observable<Chongshengde>;
  data: Observable<any>;
  user: Observable<firebase.User>;
  uid: string;
  nextStartIndex: string;
  private chongshengdeCollection: AngularFirestoreCollection<Chongshengde>;


  constructor(
    private angularFireAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) { 
    
  }

  

  ngOnInit() {
    this.user = this.angularFireAuth.authState;
    this.user.subscribe(user => {
      this.uid = user.uid;
    });
    this.afs.collection<Chongshengde>('posts', ref => {
      return ref.orderBy("date", "desc").limit(1);
    }).valueChanges().subscribe(f => {
      this.nextStartIndex = f[0].date;
      this.feedPosted(this.nextStartIndex,3);
    });
  }
  feedPosted(startIndex, limit) {

   
    this.chongshengdeCollection = this.afs.collection<Chongshengde>('posts', ref => {
      return ref.orderBy("date", "desc").startAt(startIndex).limit(limit);
    });


    this.posts = this.chongshengdeCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Chongshengde;
          data.id = a.payload.doc.id;
          this.nextStartIndex = a.payload.doc.data().date;
          return data;
        });
      }
    ));

    

  }
  
  like(id){
    const post = this.afs.doc<Chongshengde>(`posts/${id}`);
    const postSnapshot = post.snapshotChanges().pipe(first());
    postSnapshot.subscribe(resp => {
      let value = resp.payload.data();
      if(value.like.indexOf(this.uid) >= 0) {
        value.like = value.like.filter(user => user != this.uid);
        post.update(value);
      } else {
        value.like.push(this.uid);
        post.update(value);
      }
    },
    error => console.log(error)
    )
  }

  next() {
    this.feedPosted(this.nextStartIndex, 3);
  }


}
