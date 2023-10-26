import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FilmeService, SearchTypes } from 'src/app/model/services/filme.service';

@Component({
    selector: 'app-filmes',
    templateUrl: './filmes.page.html',
    styleUrls: ['./filmes.page.scss'],
})
export class FilmesPage implements OnInit {
    result!: Observable<any>;
    searchTerms: string = '';
    type: SearchTypes = SearchTypes.all;
    constructor(private omdbApi: FilmeService) { }

    search() {
        this.result = this.omdbApi
            .getAll(this.searchTerms, this.type)
            .pipe(map(results => { results['Search'] }))
    }

    ngOnInit() {

    }

}
