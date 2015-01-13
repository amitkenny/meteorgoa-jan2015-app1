
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

Template.taskcontainer.rendered = function () {
	
     this.find('#task').value = "";
     Session.set('EditFlag',false);

};



Template.taskcontainer.events({
	'submit #taskform' : function(event){
		var taskvalue = event.currentTarget.task.value;

     if(taskvalue.length >0 )
	 {
	 	if(!Session.get('EditFlag'))
	 		{
	 		 	
	 		 		 Meteor.call('insertTask',taskvalue,moment().format('DD-MM-YYYY hh:mm:ss a'),function(err){
	 		 		 	if(err)
	 		 		 	{
	 		 	            console.log(err);
	 		 		 	}
	 		 		 })
	 		 		 event.currentTarget.task.value = "";
	 		 }
	 	else
	 		{
	 
	            var task_id = Session.get('EditFlag');
	            Tasks.update({_id : task_id}, {$set : {task : taskvalue}});
	            event.currentTarget.task.value = "";
	            
	 
	 
	 		}
	 }
	 Session.set('EditFlag', false);
	 return false;
	},
	'click .row-action-primary' : function(event){
		var task_id = event.currentTarget.dataset.task;
		var task_status = Tasks.findOne({_id : task_id}).status;
         
		Tasks.update({_id : task_id},{$set : {status : !task_status }});

	    
	},
	'click .edit-btn' : function(event){
		var task_id = event.currentTarget.dataset.task;
		Session.set('EditFlag',task_id);
		Template.instance().find('#task').value = Tasks.findOne({_id : task_id}).task;


	},
	'click .close' :function(event){
		var task_id = event.currentTarget.dataset.task;
		Session.set('EditFlag', false);
		Tasks.remove({_id : task_id});
	}
})