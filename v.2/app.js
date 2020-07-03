class Catz{
	constructor(name, pix, count){
		this.name = name;
		this.pix = "./img/" + pix + ".jpg";
		this.count = count;
		this.id = pix;
	}
}

(function() {

	let model = {
		cats: [],
		init: function() {
			if(!localStorage.cats) {
				this.cats = [];
				for (var i = 0; i < 8; i++) {
					this.cats.push(new Catz("Leo Lenzo", (i + 1), 0));
				}
				localStorage.cats = JSON.stringify(this.cats);
			}else {
				this.cats = JSON.parse(localStorage.cats);
			}
		},
		add: function(obj){
			this.cats = JSON.parse(localStorage.cats);
			this.cats.push(obj);
			localStorage.cats = JSON.stringify(this.cats);
		},
		setCats: function(){
			localStorage.cats = JSON.stringify(this.cats);
		},
		increase: function(cat){
			cat.count++;
		},
		update: function(catToBeUpdated){
			this.cats.forEach(function(tempCat, ii){
				return function(){
					if(catToBeUpdated.id == tempCat.id){
						tempCats[ii] = catToBeUpdated;
					};
				};
			});
		}
	};

	let octupus = {
		init: function(){
			model.init();
			viewList.init();
		},
		setCats: function(cats){
			model.setCats(cats);
		},
		getCats: function(){
			return model.cats;
		},
		increase: function(cat){
			model.increase(cat);
		},
		update: function(cat){
			model.update(cat);
			model.setCats();
		}
	};

	let viewList = {
		actualList: document.getElementById("actual-list"),
		imgThumbs: document.querySelectorAll(".img-thumb"),
		init: function (argument) {
			viewList.render();
			this.imgThumbs = document.querySelectorAll(".img-thumb");
			Array.from(this.imgThumbs).forEach(function(imgThumb){
				imgThumb.addEventListener('click', (e) => {
					octupus.getCats().forEach(function(cat){
						if(imgThumb.id == cat.id){
							viewDisplay.init(cat);
						}
					});
				});
			});
		},
		render: function(){
			let htmlStr = "";
			octupus.getCats().forEach(function(cat){
				htmlStr += `<li>`
								+ `<div>`
									+ `<img class="img-thumb" id="${cat.id}" src="${cat.pix}" height="100" width"100">`
									+ `<p>Name: ${cat.name}</p>`
								+ `</div>`
							+ `</li>`;
			});
			this.actualList.innerHTML = htmlStr;
		}
	};

	let viewDisplay = {
		display: document.getElementById("display"),
		init: function(cat){
			viewDisplay.render(cat);
			this.img = document.getElementById("img");
			this.admin = document.getElementById("admin");
			this.img.addEventListener("click", function(tempCat, ee){
				return function(){
					let count = document.getElementById("no-of-clicks");
					octupus.increase(tempCat);
					count.innerHTML = "No Of Clicks: " + tempCat.count;
					octupus.update(tempCat);
				}
			}(cat));
			this.admin.addEventListener("click", function(tempCat, e){
				 return function() {
					viewAdmin.init(document.getElementById("details"), cat);
				}
			}(cat));
		},
		render: function(cat){
			let htmlStr = `<p id="no-of-clicks">No Of Clicks: ${cat.count}</p>`
						+ `<p id="cat-name">${cat.name}</p>`
						+ `<img id="img" src="${cat.pix}" width="400" height="400">`
						+ `<button id="admin"> Admin </button>`
						+ `<div id="details"></div>`;
			this.display.innerHTML = htmlStr;
		}
	};

	let viewAdmin = {
		//details: document.getElementById("details"),
		init: function(div, cat){
			viewAdmin.render(div, cat);
			this.cancel = document.getElementById("cancel");
			this.save = document.getElementById("save");
			this.inputName = document.getElementById("input-name");
			this.inputURL = document.getElementById("input-url");
			this.inputClick = document.getElementById("input-click");

			this.cancel.addEventListener("click", function(tempCat, ee){
				viewAdmin.render(div);
			});
			this.save.addEventListener("click", function(tempCat, tempName, tempURL, tempClick){
				return function(){
					cat.name = tempName.value;
					cat.pix = tempURL.value;
					cat.count = tempClick.value;
					octupus.update(cat);
					viewAdmin.render(div);
					viewDisplay.init(cat);
				};
			}(cat, this.inputName, this.inputURL, this.inputClick));
		},
		render: function(div, cat){
			if(cat == undefined){
				div.innerHTML = "";
			} else {
				let htmlStr = `<p id="input-name-p">Name: </p>`
						+ `<input type="text" id="input-name" value="${cat.name}">`
						+ `<p id="input-url-p">Image URL: </p>`
						+ `<input type="text" id="input-url" value="${cat.pix}">`
						+ `<p id="input-click-p">Number Of Clicks: </p>`
						+ `<input type="text" id="input-click" value="${cat.count}">`
						+ `<button id="cancel"> Cancel </button>`
						+ `<button id="save"> Save </button>`;
				div.innerHTML = htmlStr;
			}
		}
	};
	octupus.init();
})();