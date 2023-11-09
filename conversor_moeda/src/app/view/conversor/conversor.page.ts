import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConversorService } from 'src/app/service/conversor.service';
import { CountriesService } from 'src/app/service/countries.service';

@Component({
    selector: 'app-conversor',
    templateUrl: './conversor.page.html',
    styleUrls: ['./conversor.page.scss'],
})
export class ConversorPage implements OnInit {
    baseCountryCode: string = '';
    targetCountryCode: string = '';
    baseCurrency!: string;
    targetCurrency!: string;
    inputValue: number = 0;
    convertedValue: number = 0;
    currencies!: Array<any>;
    flagUrl!: string;
    constructor(private exchangApi: ConversorService, private countries: CountriesService) { }
    ngOnInit() {
        console.log("teste");
        this.currencies = this.countries.getCountries();
    }
    showBaseCurrencies: boolean = false;
    showTargetCurrencies: boolean = false;
    filteredCurrencies: any[] = [];

    getFlag(code: string) {
        this.countries.getBandeiraPorCodigoISO(code)
            .subscribe((data: any) => {
                this.flagUrl = data.url;
            });
    }



    onSearchChange(type: string) {
        if (type === 'base') {
            this.showBaseCurrencies = true;
            this.showTargetCurrencies = false;
            this.filteredCurrencies = this.filterCurrencies(this.baseCurrency);
        } else if (type === 'target') {
            this.showBaseCurrencies = false;
            this.showTargetCurrencies = true;
            this.filteredCurrencies = this.filterCurrencies(this.targetCurrency);
        }
    }

    filterCurrencies(searchTerm: string) {
        return this.currencies.filter(currency =>
            currency.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    selectCurrency(type: string, currency: any) {
        if (type === 'base') {
            this.baseCurrency = currency.code;
            this.baseCountryCode = currency.code; // Armazena o código do país de origem
            this.showBaseCurrencies = false;
        } else if (type === 'target') {
            this.targetCurrency = currency.code;
            this.targetCountryCode = currency.code; // Armazena o código do país de destino
            this.showTargetCurrencies = false;
        }
    }
    converterMoeda(baseCountryCode: string, targetCountryCode: string, inputValue: number) {
        this.exchangApi.pairConversion(baseCountryCode, targetCountryCode, inputValue)
            .subscribe((convertedValue: number) => {
                console.log(`Valor convertido: ${convertedValue}`);
            }, (error) => {
                console.error('Erro na conversão de moeda:', error);
            });
    }

}
