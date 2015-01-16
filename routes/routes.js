Router.configure({
layoutTemplate : 'basiclayout'
})

Router.onBeforeAction(function(){
	if(!Meteor.userId())
	{
		this.render('logoheader',{to : 'logo'});
		this.render('login',{to: 'maincontent'})
	}
	else
	{
		this.next();
	}
})



Router.route('/',function(){
	this.wait(Meteor.subscribe('tasks'));

	if(this.ready()){
	
	this.render('logoheader',{to : 'logo'});
	this.render('taskcontainer',{to : 'maincontent'});
	}
	else
	{
		this.render('logoheader',{to : 'logo'});
		this.render('Loading');
	}
})

