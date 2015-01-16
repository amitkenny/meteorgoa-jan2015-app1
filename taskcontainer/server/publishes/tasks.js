

Meteor.publish('tasks',function(){
	
	if(this.userId)
	{
		return Tasks.find({userId : this.userId});
	}
	
});
