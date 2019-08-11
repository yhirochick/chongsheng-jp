import { Component, OnInit } from '@angular/core';
import { ChongshengdeService } from 'src/app/service/chongshengde.service';
import { Observable } from 'rxjs';
import { Chongshengde } from 'src/app/shared/chongshengde';
@Component({
  selector: 'app-posted',
  templateUrl: './posted.component.html',
  styleUrls: ['./posted.component.css']
})
export class PostedComponent implements OnInit {

  posts: Observable<Chongshengde[]>;

  constructor(private chongshengdeService: ChongshengdeService) { }
  
  ngOnInit() {
    this.chongshengdeService.fetchPosts();
    this.posts = this.chongshengdeService.posts$;
  }

}
