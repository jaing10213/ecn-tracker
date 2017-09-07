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
  getEcns(): Observable<{ecn: Iecn[], ok:boolean}> {
    
      let endUrl = "all/wc"
      let url = `${this.baseUrl}/${endUrl}`
      return this.http.get(url)
              .map(response => this.extractData(response))
                .do(data => console.log('getProducts:' + JSON.stringify(data)))
                .catch(this.handleError);
  }


    getEcn(id: number): Observable<{ecn:Iecn,ok:boolean}>{

      if (id==0){
        return Observable.of(this.initializeEcn());
      }

     let url  = `${this.baseUrl}/${id}`
     console.log("url: " + url);
     return  this.http.get(url)
       .map((response)=>this.extractData(response))
       .do(data=>console.log('getProductbyId: ' + JSON.stringify(data)))
       .catch(this.handleError);
    }

saveEcn(ecn: Iecn): Observable<{ecn:Iecn, ok:boolean}>{
  let headers = new Headers({'content-type': 'application/JSON'});
  let options = new RequestOptions({headers: headers});

  if (ecn.id === 0)
  {
    return this.createEcn(ecn,options);
  }
return this.updateEcn(ecn,options);
}

updateEcn(ecn: Iecn, options: RequestOptions): Observable<{ecn:Iecn, ok:boolean}>{
    let url = `${this.baseUrl}/${ecn.id}`;
    return this.http.put(url, ecn, options)
            .map((response)=>this.extractData(response))
            .do(data=>console.log('Update ECN: ' + JSON.stringify(data)))
            .catch(this.handleError);         
}

//Call to create a new ecn
createEcn(ecn: Iecn, options: RequestOptions): Observable<{ecn:Iecn, ok:boolean}>{
  let url = `${this.baseUrl}`
  return this.http.post(url,ecn,options)
  .map((response)=>this.extractData(response))
  .do(data=>console.log('New Ecn: ' + JSON.stringify(data)))
  .catch(this.handleError);
}

private extractData(response: Response)
{
  let body = response.json();
  return {ecn: body || {}, ok : response.ok};

}

private handleError(error: Response): Observable<any>{

  return Observable.throw(error.json().error || 'Server error');
}


private initializeEcn(): {ecn:Iecn,ok:boolean} {

  let ecn:Iecn = {
    id: 0,
    ecnNo: '',
    projectId: 0,
    origintorId: 0,
    currentWorkerId: 0,
    currentworkerName: '',
    status: '',
    priority: 1,
    description: '',
    comments: null,
    tags: '',
    userList: null
  }
  return {ecn:ecn,ok:true};
}


}

