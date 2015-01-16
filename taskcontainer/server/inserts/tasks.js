Meteor.methods({
	insertTask : function(task,createdAt){
		if(this.userId)
		{
		if(Match.test(task, String) || task.length>0)
			{

				Tasks.insert({task : task , status : false, createdAt : createdAt,userId : this.userId},function(err,id){
					if(err)
					{
						throw new Meteor.Error('insert-error','Something went wrong!!! Try again later');
					}
				})

			}
		   else
		   {
		   	  throw new Meteor.Error('insert-error','The Task you are trying to enter is not valid');
		   }

		}
		else
		{
			throw new Meteor.Error('insert-error','You must be logged in to insert a new task');
		}


	}
})