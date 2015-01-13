Template.taskcontainer.helpers({
	taskslist : function(){
		return Tasks.find({}).fetch();
	},
	taskcheckedclass : function(status){
		if(status)
		{
			return 'task-list-item-checked';
		}
	}
})




Template.taskcontainer.events({
	'submit #taskform' : function(event){
	 var taskvalue = event.currentTarget.task.value;
	 Tasks.insert({task:taskvalue, status: false, createdAt: moment().format('DD-MM-YYYY hh:mm:ss a')});
	 event.currentTarget.task.value = "";
	 return false;
	},
	'click .task-list-item' : function(event){
		var task_id = event.currentTarget.dataset.task;
		var task_status = Tasks.findOne({_id : task_id}).status;
         
		Tasks.update({_id : task_id},{$set : {status : !task_status }});

	    
	}
})