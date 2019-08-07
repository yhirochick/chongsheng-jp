import { Chongshengde } from './../../shared/chongshengde';
import { Component, OnInit } from '@angular/core';
import { Observable, concat, of } from 'rxjs';
import { post } from 'selenium-webdriver/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { first } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {

  posts: Observable<Chongshengde[]>;
  post: Observable<Chongshengde>;
  data: Observable<any>;
  user: Observable<firebase.User>;
  uid: string;
  private chongshengdeCollection: AngularFirestoreCollection<Chongshengde>;
  private chongshengdeCollectionDesc: AngularFirestoreCollection<Chongshengde>;


  constructor(
    private angularFireAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) { 
    
  }

  

  ngOnInit() {
    
    this.chongshengdeCollection = this.afs.collection<Chongshengde>('posts', ref => {
      return ref.orderBy("date", "asc");
    });
    this.chongshengdeCollectionDesc = this.afs.collection<Chongshengde>('posts', ref => {
      return ref.orderBy("date", "desc");
    });

    const githubUsers = `https://api.github.com/users?per_page=2`;

    const users = ajax(githubUsers);
    concat(
      of(1,2,3),
      this.chongshengdeCollection.valueChanges(),
    ).subscribe(console.log)
  }

  


}
