Meteor.methods({
	deleteTask : function(id){
		if(this.userId)
		{
			var task = Tasks.findOne({_id : id});
			if(task)
			{
				if(task.userId == this.userId)
				{
					Tasks.remove({_id : id},function(err){
					if(err)
					{
						throw new Meteor.Error('delete-error','Something went wrong!!! Try again later');
					}

				});

				}
				else
				{
					throw new Meteor.Error('delete-error','You do not have permission to delete this task.')
				}

			}
			else
			{
				throw new Meteor.Error('delete-error','The Task you are trying to delete does not exist');
			}
		}
		else
		{
				throw new Meteor.Error('delete-error','You must be logged in to delete a task');
		}
	}
})