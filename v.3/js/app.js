class Catz{
	constructor(name, pix, count, nicks){
		this.name = ko.observable(name);
		this.pix = ko.observable("./img/" + pix + ".jpg");
		this.count = ko.observable(count);
		this.id = ko.observable(pix);
		this.nicknames = ko.observableArray(nicks);
		
	}
	title(){
		let self = this;
		return ko.computed(function(){
			let title;
			let clicks = self.count();
			if(clicks < 10) {
				title = "Newborn Nubian";
			}else {
				title = "Old Nubian";
			}
			return title;
		}, this);
	}
}

function ViewModel(){
	let self = this;
	this.cats = ko.observableArray([]);

	if(!localStorage.cats) {
		this.cats = ko.observableArray([]);
		for (var i = 0; i < 8; i++) {
			self.cats.push(new Catz("Leo Lenzo", (i + 1), 0, ["Catty", "Kitty"]));
		}
		localStorage.cats = ko.toJSON(self.cats());
	}else {
		let parsed = JSON.parse(ko.toJS(localStorage.cats));
		parsed.forEach(function(cat, i){
			self.cats.push(new Catz(cat.name, (i + 1), cat.count, cat.nicknames));
		});
	}

	this.currentCat = ko.observable(this.cats()[0]);

	this.incrementCounter = function(){
		self.currentCat().count(self.currentCat().count() + 1);
		self.updateLocalStorage();
	}

	this.setCat = function(clickedCat){
		self.currentCat(clickedCat);
	}
	this.displayAdmin = function(clickedCat){
		let details = $("#details");
		
		details.css("display", "block");

		$("#input-name").val(clickedCat.name());
		$("#input-url").val(clickedCat.pix());
		$("#input-click").val(clickedCat.count());
	}
	this.cancel = function(clickedCat){
		let details = $("#details");
		
		$("#input-name").val("");
		$("#input-url").val("");
		$("#input-click").val("");

		details.css("display", "none");
	}
	this.save = function(clickedCat){
		let details = $("#details");
		
		clickedCat.name($("#input-name").val());
		clickedCat.pix($("#input-url").val());
		clickedCat.count($("#input-click").val());

		details.css("display", "none");
		self.updateLocalStorage();
	}
	this.updateLocalStorage = function() {
		localStorage.cats = ko.toJSON(self.cats());
	}

}
ko.applyBindings(new ViewModel());