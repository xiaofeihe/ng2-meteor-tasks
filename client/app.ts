
import {Component, View, bootstrap,NgFor} from 'angular2/angular2';

@Component({
  selector: 'app'
})

@View({
   templateUrl:'client/tpl/index.ng.html',
  directives:[NgFor]
})
class AmsTask {
tasklist=[]
  constructor(){
     Tracker.autorun(zone.bind(()=> {
       this.tasklist[0] = Tasks.find({state:0}).fetch();
       this.tasklist[1] = Tasks.find({state:1}).fetch();
       this.tasklist[2] = Tasks.find({state:2}).fetch();
    }));
  }
  remove(task) {
   Tasks.remove(task._id);
 }
 addTask(title,beizu){
   Tasks.insert({title:title.value,beizu:beizu.value,state:1})
   title.value=beizu.value=""
 }
 upState(task,v){
   task.state=v;
   Tasks.update(task._id,task)
 }
}

bootstrap(AmsTask);
