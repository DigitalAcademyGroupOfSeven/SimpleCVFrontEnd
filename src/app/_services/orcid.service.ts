import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class OrcidService {
    constructor(private http: HttpClient) { }

    getById(id: string) {
        return this.http.get(`${config.apiUrl}/orcid/${id}`, {responseType: 'text'});
    }

}