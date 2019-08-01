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
   /** 取得したドキュメントを格納 */
  // private chongshengdeDocument: AngularFirestoreDocument<Chongshengde>;
  /** 取得したコレクションを格納 */
  private chongshengdeCollection: AngularFirestoreCollection<Chongshengde>;


  constructor(
    private angularFireAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) { 

    this.chongshengdeCollection = afs.collection<Chongshengde>('posts', ref => ref.orderBy("date", "desc"));
    // https://github.com/angular/angularfire2/issues/1209#issuecomment-390507471
    this.posts = this.chongshengdeCollection.snapshotChanges().pipe(
      map(
        changes => { return changes.map(a => {
        const data = a.payload.doc.data() as Chongshengde;
        data.id = a.payload.doc.id;
        return data;
      });
      }
    ));
    // this.post = this.chongshengdeDocument.valueChanges();
    // this.posts = this.chongshengdeCollection.snapshotChanges();
    // this.data = db.list(
    //   'chongshengde/posts',
    //   ref => ref.orderByChild('date').limitToLast(5)
    // ).valueChanges();
  }

  ngOnInit() {
    this.user = this.angularFireAuth.authState;
    this.user.subscribe(user => {
      this.uid = user.uid;
    });
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


}
