Template.login.helpers({
loginerror : function(){
	return Session.get('LoginError');
}
})
Template.login.rendered = function(){
Session.set('LoginError',false);
}

Template.login.events({
	'submit #loginform' : function(event){
		Meteor.loginWithPassword(event.currentTarget.username.value,event.currentTarget.password.value,function(err){
			if(err)
			{
					Session.set('LoginError',err.reason);
					return;
			}
			Session.set('LoginError',false);
		});
		event.currentTarget.username.value = "";
		event.currentTarget.password.value = "";
		return false;
	}
})

