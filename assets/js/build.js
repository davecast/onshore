
function init () {

	/*Declare variables*/
	let $body = document.querySelector('body');
	let $burgueMenu = document.querySelector('.header__burguer');
	let captchaContact = false
	let captchaQuote = false
	let $sliders = document.querySelectorAll('.container--carousel');
	let $banner = document.getElementById('banner');
	let $services = document.getElementById('services');
	let $portfolio = document.getElementById('portfolio');
	let $about = document.getElementById('about');
	let $contact = document.getElementById('contact');
	let $selectFields = document.querySelectorAll('.form__field--select');
	let $slider = $('.slider');
	let $modalOpen = document.querySelectorAll('.modal__open');
	const header = document.getElementById('header');
	const $overlay = document.getElementById('overlay');
	const $modal = document.getElementById('modal');
	const $hideModal = document.getElementById('hide-modal');
	const $modalContent = document.getElementById('modal-content');
	const $modalSignin = document.getElementById('modal-signin');
	const $modalSignup = document.getElementById('modal-signup');

	/*Functions*/
	function isEmpty(obj) {
	    for(var key in obj) {
	        if(obj.hasOwnProperty(key))
	            return false;
	    }
	    return true;
	}

	function scrollTo() {
		const links = document.querySelectorAll('.header__link');
		links.forEach(each => (each.onclick = scrollAnchors));
	}

	function scrollAnchors(e, respond = null) {
		const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
		e.preventDefault();
		var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
		const targetAnchor = document.querySelector(targetID);
		if (!targetAnchor) return;
		const originalTop = distanceToTop(targetAnchor);
		window.scrollBy({ top: originalTop - header.clientHeight, left: 0, behavior: 'smooth' });
		const checkIfDone = setInterval(function() {
			const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
			if (distanceToTop(targetAnchor) === 0 || atBottom) {
				targetAnchor.tabIndex = '-1';
				targetAnchor.focus();
				window.history.pushState('', '', targetID);
				clearInterval(checkIfDone);
			}
		}, 100);
	}

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

	function callCarousels () {
		$sliders.forEach((element, index) => {
			element.slider = new Person(element);
			element.slider.initial();
			
			element.querySelector('.carousel__arrow--left').addEventListener('click', (e) => {
				if (element.slider.action) {
					element.slider.moverI();
					element.slider.action = false;
				}
			});

			element.querySelector('.carousel__arrow--right').addEventListener('click', (e) => {
				if (element.slider.action) {
					element.slider.moverD();
					element.slider.action = false;
				}
			});
		});
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

	function callSelectBox () {
		$selectFields.forEach((selectField) => {
			selectField = new SelectField(selectField);
		});
	}

	function moveR (elem) {
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
	function moveL (elem) {

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

	function autoplay (elem) {
		let direction = elem.dataset.direction ? elem.dataset.direction : 'right'

		elem.sliderInterval = setInterval(function() {
			direction === 'left' ?
				moveL(elem)
			:
				moveR(elem)
		}, elem.dataset.sliderDelay)
	}
	
	function callSliders () {
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
	}

	async function getService(service) {
		let url = `${window.location.href}assets/services.json`;
	    const response = await fetch(url).then((res)=>{ return res.json()}).catch( e => e );
			    
	    let data = await response[service];

	    let template = await `
					<div class="modal__service">
						<div class="row">
							<div class="col--12 col--sm-12 col--md-12">
								<div class="modal__name__service">${data.name}</div>
								<figure>
									<img class="modal__img__service" src="assets/img/${data.image}" />
								</figure>
								<div class="modal__text__service m__b--x-2">${data.text}</div>
							</div>
						</div>
					</div>
				`;

		return template;
	}

	async function modalTemplate (template, content) {
		let htmlContent;

		switch(template) {
			case 'services':
				htmlContent = await getService(content.service);
				break;
			case 'portfolio':

				htmlContent = `<div class="modal__portfolio">
					<div class="row">
						<div class="col--12 col--sm-12 col--md-12">
							<figure>
								<img class="modal__img__service" src="assets/img/${content.image}" />
							</figure>
						</div>
					</div>
				</div>`;
				break;
			default:
				htmlContent = '';
		}

		const html = document.implementation.createHTMLDocument();

		html.body.innerHTML =  await htmlContent;

		return html.body.children[0];
	}

	async function showModal(data) {
		$overlay.classList.add('active')
		$modal.style.animation = 'modalIn .8s forwards'
		$body.classList.add('overflow-none')

		const $modalTemplate = await modalTemplate(data.template, data)

		$modalContent.innerHTML = $modalTemplate.outerHTML
	}

	function hideModal() {
		$modal.style.animation = 'modalOut .8s forwards';
		$body.classList.remove('overflow-none');
		$overlay.classList.add('fadeIn--overlay');
		setTimeout(()=>{
			$overlay.classList.remove('active', 'fadeIn--overlay')
		}, 800)
	}

	function callModals () {
		$modalOpen.forEach((btnModal) => {
			btnModal.addEventListener('click', (e) => {
				e.preventDefault()
				if (isEmpty(e.target.dataset)) {
					showModal(e.target.parentElement.dataset)
				} else {
					showModal(e.target.dataset)
				}
			})
		})
	}

	function Forms (element) {
		this.element = element;
		this.sendBtn = this.element.querySelector('button');
		this.sendBtn.addEventListener('click', (e) => {
			e.preventDefault();
			this.send();
		})
		this.element.addEventListener('submit', (e) => {
			e.preventDefault();
			this.send();
		})
		this.getParent = function (input) {
			let parent;
			if ( input.parentElement.classList.contains('form__field--select') ) {
				parent = input.parentElement.parentElement;
			} else {
				parent = input.parentElement;
			}

			return parent
		}
		this.getMessageBox = function (parent) {
			return parent.querySelector('.form__field--message');
		}
		this.isEmpty = function (value) {
		    if (value == 'none') {
		        return true
		    }
		    return value === ''
		}
		this.validateField = function () {

		}
		this.evaluateField = function (formData) {
			for (let pair of formData.entries()) {
				if (pair[0] != 'g-recaptcha-response') {
					let $input = this.element.querySelector(`#${pair[0]}`);
					let $parent = this.getParent($input);
					let $message = this.getMessageBox($parent);
					if (this.isEmpty(pair[1])) {
						$parent.classList.add('form__field--error');
						$message.innerText = 'This field is required';
					}
				}	
			}
		}
		this.send = function () {
			let formData = new FormData(this.element)
			this.evaluateField(formData);
		}
	}
	function callForms () {
		let $forms = document.querySelectorAll('.form__object');

		$forms.forEach((form) => {
			form = new Forms(form);
		}) 
	}
	/*Windows Events*/
	window.onscroll = function() {
		onScrollAction()
	}

	/*Call functions*/

	scrollTo();
	callCarousels();
	callSelectBox();
	callSliders();
	callModals();
	callForms();
	/*Click Events*/

	$burgueMenu.addEventListener('click', (e) => {
		let $headerMenu = document.querySelector('.header__menu');
		$headerMenu.classList.toggle('header__menu--active');
	});
	
	$hideModal.addEventListener('click', (e) => {
		hideModal()
	})

}