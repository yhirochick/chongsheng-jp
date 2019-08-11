import { Chongshengde } from './../shared/chongshengde';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChongshengdeService {
  private API = 'https://us-central1-chongsheng-jp.cloudfunctions.net/v1';
  // private API = 'http://localhost:5000/chongsheng-jp/us-central1/v1';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private _chongshengde$: AngularFirestoreCollection<Chongshengde>;
  private _posts$: Observable<Chongshengde[]>;
  private _post$: Observable<Chongshengde>;
  user: Observable<firebase.User>;
  uid: string;
  nextStartIndex: string;

  constructor(
    private http: HttpClient,
    private angularFireAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.user = this.angularFireAuth.authState;
    this.user.subscribe(user => {
      this.uid = user.uid;
    });
  }

  get posts$() {
    return this._posts$;
  }

  get post$() {
    return this._post$;
  }

  fetchPosts(): void {
    this._posts$ = this.afs.collection<Chongshengde>('posts', ref => {
      return ref.orderBy("date", "desc");
    }).valueChanges({ idField: "id" });
  }

  like(id){
    this._post$ = this.afs.doc<Chongshengde>(`posts/${id}`).valueChanges().pipe(first());
    this._post$.subscribe(value => {
      if(value.like.indexOf(this.uid) >= 0) {
        value.like = value.like.filter(user => user != this.uid);
        this.afs.doc<Chongshengde>(`posts/${id}`).update(value);
      } else {
        value.like.push(this.uid);
        this.afs.doc<Chongshengde>(`posts/${id}`).update(value);
      }
    },
    error => console.log(error)
    )
  }

}
