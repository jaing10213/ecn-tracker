import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { EcnListComponent } from './ecn-list/ecn-list.component';
import { EcnDetailsComponent } from './ecn/ecn-details.component';
import { EcnNewComponent } from './ecn-new/ecn-new.component';
import { EcnNewReactComponent } from './ecn-new-react/ecn-new-react.component';
import { ArrayLimiterPipe } from './ecn-list/array-limiter.pipe'
@NgModule({
  declarations: [
    AppComponent,
    EcnListComponent,
    EcnDetailsComponent,
    EcnNewComponent,
    EcnNewReactComponent,
    ArrayLimiterPipe
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path:'ecns', component: EcnListComponent},
      {path: 'ecn/:id', component: EcnDetailsComponent},
      {path: 'newecn', component: EcnNewReactComponent},
      {path: '', redirectTo: 'ecns', pathMatch: 'full'},
      {path: '**', redirectTo: 'ecns', pathMatch: 'full' }
    ])    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
