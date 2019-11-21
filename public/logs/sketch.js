async function getData(){
    const response = await fetch('/api');
    const data = await response.json();

    for (item of data){
        console.log(data)
        const root = document.createElement('ul');
        const mood = document.createElement('li');
        const grateful = document.createElement('li');
        const geo = document.createElement("li");              
        const date = document.createElement('li');
        const list = document.querySelector(".log-list");
        const image = document.createElement("img")

        mood.textContent = `mood: ${item.mood}`;
        grateful.textContent = `grateful for: ${item.grateful}`
        geo.textContent = item.cityState;
        const dateString = new Date(item.timestamp).toLocaleString()
        date.textContent = dateString;
        image.src = item.image;
        
        //append all three elements to root 
        root.append(mood, grateful, geo, date, image ); 
        list.append(root);
    }   
}
getData();
