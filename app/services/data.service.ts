import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { GameType } from '../models/game-type';
import { Setting } from '../models/setting';
import { Configuration } from '../app.constants';

@Injectable()
export class DataService {

    private baseUrl: string;
    private headers: Headers;

    constructor(private _http: Http, private _configuration: Configuration) {

        this.baseUrl = _configuration.ServerWithApiUrl;

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public GetAllGameTypes = (): Observable<GameType[]> => {
        return this._http.get(this.baseUrl + 'gameTypes')
            .map((response: Response) => <GameType[]>response.json())
            .catch(this.handleError);
    }

    public GetSettings = (id: string): Observable<Setting[]> => {
         return this._http.get(this.baseUrl + "settings/" + id)
             .map((response: Response) => <Setting[]>response.json())
             .catch(this.handleError);
    }

    // public GetSingle = (id: number): Observable<MyTypedItem> => {
    //     return this._http.get(this.actionUrl + id)
    //         .map((response: Response) => <MyTypedItem>response.json())
    //         .catch(this.handleError);
    // }
    //
    // public Add = (itemName: string): Observable<MyTypedItem> => {
    //     let toAdd = JSON.stringify({ ItemName: itemName });
    //
    //     return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
    //         .map((response: Response) => <MyTypedItem>response.json())
    //         .catch(this.handleError);
    // }
    //
    // public Update = (id: number, itemToUpdate: MyTypedItem): Observable<MyTypedItem> => {
    //     return this._http.put(this.actionUrl + id, JSON.stringify(itemToUpdate), { headers: this.headers })
    //         .map((response: Response) => <MyTypedItem>response.json())
    //         .catch(this.handleError);
    // }
    //
    // public Delete = (id: number): Observable<Response> => {
    //     return this._http.delete(this.actionUrl + id)
    //         .catch(this.handleError);
    // }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
