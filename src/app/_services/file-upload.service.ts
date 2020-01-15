import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '@/_models';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private httpClient: HttpClient, private userService: UserService) {}

  postFile(fileToUpload: File, currentUser: User): Observable<boolean> {
    if(!fileToUpload) {
      return of(false)
    }
    const endpoint = `http://127.0.0.1:5000/process`;
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    formData.append('currentUser', currentUser.username);
    return this.httpClient.post(endpoint, formData).pipe(
      map(result => {
        for(var field in result){
          currentUser[field] = result[field]
        }
        return true
      })
    );
  }
}
