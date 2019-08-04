import {Observable} from 'rxjs/observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
//import 'rxjs/add/operator/share'; 

//create observable function which emits values
var observable = Observable.create((observer:any) => {
    try{
    observer.next('Hi guys');
    observer.next('how are you');
    setInterval(()=>{
        observer.next('I am good')
    },2000);
    }catch(err){
        observer.error(err);
    }
});//.share();

//create subcriber observers to consume the values emitted by observable
var observer1= observable.subscribe(
    (x:any)=> addItem(x),
    (error:any)=> addItem(error),
    ()=> addItem('completed')

);
//create subcriber observers to consume the values emitted by observable
var observer2= observable.subscribe(
    (x:any)=> addItem(x),
);
//if observer1 is cancelled so observer2 will also automatically.
observer1.add(observer2);

//unsubscribe the subscribed observers
setTimeout(() => {
    observer1.unsubscribe();
}, 6001);

//hot and cold observables
setTimeout(() => {
    var observer3 = observable.subscribe(
        (x:any) => addItem('Subscribed:'+x)
    )
}, 1000);

//---------------------------------------------------------------------------------
//subjects acts as both observable and observer.
var subject = new BehaviorSubject('first');
//subscibe to the subject as it is also a observable.
subject.subscribe(
   (data:any) => addItem("Observer 1:"+data),
   (err:any) => addItem(err),
   () => addItem('Observer of type subject completed.')
);
//emit values from subject
subject.next('the first thing has been sent');

var observer4=subject.subscribe(
    (data:any) => addItem('observer 2:'+data)
);
subject.next('the second thing has been sent');
subject.next('the third thing has been sent');
observer4.unsubscribe();
subject.next('A final thing has been sent');

//-----------------------------------------------------------------------------------

function addItem(val:any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
}