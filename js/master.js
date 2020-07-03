// Check Color Local Storage
let storageColor = localStorage.getItem('option_color');


if(storageColor !== null) {
  document.documentElement.style.setProperty('--main-color',storageColor);
  
  // Remove active class from all elements
  document.querySelectorAll('.colors-list li').forEach(ele => {
    ele.classList.remove('active');
    
    // Add active class to checked element
    if(ele.dataset.color === storageColor) {
      ele.classList.add('active')
    }
  })
}

// Toggle Settings
document.querySelector('.toggle-settings').onclick = function() {
  // toggle sidebar Settings
  document.querySelector('.toggle-settings .fa-gear').classList.toggle('fa-spin');
  document.querySelector('.settings-box').classList.toggle('open');
}

// Switch Color
let colorsLi = document.querySelectorAll('.colors-list li')

colorsLi.forEach(li => {
  li.addEventListener('click', (e)=>{
    document.documentElement.style.setProperty('--main-color',e.target.dataset.color)
    
    // Set clicked color to option_color Storage 
    localStorage.setItem('option_color', e.target.dataset.color)

    // Remove active class from elements
    e.target.parentElement.querySelectorAll('.active').forEach(ele => {
      ele.classList.remove('active');
    })
    
    
    // Add active class from elements
    e.target.classList.add('active')
    
    // console.log(e.target.parentElement);
  })
})


let backgroundOption = true
// variable to control Interval 
let backgroundInterval;
let storageRandomImg = localStorage.getItem('random_img');

if(storageRandomImg !== null){
  
  if (storageRandomImg == 'true') {
    backgroundOption = true;  
  } else {
    backgroundOption = false;
  }

  document.querySelectorAll('.random-background span').forEach(el => {
    el.classList.remove('active')
  });

  if(storageRandomImg === 'true') {
    document.querySelector('.random-background .yes').classList.add('active')
  } else {
    document.querySelector('.random-background .no').classList.add('active')
    
  }
}


// Switch Random Background 
let randomBackEle = document.querySelectorAll('.random-background span')

// Loop all span items
randomBackEle.forEach(li => {
  li.addEventListener('click', (e)=>{
    // Remove active class from elements
    e.target.parentElement.querySelectorAll('.active').forEach(ele => {
      ele.classList.remove('active');
    })
    
    // Add active class from elements
    e.target.classList.add('active');
    if (e.target.dataset.background === 'yes') {
      backgroundOption = true;
      randomizeImg();
      localStorage.setItem('random_img',true);
    }else{
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem('random_img',false);

    }  
  })

})


// Switch Background Image
let landingPage = document.querySelector('.landing-page');
let imgsArray = ['pizza1','pizza2','pizza3','pizza4','pizza5'];

function randomizeImg(){

  if(backgroundOption === true){

    backgroundInterval = setInterval(() => {
      let randomImg = Math.floor(Math.random() * imgsArray.length)
      
      landingPage.style.backgroundImage = `url(images/${imgsArray[randomImg]}.jpg)`;
      landingPage.style.transition = 'all .3s'
    }, 5000);
  }
}
randomizeImg()