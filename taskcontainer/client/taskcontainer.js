Template.taskcontainer.helpers({
	taskslist : function(){
		return Tasks.find({}).fetch();
	}
})

Template.taskcontainer.events({
	'submit #taskform' : function(event){
	 var taskvalue = event.currentTarget.task.value;
	 Tasks.insert({task:taskvalue, status: false, createdAt: moment()});
	 event.currentTarget.task.value = "";
	 return false;
	}
})