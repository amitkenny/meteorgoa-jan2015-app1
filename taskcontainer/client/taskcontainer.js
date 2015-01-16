
Template.taskcontainer.helpers({
	taskslist : function(){
		return Tasks.find({}).fetch();
	},
	taskcheckedclass : function(status){
		if(status)
		{
			return 'task-list-item-checked';
		}
	},
	inserterrormessage : function(){
		return Session.get('insertError');
	},
	updatestatuserror : function(){
		return Session.get('updateStatusError');
	}
})

Tracker.autorun(function(){

	if(Session.get('updateStatusError'))
	{

		toastr.error(Session.get('updateStatusError'),'Update-Error');
	}

})

Template.taskcontainer.rendered = function () {
	

     this.find('#task').value = "";
     Session.set('EditFlag',false);
     Session.set('insertError',false);
     Session.set('updateStatusError',false);
     
	if(Session.get('updateStatusError'))
	{

		toastr.error(Session.get('updateStatusError'),'Update-Error');
	}


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
	 		 	            Session.set('insertError',err.reason);
	 		 		 	}
	 		 		 	else
	 		 		 	{
	 		 		 		Session.set('insertError',false);
	 		 		 	}
	 		 		 })
	 		 		 event.currentTarget.task.value = "";
	 		 }
	 	else
	 		{
	 
	            var task_id = Session.get('EditFlag');
	            Meteor.call('updateTask',task_id,taskvalue,function(err){
	            	if(err)
	            	{
	            		Session.set('insertError',err.reason);
	            	}
	            	else
	 		 		 	{
	 		 		 		Session.set('insertError',false);
	 		 		 	}

	            })
	            event.currentTarget.task.value = "";
	            
	 
	 
	 		}
	 }
	 Session.set('EditFlag', false);
	 return false;
	},
	'click .row-action-primary' : function(event){
		var task_id = event.currentTarget.dataset.task;
		
		Meteor.call('updateTaskStatus',task_id,function(err){
	            	if(err)
	            	{
	            		Session.set('updateStatusError',err.reason);
	            	}
	            	else
	 		 		 	{
	 		 		 		Session.set('updateStatusError',false);
	 		 		 	}

	            })
		

	    
	},
	'click .edit-btn' : function(event){
		var task_id = event.currentTarget.dataset.task;
		Session.set('EditFlag',task_id);
		Template.instance().find('#task').value = Tasks.findOne({_id : task_id}).task;


	},
	'click .close' :function(event){
		var task_id = event.currentTarget.dataset.task;
		Session.set('EditFlag', false);
		Meteor.call('deleteTask',task_id,function(err){
			if(err)
			{
				console.log(err.reason);
			}
		})
		
	}
})