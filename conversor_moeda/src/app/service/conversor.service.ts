import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ConversorService {

    private convertedValue: number = 0;
    private time_last_update_utc!: Date;
    private base_code!: string;
    private target_code!: string;
    private conversion_rate!: number[];

    url = 'https://v6.exchangerate-api.com/v6/';
    apiKey = 'cdfe58154698096f55d84b26';
    constructor(private http: HttpClient) { }
    convertForAll(moedaBase: string): Observable<any> {
        // https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/USD
        return this.http.get(`${this.url}${this.apiKey}/latest/${moedaBase}`)
    }


    pairConversion(baseCountryCode: string, targetCountryCode: string, inputValue: number): Observable<number> {
        if (baseCountryCode && targetCountryCode) {
            const apiUrl = `https://v6.exchangerate-api.com/v6/${this.apiKey}/pair/${baseCountryCode}/${targetCountryCode}`;

            return this.http.get(apiUrl)
                .pipe(map((data: any) => {
                    if (data.result === 'success') {
                        const conversionRate = data.conversion_rate;
                        this.convertedValue = inputValue * conversionRate;
                        return this.convertedValue;
                    } else {
                        throw new Error('Erro na solicitação da taxa de câmbio');
                    }
                }));
        } else {
            throw new Error('Códigos de país inválidos');
        }
    }
}
