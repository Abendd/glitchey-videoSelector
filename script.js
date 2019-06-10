onClick = (event) =>{
	clear();
	fetch('https://tranquil-cliffs-88305.herokuapp.com/getData')
	.then(response=> response.json())
	.then(response=> {
		if (response.length===0){
			document.getElementById("all-items").innerHTML="nothing here yet!";
		}
		else{
			for(var i=0;i<response.length;i++){
				display(response[i]);
			}
			remove();
			add();
		}
	})
}

remove = () => {
	list = document.getElementsByClassName("remove");
	for(var i=0;i<list.length;i++){	
		list[i].onclick = function(){
			removeFromDatabase(this);
			this.parentElement.remove();
		}
	}
}

add = () =>{
	list = document.getElementsByClassName("add");
	console.log(list)
	for(var i=0;i<list.length;i++){	
		list[i].onclick = function(){
			console.log(this)
			addToDatabase(this);
			this.innerHTML ="added";
		}
	}
}

addToDatabase = (element) => {
	let email = element.parentElement.children[0].innerHTML;
	let url = element.parentElement.children[1].innerHTML;
	console.log(email,url)
	fetch('https://tranquil-cliffs-88305.herokuapp.com/add',{
		method:'POST',
		headers:{'Content-Type':'application/json','Accept': 'application/json'},
		body:JSON.stringify({
			email:email,
			url:url
		})
	})
	.then(response=> response.json())
	.then(response=>{
		console.log(response);
	})
}

removeFromDatabase = (element) => {
	let email = element.parentElement.children[0].innerHTML;
	let url = element.parentElement.children[1].innerHTML;
	fetch('https://tranquil-cliffs-88305.herokuapp.com/remove',{
		method:'POST',
		headers:{'Content-Type':'application/json'},
		body:JSON.stringify({
			email:email,
			url:url
		})
	})
	.then(response=> response.json())
	.then(response=>{
		console.log(response);
	})
}
display = (data) =>{	
	let dataRow =  document.createElement('div');
	dataRow.classList.add('entries');
	let list = document.getElementById("all-items");
	let content = `<p>${data.email}</p> <p>${data.url}</p> 
					<button class="add">add</button>
					<button class="remove">remove</button>`;
	dataRow.innerHTML = content;
	list.append(dataRow)
}

clear = () =>{
	let list =  document.getElementsByClassName("entries");
	while(list.length>0){
		list[0].remove();
	}
}
