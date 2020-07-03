class Catz{
	constructor(name, pix, count){
		this.name = name;
		this.pix = "./img/" + pix + ".jpg";
		this.count = count;
		this.id = pix;
	}
	increase(){
		this.count++;
	}
}

(function () {


	let actualList = document.getElementById("actual-list");
	let imgThumbs = document.querySelectorAll(".img-thumb");
	let img = document.getElementById("img");
	let count = document.getElementById("no-of-clicks");
	let name = document.getElementById("cat-name");
	let cats = [];

	for (var i = 0; i < 8; i++) {
		cats.push(new Catz("Leo Lenzo", (i + 1), 0));
	}
	for (var i = 0; i < 8; i++) {
		actualList.innerHTML = actualList.innerHTML
								+ `<li>`
									+ `<div>`
										+ `<img class="img-thumb" id="${cats[i].id}" src="${cats[i].pix}" height="100" width"100">`
										+ `<p>Name: ${cats[i].name}</p>`
									+ `</div>`
								+ `</li>`;
		imgThumbs = document.querySelectorAll(".img-thumb");
	}
	Array.from(imgThumbs).forEach(function(imgThumb){
		imgThumb.addEventListener('click', (e) => {
			for (var i = 0; i < 8; i++) {
				if(imgThumb.id == cats[i].id){
					img.src = cats[i].pix;
					name.innerHTML = cats[i].name;
					count.innerHTML = "No Of Clicks: " + cats[i].count;
					img.addEventListener("click", function(cat){
						return function(){
							cat.increase();
							count.innerHTML = "No Of Clicks: " + cat.count;
						}
					}(cats[i]), e);
				}
			}
		})
	});
})();