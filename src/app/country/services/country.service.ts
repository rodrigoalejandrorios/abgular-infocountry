import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryClient } from '../interfaces/country.interface';
import { ENDPOINT } from './country.endpoint.enum';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private readonly httpService: HttpClient) {
    if (localStorage.getItem('records')) {
      this._records = JSON.parse(localStorage.getItem('records')!);
    }
  }
  private readonly _API_URL = 'https://restcountries.com/v3.1';

  private _records: string[] = [];

  public get showRecords() {
    return [...this._records];
  }

  public deleteRecords(): void {
    this._records = [];
    localStorage.removeItem('records');
  }

  recInLocalStorages(s: string[]) {
    localStorage.setItem('records', JSON.stringify(s));
  }

  public searchCountries(searchWord: string): Observable<CountryClient[]> {
    if (!this._records.includes(searchWord)) {
      this._records.push(searchWord);
      this.recInLocalStorages(this._records);
    }
    return this.httpService.get<CountryClient[]>(
      `${this._API_URL}/${ENDPOINT.NAME}/${searchWord}`
    );
  }
  public searchCapital(searchWord: string): Observable<CountryClient[]> {
    if (!this._records.includes(searchWord)) {
      this._records.push(searchWord);
      this.recInLocalStorages(this._records);
    }
    return this.httpService.get<CountryClient[]>(
      `${this._API_URL}/${ENDPOINT.CAPITAL}/${searchWord}`
    );
  }
  public getCountry(id: string): Observable<CountryClient[]> {
    return this.httpService.get<CountryClient[]>(
      `${this._API_URL}/${ENDPOINT.CODE}/${id}`
    );
  }
  public getRegion(name: string): Observable<CountryClient[]> {
    return this.httpService.get<CountryClient[]>(
      `${this._API_URL}/${ENDPOINT.REGION}/${name}`
    );
  }
}
