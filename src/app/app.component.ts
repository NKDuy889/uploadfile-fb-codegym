import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import {Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "cloudStorage";
  selectedFile: File = null as any;
  fb: any;
  downLoadURL: Observable<string> | undefined;
  constructor(private storage: AngularFireStorage) { }

  selectFile(event:any) {
    var n = Date.now;
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downLoadURL = fileRef.getDownloadURL();
          this.downLoadURL.subscribe(url => {
            if (url){
              this.fb = url;
            }
            console.log(this.fb);
          })
        })
      )
  }
}
