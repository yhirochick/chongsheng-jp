import { Chongshengde } from './../../shared/chongshengde';
import { ChongshengdeService } from './../../service/chongshengde.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posted',
  templateUrl: './posted.component.html',
  styleUrls: ['./posted.component.css']
})
export class PostedComponent implements OnInit {

  posts: Chongshengde[];

  constructor(private chongshengdeService: ChongshengdeService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.chongshengdeService.get().subscribe((posts: Chongshengde[]) => {
      this.posts = posts.reverse();
    },
    error => console.log(error)
    );
  }


}
