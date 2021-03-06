import { Chongshengde } from './../../shared/chongshengde';
import { ChongshengdeService } from './../../service/chongshengde.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable} from 'rxjs';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import * as moment from 'moment';

library.add(fas);


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  public description: string;
  public imageURL: string;
  uploadPercent: Observable<number>;
  uploadProgress: Observable<number>
  downloadURL: Observable<string>;
  filename; string;
  posts: Observable<Chongshengde[]>;
  

  spinner = this.overlay.create({
    hasBackdrop: true,
    positionStrategy: this.overlay
      .position().global().centerHorizontally().centerVertically()
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private overlay: Overlay,
    private storage: AngularFireStorage,
    private chongshengdeService: ChongshengdeService
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      description: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]
      ],
      imageURL: [
        null,
        [
          Validators.required,
        ]
      ]
    });
  }




  onSubmit() {
    if (this.description && this.downloadURL) {
      this.spinner.attach(new ComponentPortal(MatSpinner));
      this.chongshengdeService.description = this.description;
      this.chongshengdeService.imageURL = this.imageURL;
      this.chongshengdeService.savePost().then(res => {
        this.spinner.detach();
        this.router.navigate(['/posts']);
      },
      error => console.log(error)
      );
    }
  }

  uploadFile(event) {
    const file = event.target.files[0];
    this.filename = file.name;
    const filePath = moment().format('x');
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);


    // observe percentage changes
    this.uploadProgress = task.percentageChanges()
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = ref.getDownloadURL();
          ref.getDownloadURL().subscribe(url => {
            this.imageURL = url;
          })
        })
     )
    .subscribe()
  }

}
