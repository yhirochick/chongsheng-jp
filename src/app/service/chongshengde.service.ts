import { Chongshengde } from './../shared/chongshengde';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, first } from 'rxjs/operators';
import * as moment from 'moment';

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
  private _post: Chongshengde;
  private _description: string;
  private _imageURL: string;
  private _limit: number = 3;
  private user;
  private uid: string;
  private nextStartIndex: string;

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

  get post() {
    return this._post;
  }

  get limit() {
    return this._limit;
  }

  set description(value: string) {
    this._description = value;
  }

  set imageURL(value: string) {
    this._imageURL = value;
  }
  
  set limit(value: number) {
    this._limit = value;
  }

  fetchPosts(): void {
    this._posts$ = this.afs.collection<Chongshengde>('posts', ref => {
      return ref.orderBy("date", "desc").limit(this._limit);
    }).valueChanges({ idField: "id" });
  }

  savePost(): Promise<DocumentReference> {
    this._post = {
      user: this.user.displayName ? this.user.displayName : this.user.email ? this.user.email : "名無し",
      description: this._description,
      imageURL: this._imageURL,
      date: moment().format("YYYY/MM/DD HH:mm:ss"),
      like: []
    }
    return this.afs.collection<Chongshengde>('posts').add(this.post);
  }

  like(id){
    const selectedPost = this.afs.doc<Chongshengde>(`posts/${id}`).valueChanges().pipe(first());
    selectedPost.subscribe(value => {
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
