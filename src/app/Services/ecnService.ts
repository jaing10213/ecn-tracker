import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';        //for debugging
import 'rxjs/add/operator/catch';     //for error handling
import 'rxjs/add/operator/map';       //for mapping http response to entity
import 'rxjs/add/observable/throw';   //for error handling
import 'rxjs/add/observable/of';

import {Iecn} from '../Objects/Iecn';

@Injectable()
export class EcnService{

constructor(private http: Http) { }

  private baseUrl: string = 'http://localhost:55140/api/ecn';

//Return all ECNs
  getEcns(): Observable<Iecn[]> {
    
      let endUrl = "all/wc"
      let url = `${this.baseUrl}/${endUrl}`
      return this.http.get(url)
              .map(response => this.extractData(response))
                .do(data => console.log('getProducts:' + JSON.stringify(data)))
                .catch(this.handleError);
  }


    getEcn(id: number): Observable<Iecn>{

      if (id==0){
        return Observable.of(this.initializeEcn());
      }

     let url  = `${this.baseUrl}/${id}`
     console.log("url: " + url);
     return  this.http.get(url)
       .map(this.extractData)
       .do(data=>console.log('getProductbyId: ' + JSON.stringify(data)))
       .catch(this.handleError);
    }

saveEcn(ecn: Iecn): Observable<Iecn>{
  let headers = new Headers({'content-type': 'application/JSON'});
  let options = new RequestOptions({headers: headers});

  if (ecn.id === 0)
  {
    return this.createEcn(ecn,options);
  }
return this.updateEcn(ecn,options);
}

updateEcn(ecn: Iecn, options: RequestOptions): Observable<Iecn>{
    let url = `${this.baseUrl}/${ecn.id}`;
    return this.http.put(url, ecn, options)
            .map(()=>ecn)
            .do(data=>console.log('Update ECN: ' + JSON.stringify(data)))
            .catch(this.handleError);         
}

createEcn(ecn: Iecn, options: RequestOptions): Observable<Iecn>{
  let url = `${this.baseUrl}`
  return this.http.post(url,ecn,options)
  .map(()=>ecn)
  .do(data=>console.log('New Ecn: ' + JSON.stringify(data)))
  .catch(this.handleError);
}

private extractData(response: Response)
{
  let body = response.json();
  return body || {};

}

private handleError(error: Response): Observable<any>{

  return Observable.throw(error.json().error || 'Server error');
}


private initializeEcn(): Iecn {

  return {
    id: 0,
    ecnNo: '',
    projectId: 0,
    origintorId: 0,
    currentWorkerId: 0,
    resource: '',
    status: '',
    priority: 1,
    description: '',
    comments: null,
    tags: ''
  }
}


}

