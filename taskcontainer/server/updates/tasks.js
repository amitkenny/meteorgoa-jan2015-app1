Meteor.methods({
	updateTask : function(id, newvalue){
		if(this.userId)
		{
			var task = Tasks.findOne({_id : id});
			if(task.userId === this.userId)
			{
				if(task)
				{
					if(Match.test(newvalue, String) || newvalue.length>0)
					{
						 Tasks.update({_id : id}, {$set : {task : newvalue}},function(err){
						 	if(err)
						 	{
						 		throw new Meteor.Error('update-error','Something went wrong!!! Try again later');
						 	}
						 });
					}
					else
					{
						throw new Meteor.Error('update-error','The Task you are trying to update is not valid');

					}
				}
				else
				{
					throw new Meteor.Error('update-error','The Task you are trying to update does not exist');
				}
			}
			else
			{
				throw new Meteor.Error('upate-error',"You do not have permission to update this task")
			}
			
		}
		else	
		{
			throw new Meteor.Error('update-error','You must be logged in to update a task');
		}
	},

  updateTaskStatus : function(id){
  		if(this.userId)
  		{
  			var task = Tasks.findOne({_id : id});
			if(task.userId === this.userId)
			{
					if(task)
					{	

						Tasks.update({_id : id},{$set : {status : !task.status}},function(err){
						 	if(err)
						 	{
						 		throw new Meteor.Error('update-error','Something went wrong!!! Try again later');
						 	}
						 });

					}
					else
					{
						throw new Meteor.Error('update-error','The Task you are trying to update does not exist');
					}
			}	
			else
			{
				throw new Meteor.Error('upate-error',"You do not have permission to update the status of this task")
			}
  		}
  		else
  		{
  			throw new Meteor.Error('update-error','You must be logged in to update a task');
  		}

  }

})