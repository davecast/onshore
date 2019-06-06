
function init () {

	let $body = document.querySelector('body');
	let $burgueMenu = document.querySelector('.header__burguer');
	var $sliders = document.querySelectorAll('.container--carousel');

	window.onscroll = function() {
		onScrollAction()
	}

	var header = document.getElementById('header')

	let $banner = document.getElementById('banner')
	let $services = document.getElementById('services')
	let $portfolio = document.getElementById('portfolio')
	let $about = document.getElementById('about')
	let $contact = document.getElementById('contact')


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
	function onScrollAction () {
		
		if ( (window.pageYOffset > $banner.offsetTop - 150) && (window.pageYOffset < ($banner.offsetHeight + $banner.offsetTop - 150) ) ) {
			activeMenu('#banner')
		}
		else if ( (window.pageYOffset > $services.offsetTop - 150) && (window.pageYOffset < ($services.offsetHeight + $services.offsetTop - 150) ) ) {
			activeMenu('#services')
		} else if ( (window.pageYOffset > $portfolio.offsetTop - 150) && (window.pageYOffset < ($portfolio.offsetHeight + $portfolio.offsetTop - 150) ) ) {
			activeMenu('#portfolio')
		} else if ( (window.pageYOffset > $about.offsetTop - 150) && (window.pageYOffset < ($about.offsetHeight + $about.offsetTop - 150) ) ) {
			activeMenu('#about')
		} else if ( (window.pageYOffset > $contact.offsetTop - 150) && (window.pageYOffset < ($contact.offsetHeight + $contact.offsetTop - 150) ) ) {
			activeMenu('#contact')
		}
	}

	function activeMenu (id) {
		let $beforeElement = document.querySelector('.menu--active')
		if ($beforeElement) {
			$beforeElement.classList.remove('menu--active')
		}
		
		let $nextElement = document.querySelector(`a[href='${id}']`)
		$nextElement.classList.add('menu--active')
	}

	function Person(element) {
		
		this.element = element;
		this.action = true;
		this.textInitial = () => this.element.querySelector('.carousel__panel--center').dataset.text;
		
		this.initial = () => {
			this.insertBeforeElement();
		}
		this.moverI = () => {

			this.element.querySelector('.carousel').insertBefore(
				this.element.querySelector('.carousel .carousel__panel:last-child'),
				this.element.querySelector('.carousel .carousel__panel:first-child')
			);

			this.element.querySelector('.carousel .carousel__panel:first-child').classList.replace(
				'carousel__panel--right',
				'carousel__panel--left'
			);
			setTimeout(()=>{
				this.element.querySelector('.carousel__panel--inView.carousel__panel--right').classList.replace(
					'carousel__panel--inView',
					'carousel__panel--outView'
				);

				this.element.querySelector('.carousel .carousel__panel:first-child').nextElementSibling.classList.replace(
					'carousel__panel--left',
					'carousel__panel--center'
				);
				
				this.element.querySelector('.carousel .carousel__panel:first-child').nextElementSibling.nextElementSibling.classList.replace(
					'carousel__panel--center',
					'carousel__panel--right'
				);
				this.element.querySelector('.carousel .carousel__panel:first-child').classList.replace(
					'carousel__panel--outView',
					'carousel__panel--inView'
				);

			}, 100)

			setTimeout(()=>{
				this.action = true;
				console.log('verdadero')
			}, 650)

		};
		this.moverD = () => {

			this.element.querySelector('.carousel .carousel__panel:first-child').classList.replace(
				'carousel__panel--inView',
				'carousel__panel--outView'
			);
			
			this.element.querySelector('.carousel .carousel__panel:first-child').nextElementSibling.classList.replace(
				'carousel__panel--center',
				'carousel__panel--left'
			);
			
			setTimeout(()=>{
				
				this.element.querySelector('.carousel .carousel__panel:first-child').classList.replace(
					'carousel__panel--left', 
					'carousel__panel--right'
				);
				
				this.insertAfter(
					this.element.querySelector('.carousel .carousel__panel:last-child'),
					this.element.querySelector('.carousel .carousel__panel:first-child')
				);
		
			}, 600)
			
			this.element.querySelector('.carousel__panel--inView.carousel__panel--right').classList.replace(
				'carousel__panel--right', 
				'carousel__panel--center'
			);

			this.element.querySelector('.carousel__panel--center').nextElementSibling.classList.replace(
				'carousel__panel--outView',
				'carousel__panel--inView'
			);
			this.element.querySelector('.carousel__panel--center').nextElementSibling.classList.add(
				'carousel__panel--right'
			);
				
			setTimeout(()=>{
				this.action = true;
				console.log('verdadero')
			}, 650)

		};
		this.insertBeforeElement = () => {
			this.element.querySelector('.carousel').insertBefore(
				this.element.querySelector('.carousel .carousel__panel:last-child'),
				this.element.querySelector('.carousel .carousel__panel:first-child')
			);

			this.element.querySelector('.carousel .carousel__panel:first-child').classList.add('carousel__panel--left', 'carousel__panel--inView');
			this.element.querySelector('.carousel .carousel__panel:first-child').classList.remove('carousel__panel--right', 'carousel__panel--outView');
		}
		this.insertAfter = (e, i) => {
			if(e.nextSibling){ 
	            e.parentNode.insertBefore(i,e.nextSibling); 
	        } else { 
	            e.parentNode.appendChild(i); 
	        }
		}
	}

	$sliders.forEach((element, index) => {
		element.slider = new Person(element);
		element.slider.initial();
		
		element.querySelector('.carousel__arrow--left').addEventListener('click', (e) => {
			if (element.slider.action) {

				element.slider.moverI();
				console.log('falso')
				element.slider.action = false;
			}
		});

		element.querySelector('.carousel__arrow--right').addEventListener('click', (e) => {
			if (element.slider.action) {
				element.slider.moverD();
				console.log('falso')
				element.slider.action = false;
			}
		});
	});
	
	$burgueMenu.addEventListener('click', (e) => {
		let $headerMenu = document.querySelector('.header__menu');
		$headerMenu.classList.toggle('header__menu--active');
	});

	let $selectFields = document.querySelectorAll('.form__field--select');
	
	$selectFields.forEach((selectField) => {
		selectField = new SelectField(selectField);
	});

	let $slider = $('.slider')

	const moveR = (elem) => {
		let $sliderActiveBefore = $(elem).find('.slider__container--active').get(0);
		$($sliderActiveBefore).addClass("slider__container--hidden").delay(600).queue(function(next){
		    $(this).removeClass("slider__container--hidden slider__container--active");
		    next();
		});
		
		let $sliderItem = $(elem).children('.slider__item').get(2);
		
		let $sliderContainer = $($sliderItem).find('.slider__container').get(0);
		
		$($sliderContainer).delay(600).queue(function(next){
		    $(this).addClass('slider__container--active')
		    next();
		});

		$(elem).animate({
			marginLeft: `-${200}%`
		},1000, "linear", function() {
			$(this.firstElementChild).insertAfter(this.lastElementChild)
			$(this).css('margin-left', `-${100}%`)
		})

	}
	const moveL = (elem) => {

		let $sliderActiveBefore = $(elem).find('.slider__container--active').get(0);
		$($sliderActiveBefore).addClass("slider__container--hidden").delay(600).queue(function(next){
		    $(this).removeClass("slider__container--hidden slider__container--active");
		    next();
		});

		let $sliderItem = $(elem).children('.slider__item').get(0);
		let $sliderContainer = $($sliderItem).find('.slider__container').get(0);

		$($sliderContainer).delay(600).queue(function(next){
		    $(this).addClass('slider__container--active')
		    next();
		});


		$(elem).animate({
			marginLeft:0
		} ,1200, "linear", function(){
			$(this.lastElementChild).insertBefore(this.firstElementChild)
			$(this).css('margin-left', `-${100}%`)
		});
	}

	const autoplay = (elem) => {
		let direction = elem.dataset.direction ? elem.dataset.direction : 'right'

		elem.sliderInterval = setInterval(function() {
			direction === 'left' ?
				moveL(elem)
			:
				moveR(elem)
		}, elem.dataset.sliderDelay)
	}
	
	for (let i = 0; i < $slider.length; i++) {
		let $slider__box = $($slider[i]).children('.slider__box')[0]
		let $btns_left = $($slider[i]).children('.slider__btn--left')[0]
		let $btns_right = $($slider[i]).children('.slider__btn--right')[0]

		$($slider__box).css("width", `${$slider__box.childElementCount*100}%`)
		$($slider__box.lastElementChild).insertBefore($slider__box.firstElementChild)
		$($slider__box).css("margin-left", `-${100}%`)

		autoplay($slider__box)

		$($btns_left).on('click', () => {
			moveL($slider__box)
			clearInterval($slider__box.sliderInterval)
			autoplay($slider__box)
		})

		$($btns_right).on('click', () => {
			moveR($slider__box)
			clearInterval($slider__box.sliderInterval)
			autoplay($slider__box)
		})
	}

	function SelectField (select) {
		this.element = select;
		this.empty = true;
		this.open = false;
		this.field = this.element.querySelector('input');
		this.text = this.element.querySelector('.form__field--select--text');
		this.option = this.element.querySelector('.form__field--options');
		this.options = this.option.querySelectorAll('li');
		this.options.forEach((option) => {
			option.addEventListener('click', (e) => {
				this.field.value = e.target.dataset.value;
				this.text.innerText = option.innerText;
				this.empty = false;
				this.closeOptions();
			})
		})
		this.btn = this.element.querySelector('.form__field--chevron');
		this.btnIcon = this.btn.querySelector('i');
		this.btn.addEventListener('click', (e) => {
			this.closeOptions();
		});
		this.closeOptions = function () {
			if (!this.empty) {
				this.btnIcon.classList.toggle('fa-chevron-up')
				this.btnIcon.classList.toggle('fa-times')
				this.element.classList.toggle('form__field--select--active');
				this.element.classList.toggle('form__field--select--option');
			} else {
				this.btnIcon.classList.toggle('fa-chevron-down');
				this.btnIcon.classList.toggle('fa-chevron-up');
				this.element.classList.toggle('form__field--select--active');
			}
			
		}
	}
}

