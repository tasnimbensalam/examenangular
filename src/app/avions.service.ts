import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Avions } from './avion';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AvionsService 

{
  private apiUrl = 'http://localhost:3000/avions';

  constructor(private http: HttpClient) {}

  public getAvions(): Observable<Avions[]> {
    return this.http.get<Avions[]>(this.apiUrl);
  }

public addAvion(avion: Avions): Observable<Avions> {
  return this.http.post<Avions>(this.apiUrl, avion);
}

public updateAvion(avion: Avions): Observable<Avions> {
  const url = `${this.apiUrl}/${avion.id}`; 
  return this.http.put<Avions>(url, avion);
}
public deleteAvion(id: number): Observable<Avions> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.delete<Avions>(url);
}


}