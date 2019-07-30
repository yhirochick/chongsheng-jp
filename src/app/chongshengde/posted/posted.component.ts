import { Chongshengde } from './../../shared/chongshengde';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { Observable } from 'rxjs';
import { post } from 'selenium-webdriver/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

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
   /** 取得したドキュメントを格納 */
  private chongshengdeDocument: AngularFirestoreDocument<Chongshengde>;
  /** 取得したコレクションを格納 */
  private chongshengdeCollection: AngularFirestoreCollection<Chongshengde>;


  constructor(
    private db: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) { 

    this.chongshengdeDocument = afs.doc<Chongshengde>('items/39z9wtr35SAeAUjcWcTh');
    this.chongshengdeCollection = afs.collection<Chongshengde>('posts');
    this.post = this.chongshengdeDocument.valueChanges();
    this.posts = this.chongshengdeCollection.valueChanges();
    // this.data = db.list(
    //   'chongshengde/posts',
    //   ref => ref.orderByChild('date').limitToLast(5)
    // ).valueChanges();
  }

  ngOnInit() {
    this.user = this.angularFireAuth.authState;
    // this.getPosts();
  }
  
  // getPosts(): void {
  //   this.data.subscribe(data => {
  //     console.log(data);
  //     this.posts = data;
  //   },
  //   error => console.log(error)
  //   );
  // }

  like(id){
    const post = this.afs.doc<Chongshengde>(`posts/${id}`).valueChanges();
    post.subscribe(resp => {
      console.log(resp);
    },
    error => console.log(error)
    )
  }


}
