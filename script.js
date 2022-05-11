//Current lusing longitude and latitude 
//Numebr and name of people unboard 
// breif histiroy 
// purpose 
//what it really is... link to wikipedia
// killler background  

function reFetch(){
  let fetchLatitude =  new Promise ((resolve,reject)=>{
  fetch('http://api.open-notify.org/iss-now.json')
  .then(resp=> resp.json())
  .then(resp=>resolve(resp.iss_position.latitude))
})
    .then(resp=>{
const lan = document.getElementsByClassName('location--lat')[0];
let lanValue = resp 
lan.innerText = `Latitude: ${lanValue}`
  })

  let fetchLongitude=  new Promise ((resolve,reject)=>{
  fetch('http://api.open-notify.org/iss-now.json')
  .then(resp=> resp.json())
  .then(resp=>resolve(resp.iss_position.longitude))
})
    .then(resp=>{
const lon = document.getElementsByClassName('location--lon')[0];
let lonValue = resp 
lon.innerText = `Longitude: ${lonValue}`
  })    
}

// fetches the name of the people unboard 
const fetchPeople = new Promise ((resolve, reject)=>{
  fetch('http://api.open-notify.org/astros.json')
.then(resp=> resp.json())
.then(resp=>{
let response =  resp.people
let people = response.map(peo=> peo.name );
 resolve(people.toString())
})}).then(resp=>slideContent[3].content  = resp )
 .catch((reason) => {
    if(reason === -999) {
      console.error("Had previously handled error");
    }
    else {
      console.error(`Trouble with promiseGetWord(): ${reason}`);
    }})

//this is the slides content
const slideContent =[
{
	'header': 'History',
   'content': `In the early 1980s, NASA planned to launch a modular space station called Freedom as a counterpart to the Soviet Salyut and Mir space stations. 
      ~Wikipedia`,
    'link': "https://en.wikipedia.org/wiki/International_Space_Station#History"
},
{
	'header': 'What is the ISS',
   'content': `The International Space Station (ISS) is a modular space station  (habitable artificial satellite) in low Earth orbit.
      ~Wikipedia `,
 'link': "https://en.wikipedia.org/wiki/International_Space_Station"
},
{
	'header': 'Purpose',
   'content': `The ISS was originally intended to be a laboratory, observatory, and factory while providing transportation, maintenance, and a low Earth orbit staging base for possible future missions to the Moon, Mars, and asteroids
 ~Wikipedia
   `,
   'link': "https://en.wikipedia.org/wiki/International_Space_Station#Purpose"
},
{
	'header': 'Onboard',
   'content': `Loading...`,
   'link': ''
}
]

//genereates the link to wikipedia
function createLink(target){
if(target.length > 0){
	let link = document.createElement('a');
link.setAttribute('href', target);
link.innerText = 'Read more'
const content = document.getElementById('slide--content');
content.appendChild(link);
}
}

// changes the content of the slide 
let i = 1;
function change(){
if(i<slideContent.length){
	const content = document.getElementById('slide--content');
	const header = document.getElementById('slide--header');
   content.innerText = slideContent[i].content
   header.innerText = slideContent[i].header
   createLink(slideContent[i].link);
   i++
}else{
	const content = document.getElementById('slide--content');
	const header = document.getElementById('slide--header');
	i = 0;
   content.innerText = slideContent[i].content
   header.innerText = slideContent[i].header
   createLink(slideContent[i].link);
   i++
}
}

//the fade in and fade out animations 
const slide = document.getElementById('slide')
function animate(){
	slide.id == 'slide' ? slide.id = 'slide--out' : slide.id = 'slide'
}
setInterval(reFetch,2000);
setInterval(animate,8000);
setInterval(change,16000);