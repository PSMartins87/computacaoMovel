import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmeService } from 'src/app/model/services/filme.service';

@Component({
    selector: 'app-detalhes',
    templateUrl: './detalhes.page.html',
    styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
    info: any;
    constructor(private actRoute: ActivatedRoute, private omdapi: FilmeService) { }

    ngOnInit() {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.omdapi.getById(id).subscribe(result => { this.info = result; });
    }
    openUrl() {
        window.open(this.info.Website, '_blank');
    }

}
