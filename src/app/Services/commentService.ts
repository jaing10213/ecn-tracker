import {Component, Injectable} from '@angular/core'
import {Http, Response, RequestOptions, Headers} from '@angular/http'
import {Observable} from 'rxjs/Observable'

import  'rxjs/add/operator/do'      //for debugging
import 'rxjs/add/operator/catch'    //for error handling
import 'rxjs/add/operator/map'      //for mapping http response to entity
import 'rxjs/add/observable/throw'  //for error handling
import 'rxjs/add/observable/of'

import {Icomment} from '../Objects/Icomment'

@Injectable()
export class CommentService
{
    constructor(private http: Http){}

   // private baseUrl: string = 'http://localhost:55140//api/comment';
    private baseUrl: string = 'http://dev.lrs.liebert.com/ecntrackerapi/api/comment';


    saveComment(comment: Icomment): Observable<{comment:Icomment, ok:boolean}>{
        let headers = new Headers({'content-type':'application/JSON'});
        let options = new RequestOptions({headers: headers});   
       
        return this.createComment(comment, options);
    }

    updateComment(comment: Icomment, options: RequestOptions): Observable<{comment:Icomment, ok:boolean}>{
    let url = `${this.baseUrl}`;
    return this.http.put(url, comment, options)
            .map((response)=>this.extractData(response))
            .do(data=>{})
            .catch(this.handleError);         
}

createComment(comment: Icomment, options: RequestOptions): Observable<{comment:Icomment, ok:boolean}>{
  let url = `${this.baseUrl}`
  
  return this.http.post(url,comment,options)
  .map((response)=>this.extractData(response))
 // .do(data=>console.log('New Comment: ' + JSON.stringify(data)))
  .catch(this.handleError);
}

deleteComment(id:number): Observable<boolean>
{
    let url = `${this.baseUrl}/${id}`
    let headers = new Headers({'content-type': 'text'})
    let options = new RequestOptions({headers: headers});

    return this.http.post(url, options)
    .map((response)=>response.ok)
 //   .do(data=>console.log("delete: " + JSON.stringify(data)))
    .catch(this.handleError);
}

private extractData(response: Response)
{
  let body = response.json();
  return {comment: body || {}, ok: response.ok};
}

private handleError(error: Response): Observable<any>{
console.log(error.json());
  return Observable.throw(error.json().error || 'Server error');
}

}