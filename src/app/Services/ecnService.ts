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
                .do(data => {})
                .catch(this.handleError);
  }


    getEcn(id: number): Observable<{ecn:Iecn,ok:boolean}>{

/*      if (id==0){
        return Observable.of(this.initializeEcn());
      }*/

     let url  = `${this.baseUrl}/${id}`     
     return  this.http.get(url)
       .map((response)=>this.extractData(response))
       .do(data=>{})
       .catch(this.handleError);
    }

saveEcn(ecn: Iecn): Observable<{ecn:Iecn, ok:boolean}>{
  let headers = new Headers({'content-type': 'application/JSON'});
  let options = new RequestOptions({headers: headers});

//return this.createEcn(ecn,options);

  if (ecn.id === 0)
  {
   return this.createEcn(ecn,options);
  }
return this.updateEcn(ecn,options);
}

updateEcn(ecn: Iecn, options: RequestOptions): Observable<{ecn:Iecn, ok:boolean}>{
    let url = `${this.baseUrl}`;
    return this.http.put(url, ecn, options)
            .map((response)=>this.extractData(response))
            .do(data=>{})
            .catch(this.handleError);         
}

//Call to create a new ecn
createEcn(ecn: Iecn, options: RequestOptions): Observable<{ecn:Iecn, ok:boolean}>{
  let url = `${this.baseUrl}`
  return this.http.post(url,ecn,options)
  .map((response)=> this.extractData(response)) 
  .do(data=>{})
  .catch(this.handleError);
}

//Call to delete an existing ECN
deleteEcn(id: number): Observable<boolean>{
  let url = `${this.baseUrl}/${id}`
  let headers = new Headers({'content-type': 'text'})
  let options = new RequestOptions({headers: headers});

  return this.http.delete(url,options)
  .map(response=>response.ok)
  .do(data=>{})
  .catch(this.handleError);
}

private extractData(response: Response)
{
 
   let body =  response.json();
  let res=  {ecn: body || {}, ok : response.ok};
 return res;

  

}

private handleError(error: Response): Observable<any>{

  console.log(error.json().error);
  return Observable.throw(error.json().error || 'Server error');
}


private initializeEcn(): {ecn:Iecn,ok:boolean} {

  let ecn:Iecn = {
    id: 0,
    ecnNo: '',
    projectId: 1,
    originatorId: 1,
    currentWorkerId: null,
    currentWorkerName: '',
    status: '',
    priority: 1,
    description: '',
    comments: null,
    tags: '',
    userList: null,
    projectList: null
  }
  return {ecn:ecn,ok:true};
}


}

