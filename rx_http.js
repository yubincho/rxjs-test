// import { Observable } from '@reactivex/rxjs';

// var Rx = require('@reactivex/rxjs');
const { Observable } = require("rxjs");
 
Observable.of('hello world')
  .subscribe(function(x) { console.log(x); });

