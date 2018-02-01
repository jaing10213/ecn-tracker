import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders}  from "@angular/common/http"
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';        //for debugging
import 'rxjs/add/operator/catch';     //for error handling
import 'rxjs/add/observable/throw';   //for error handling
import 'rxjs/add/observable/of';

import {Iecn} from '../Objects/Iecn';
import {baseUrl} from '../Objects/baseUrl'

@Injectable()
export class EcnService{

constructor(private http: HttpClient) { }

//private baseUrl: string = 'http://localhost:55140//api/ecn';
//private baseUrl: string = 'http://dev.lrs.liebert.com/ecntrackerapi/api/ecn';

private baseUrl = baseUrl.concat("api/ecn");

private isTask: boolean = false;

//Return Page last settigns
getPageSettings(): boolean {
  return this.isTask;
}

setPageSettings(isTask: boolean): void {
  this.isTask = isTask;
}

//Return all ECNs
  getEcns(uId:number, pId: number): Observable<Iecn[]> {
    
    let endUrl = '';

  pId = pId==0?-1:pId;
  uId = uId==0?-1:uId;

       endUrl = "all/" + uId + "/" + pId  + "/wc";
       
      let url = `${this.baseUrl}/${endUrl}`
      return this.http.get<Iecn[]>(url)
          //  .do(data => console.log(JSON.stringify(data)))
  }


    getEcn(id: number): Observable<Iecn>{


     let url  = `${this.baseUrl}/${id}`     
     return  this.http.get<Iecn>(url)
     //  .do(data=>{})
    }

saveEcn(ecn: Iecn): Observable<Iecn>{
  let headers = new HttpHeaders(({'content-type': 'application/JSON'}));
  let options = {headers: headers};

return this.createEcn(ecn,options);

}

//Call to create a new ecn or update an existing one
createEcn(ecn: Iecn, options: {headers: HttpHeaders}): Observable<Iecn>{
  let url = `${this.baseUrl}`
  return this.http.post<Iecn>(url,ecn,options)
 // .do(data=>{})
}

//Call to delete an existing ECN
deleteEcn(id: number): Observable<string>{
  let url = `${this.baseUrl}/${id}`
  let headers = new HttpHeaders({'content-type': 'text'})
  let options = ({headers: headers});

  return this.http.post<string>(url,options)
 // .do(data=>{})
}

updateEcn(ecn: Iecn, options: {headers: HttpHeaders}): Observable<{ecn:Iecn, ok:boolean}>{
    let url = `${this.baseUrl}`;
    return this.http.put<{ecn:Iecn, ok:boolean}>(url, ecn, options)
          //  .do(data=>{})
}

}

