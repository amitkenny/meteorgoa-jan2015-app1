Template.logoheader.helpers({
	useremail : function(){
		return Meteor.user().emails[0].address;
	}
})



Template.logoheader.events({
	'click #signout' : function(event){
		Meteor.logout();
		return false;
	}
})