Meteor.methods({
	updateTask : function(id, newvalue){
			if(this.isSimulation)
			{
				if(this.userId)
				{
					Tasks.update({_id : id}, {$set : {task : newvalue}});
				}
			}
	}
})