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
    const endpoint = `${config.apiUrl}/resumeParser`;
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    formData.append('currentUser', currentUser.username);
    return this.httpClient.post(endpoint, formData).pipe(
      map(() => {
        return true;
      })
    );
  }
}
