onClick = (event) =>{
	clear();
	fetch('https://tranquil-cliffs-88305.herokuapp.com/getData')
	.then(response=> response.json())
	.then(response=> {
		for(var i=0;i<response.length;i++){
			add(response[i])
		}
	})
}

add = (data) =>{	
	let dataRow =  document.createElement('div');
	dataRow.classList.add('entries');
	let list = document.getElementById("all-items");
	let content = `<p> email :${data.email} url :${data.url}</p> 
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