"use strict"

const Smooth = (e) => {
  e.preventDefault();

  $('html, body').animate({
      scrollTop: $(e.target.hash ? e.target.hash : e.target.dataset.link ).offset().top - 60
  }, 600);
}

$('.header__link').click((e)=>{
  	Smooth(e)
})

$('.link__page').click((e)=>{
	Smooth(e)
})