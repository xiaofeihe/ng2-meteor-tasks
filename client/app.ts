import {Component, View, bootstrap,NgFor} from 'angular2/angular2';

@Component({
  selector: 'app'
})
@View({
   templateUrl:'client/tpl/index.ng.html',
  directives:[NgFor]
})
class AmsTask {
tasklist=[],taskDetail={}
  constructor(){
     Tracker.autorun(zone.bind(()=> {
       this.tasklist[0] = Tasks.find({state:0}).fetch();
       this.tasklist[1] = Tasks.find({state:1}).fetch();
       this.tasklist[2] = Tasks.find({state:2}).fetch();
    }));
  }
  //删除任务
  remove(task) {
   Tasks.remove(task._id);
 }
 //添加任务
 addTask(title,beizu){
   Tasks.insert({title:title.value,beizu:beizu.value,state:0,comments:[]})
   title.value=beizu.value=""
 }
 //更改任务状态
 upState(task,v){
   task.state=v;
   Tasks.update(task._id,task)
 }
 //点击某个任务后
 cktask(task){
      this.taskDetail=task
      document.getElementById("tkdetail").style.visibility="visible"//visible
 }
 //退出详细页面
 hideDetail(){
   document.getElementById("tkdetail").style.visibility="hidden"//visible
 }
 addComment(task,newjilu){
   Tasks.update(task._id,{"$push":{"comments":{"content":newjilu.value}}})
    this.taskDetail['comments'].push({"content":newjilu.value})
    newjilu.value=""
    cktask(this.taskDetail)
 }
}
bootstrap(AmsTask);
