Router.route('/',function(){
	this.wait(Meteor.subscribe('tasks'));

	if(this.ready()){
		this.layout('basiclayout');
	this.render('logoheader',{to : 'logo'});
	this.render('taskcontainer',{to : 'maincontent'});
	}
	else
	{
		this.render('Loading');
	}
})

