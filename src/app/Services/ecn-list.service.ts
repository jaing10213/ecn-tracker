import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';        //for debugging
import 'rxjs/add/operator/catch';     //for error handling
import 'rxjs/add/observable/throw';   //for error handling
import 'rxjs/add/operator/map';       //for mapping http response to product

import {Iecn} from '../Objects/Iecn';

@Injectable()
export class EcnService{

constructor(private http: Http) { }

  private baseUrl: string = 'api/ecns';

//Return all ECNs
  getEcns(): Observable<Iecn[]> {

      return this.http.get(this.baseUrl)
              .map(response => this.extractData(response))
                .do(data => console.log('getProducts:' + JSON.stringify(data)))
                .catch(this.handleError);
  }


    getEcn(id: number): Observable<Iecn>{
     let url  = `${this.baseUrl}/${id}`
     console.log("url: " + url);
     return  this.http.get(url)
       .map(this.extractData)
       .do(data=>console.log('getProductbyId: ' + JSON.stringify(data)))
       .catch(this.handleError);
    }

private extractData(response: Response)
{
  let body = response.json();
  return body.data || {};

}

private handleError(error: Response): Observable<any>{
 //Uncaught (in promise): Error: Error in :0:0 caused by: Unable to get property '1' of undefined or null reference console.error(error);
  return Observable.throw(error.json().error || 'Server error');
}





}

