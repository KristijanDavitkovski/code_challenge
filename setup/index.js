
function dataload() {
    var myData = null;
    fetch('http://127.0.0.1:5500/data.json')
        .then((response) => response.json())
        .then(data => {
           // console.log(data);
            loadcards(data);
            load(data, 0);
        })
        .catch(error => console.error(error));
}
function loadcards(data) {
    for (var i = 0; i < 4; i++) {
        var card_title = document.getElementsByClassName('card-title')[i];
        card_title.innerHTML = data[i].name;
        var profile_pic = document.getElementsByClassName('profile-pic')[i];
        profile_pic.src = data[i].profile_image;
        var card_date = document.getElementsByClassName('card-date')[i];
        card_date.innerHTML = data[i].date;
        var card_text = document.getElementsByClassName('card-text')[i];
        card_text.innerHTML = data[i].caption;
        var pic = document.getElementsByClassName('pic')[i];
        pic.src = data[i].image;
        var likes = document.getElementsByClassName('likes')[i];
        likes.innerHTML = data[i].likes;

     //   console.log(i);
     //   console.log(data[i]);
    }
}

function load(data, initial) {
    if (initial == 0) {
        podatoci = data;
        return;
    }
    //console.log(podatoci);
    if (podatoci != null) {
        const cardContainer = document.getElementById("card-container");

        const cards = document.querySelectorAll('.card');
      //  console.log(cards.length);
        var card_start = cards.length;
        for (let i = 0; i < 4; i++) {
            // create the main card element
            if(podatoci[card_start] == undefined){
                console.log("overflow");
                const button = document.getElementById('load-more-btn');
                button.style.display = 'none';
                break;
            }
            const cardDiv = document.createElement("div");
            cardDiv.classList.add("card");
            cardContainer.appendChild(cardDiv);
            // create the top part of the card
            const cardTopDiv = document.createElement("div");
            cardTopDiv.classList.add("card-top");
            cardDiv.appendChild(cardTopDiv);
            // create the card profile picture
            const profilePicDiv = document.createElement("div");
            profilePicDiv.classList.add("card-profile-pic");
            profilePicDiv.setAttribute("height", "85px");
            const profilePicImg = document.createElement("img");
            profilePicImg.classList.add("profile-pic");
            profilePicImg.src = podatoci[card_start].profile_image;
            profilePicImg.alt = "";
            profilePicDiv.appendChild(profilePicImg);
            cardTopDiv.appendChild(profilePicDiv);

            // create the card title and date
            const cardTitleDiv = document.createElement("div");
            cardTitleDiv.classList.add("card-title");
            cardTitleDiv.textContent = podatoci[card_start].name;
            const cardDateDiv = document.createElement("div");
            cardDateDiv.classList.add("card-date");
            cardDateDiv.textContent = podatoci[card_start].date;
            profilePicDiv.appendChild(cardTitleDiv);
            profilePicDiv.appendChild(cardDateDiv);
            // create the card logo
            const logoDiv = document.createElement("div");
            logoDiv.classList.add("logo");
            logoDiv.setAttribute("height", "30px");
            profilePicDiv.appendChild(logoDiv);
            const logoSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            logoSvg.setAttribute("width", "30");
            logoSvg.setAttribute("height", "30");
            const logoImg = document.createElementNS("http://www.w3.org/2000/svg", "image");
            logoImg.setAttribute("width", "30");
            logoImg.setAttribute("height", "30");
            if(podatoci[card_start].source_type == 'facebook'){
             //   console.log(podatoci[card_start].source_link);
                logoImg.setAttributeNS("http://www.w3.org/1999/xlink", "href", "http://127.0.0.1:5500/icons/facebook.svg"); 
                logoImg.setAttribute("alt", "facebook");
                logoImg.setAttribute("class", "filterimage");
            }
            else if (podatoci[card_start].source_type == 'instagram')
            {
              //  console.log(podatoci[card_start].source_link);
            logoImg.setAttributeNS("http://www.w3.org/1999/xlink", "href", "http://127.0.0.1:5500/icons/instagram-logo.svg");
            logoImg.setAttribute("alt", "instagram");
            logoImg.setAttribute("class", "filterimage");
            }
            logoSvg.appendChild(logoImg);
            logoDiv.appendChild(logoSvg);
           // profilePicDiv.appendChild(logoDiv);
            // append the profile picture, title, date, and logo to the card top

            // create the card body
            const cardBodyDiv = document.createElement("div");
            cardBodyDiv.classList.add("card-body");
            cardDiv.appendChild(cardBodyDiv);
            // create the card picture and text
            const cardPicDiv = document.createElement("div");
            cardPicDiv.classList.add("card-pic");
            const cardPicImg = document.createElement("img");
            cardPicImg.classList.add("pic");
            cardPicImg.src = podatoci[card_start].image;
            cardPicImg.alt = "";
            cardPicDiv.appendChild(cardPicImg);
            const cardTextDiv = document.createElement("div");
            cardTextDiv.classList.add("card-text");
            cardTextDiv.textContent = podatoci[card_start].caption;
            cardDiv.appendChild(cardTextDiv);
            // append the picture and text to the card body
            cardBodyDiv.appendChild(cardPicDiv);
            cardBodyDiv.appendChild(cardTextDiv);

            // create the bottom part of the card
            const cardBottomDiv = document.createElement("div");
            cardBottomDiv.classList.add("card-bottom");

            // create the heart and likes
            const heartDiv = document.createElement("div");
            heartDiv.classList.add("heart");
            const heartSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            heartSvg.setAttribute("width", "16");
            heartSvg.setAttribute("height", "16");
            const heartImg = document.createElementNS("http://www.w3.org/2000/svg", "image");
            heartImg.setAttributeNS("http://www.w3.org/1999/xlink", "href", "http://127.0.0.1:5500/icons/heart.svg");
            heartImg.setAttribute("width", "16");
            heartImg.setAttribute("height", "16");
            heartImg.setAttribute('onclick','likecounter(this);');
            heartSvg.appendChild(heartImg);
            heartDiv.appendChild(heartSvg);
            const likesDiv = document.createElement("div");
            likesDiv.classList.add("likes");
            likesDiv.textContent = podatoci[card_start].likes;
            cardDiv.appendChild(heartDiv);
            cardDiv.appendChild(likesDiv);
            card_start = card_start + 1;
        }
    }
}
function changeColor() {
    const cards = document.querySelectorAll('.card');
    var color = document.getElementById('cardBackgroundColor').value;
   // console.log(color);
    cards.forEach(element => {
        element.style.backgroundColor = color;
    });
   // console.log("boja");
}
function theme() {
    const cards = document.querySelectorAll('.card');
    if (document.getElementById("lightTheme").checked == true) {
       // console.log('light');
        cards.forEach(element => {
            element.style.backgroundColor = '#FFFFFF';
            element.style.color = '#000000';
        });
    }
    else {
        cards.forEach(element => {
            element.style.backgroundColor = '#000000';
            element.style.color = '#FFFFFF';
        });
    }
   // console.log("dark");

}
function changespace() {
    const cards = document.querySelectorAll('.card');
    var cardSpaceBetween = document.getElementById('cardSpaceBetween').value;
   // console.log(cardSpaceBetween);
    cards.forEach(element => {
        element.style.marginLeft = cardSpaceBetween;
    });
}
function filter(source) {
   // console.log(source.value);
   
    let i=0;
    var cards = document.querySelectorAll('.card');
    const fimages = document.querySelectorAll(' .filterimage'); 

    cards.forEach(element => {
        console.log(fimages.item(i).getAttribute('alt'));
       // console.log(element);
       if(source.value == 'all'){
        element.style.display = 'block';
        element.style.visiblity = 'inherit';
        }
        if(fimages.item(i).getAttribute('alt') == source.value || source.value == 'all'){
            element.style.display = 'inline-block';
            console.log(source.value);
        }
        if(fimages.item(i).getAttribute('alt') != source.value && source.value != 'all'){
            element.style.display = 'none';
        }
        else{
            element.style.display = 'inline-block';  
        }
        i++;
    });
}
var click = false;
function likecounter(element){
    //console.log(element);
    var parent = element.parentNode.parentNode.parentNode;
    var likes = parent.getElementsByClassName("likes")[0];
    if(click == false ){
    var likecounter = Number(likes.innerHTML);
    likecounter = likecounter + 1;
    likes.innerHTML = likecounter;
    element.parentNode.style.background = 'green';
    click = true;
}
else{
    var likecounter = Number(likes.innerHTML);
    likecounter = likecounter - 1;
    likes.innerHTML = likecounter;
    click = false;
    element.parentNode.style.background = 'white';
    //console.log(parent);
}
}
function columns(){
    var columns = document.getElementById('numberOfColumns').value;
    const cards = document.querySelectorAll('.card');
    var container = document.getElementById('card-container');
    cards.forEach(element => {
        if(columns == 1)  container.style.width = '20%';
        if(columns == 2)  container.style.width = '650px';
        if(columns == 3)  container.style.width = '980px';  
        if(columns == 4)  container.style.width = '1350px';
        if(columns == 5)  container.style.width = '1700px';
        if(columns == 'dynamic') container.style.width = '100%';
   });

}