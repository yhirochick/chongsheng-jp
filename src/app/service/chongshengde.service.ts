import { Chongshengde } from './../shared/chongshengde';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChongshengdeService {
  // private API = 'https://us-central1-chongsheng-jp.cloudfunctions.net/v1';
  private API = 'http://localhost:5000/chongsheng-jp/us-central1/v1';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }


  post(desctiption: string, imageURL: string): Observable<string> {
    return this.http.post<string>(`${this.API}/chongshengde/`, {description: desctiption, imageURL: imageURL}, this.httpOptions);
  }

  get(): Observable<Chongshengde[]> {
    return this.http.get<Chongshengde[]>(`${this.API}/chongshengde/`);
  }

}
