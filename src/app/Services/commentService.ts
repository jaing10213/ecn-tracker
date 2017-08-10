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

    private baseUrl: string = 'http://localhost:55140/api/comment';

    saveComment(comment: Icomment): Observable<Icomment>{
        
        let headers = new Headers({'content-type':'application/JSON'});
        let options = new RequestOptions({headers: headers});
        comment.id = 0;
        if(comment.id ===0)
        {
            return this.createComment(comment, options);
        }       
    }

createComment(comment: Icomment, options: RequestOptions): Observable<Icomment>{
  let url = `${this.baseUrl}`
  comment.date = new Date(comment.date);
  return this.http.post(url,comment,options)
  .map(()=>comment)
  .do(data=>console.log('New Comment: ' + JSON.stringify(data)))
  .catch(this.handleError);
}

private handleError(error: Response): Observable<any>{
console.log(error.json());
  return Observable.throw(error.json().error || 'Server error');
}

}