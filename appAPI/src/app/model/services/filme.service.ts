import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export enum SearchTypes {
    all = '',
    movie = 'movie',
    serie = 'serie',
    episode = 'episode',
    game = 'game'
}
@Injectable({
    providedIn: 'root'
})

export class FilmeService {
    url = 'https://www.omdbapi.com/';
    apiKey = 'c5d7a1f2';
    constructor(private http: HttpClient) { }
    getAll(title: string, type: SearchTypes): Observable<any> {
        console.log(title);
        console.log(type);
        console.log(this.apiKey);
        return this.http.get(`${this.url}?s=${encodeURI(title)}&type=${type}&apikey=${this.apiKey}`)
    }

    getById(id: any): Observable<any> {
        return this.http.get(`${this.url}?i=${id} &plot=full&apikey=${this.apiKey}`)
    }
}
