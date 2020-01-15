import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '@/_models';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private httpClient: HttpClient) {}

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
        const fields = Object.entries(result)
        console.log(fields)
        for(var field in fields){
          console.log(field)
          currentUser[field] = fields[field]
        }
        console.log(result)
        return true
      })
    );
  }
}
