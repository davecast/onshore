
async function init () {

	/*Declare variables*/
	let $body = document.querySelector('body');
	let $burgueMenu = document.querySelector('.header__burguer');
	let captchaContact = false
	let captchaQuote = false
	let $sliders = document.querySelectorAll('.container--carousel');
	let $banner = document.getElementById('banner');
	let $services = document.getElementById('services');
	let $portfolio = document.getElementById('portfolio');
	let $estimate = document.getElementById('estimate');
	let $about = document.getElementById('about');
	let $contact = document.getElementById('contact');
	let $selectFields = document.querySelectorAll('.form__field--select');
	let $slider = document.querySelectorAll('.slider');
	let $modalOpen = document.querySelectorAll('.modal__open');
	let $message__box = document.getElementById('message__box');
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
		const links = document.querySelectorAll('.link__to__go');
		links.forEach( (each) => {
			each.onclick = scrollAnchors;	
		});
	}



	function scrollAnchors(e) {
		e.preventDefault();
		const distanceToTop = (el) => {
			return Math.floor(el.getBoundingClientRect().top);
		};
		let targetID = (this.getAttribute('href')) ? this.getAttribute('href') : `#${this.dataset.target}`;
		const targetAnchor = document.querySelector(targetID);
		if (!targetAnchor) return;
		const originalTop = distanceToTop(targetAnchor);
		window.scrollBy({ 
			top: originalTop - header.clientHeight, 
			left: 0, 
			behavior: 'smooth' 
		});
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

	function addMessage (content, type='normal') {

		let $elem = document.createElement('div');
		let $elemChild = document.createElement('div');

		if (type === 'sussess') {
			$elem.classList.add('message', 'message--sussess');
		} else if(type === 'warning') {
			$elem.classList.add('message', 'message--warning');
		} else if(type === 'danger') {
			$elem.classList.add('message', 'message--danger');
		}

		$elemChild.classList.add('message__text')
		$elemChild.innerText = content
		$elem.appendChild($elemChild);

		$elem.addEventListener('click', function (e) {
			this.classList.add('message--hidden')
			setTimeout(()=>{
				this.remove();
			},350)
		})

		$message__box.appendChild($elem)

		setTimeout(()=>{
			$elem.classList.add('message--active');
		},50)

		setTimeout(()=>{
			$elem.classList.add('message--hidden');
		},5000)

		setTimeout(()=>{
			$elem.remove();
		},5450)
	}
	
	function onScrollAction () {
		
		if ( (window.pageYOffset > $banner.offsetTop - 150) && (window.pageYOffset < ($banner.offsetHeight + $banner.offsetTop - 150) ) ) {
			activeMenu('#banner');
		}
		else if ( (window.pageYOffset > $services.offsetTop - 150) && (window.pageYOffset < ($services.offsetHeight + $services.offsetTop - 150) ) ) {
			activeMenu('#services');
		} else if ( (window.pageYOffset > $portfolio.offsetTop - 150) && (window.pageYOffset < ($portfolio.offsetHeight + $portfolio.offsetTop - 150) ) ) {
			activeMenu('#portfolio');
		} else if ( (window.pageYOffset > $about.offsetTop - 150) && (window.pageYOffset < ($about.offsetHeight + $about.offsetTop - 150) ) ) {
			activeMenu('#about');
		} else if ( (window.pageYOffset > $contact.offsetTop - 150) && (window.pageYOffset < ($contact.offsetHeight + $contact.offsetTop - 150) ) ) {
			activeMenu('#contact');
		} else if ( (window.pageYOffset > $estimate.offsetTop - 150) && (window.pageYOffset < ($estimate.offsetHeight + $estimate.offsetTop - 150) ) ) {
			activeMenu('#estimate');
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

	function Slider (elem) {
        this.intervalTime = null;
        this.element = elem;
        this.box =  this.element.querySelector('.slider__box');
        this.boxActive = this.box.querySelector('.slider__container--active'); 
        this.isRolling = false;
        this.isInView =  false;
        this.delay = this.box.dataset.sliderDelay;
        this.direction = this.box.dataset.direction ? this.box.dataset.direction : 'right';
        this.btn_left = this.element.querySelector('.slider__btn--left');
        this.btn_left.addEventListener('click', (e) => {
            if (!this.isRolling) {
                this.isRolling = true;
                this.leftMove();
                this.stopPlay();
                this.autoPlay(); 
            }
        })
        this.btn_right = this.element.querySelector('.slider__btn--right');
        this.btn_right.addEventListener('click', (e) => {
            if (!this.isRolling) {
                this.isRolling = true;
                this.rightMove();
                this.stopPlay();
                this.autoPlay();
            }
        })
        this.insertAfter = function (elemBase, elemAfter) {
            if(elemBase.nextSibling){ 
                elemBase.parentNode.insertBefore(elemAfter,elemBase.nextSibling); 
            } else { 
                elemBase.parentNode.appendChild(elemAfter); 
            }
        }
        this.inViewPort = function () {
            var bounding = this.element.getBoundingClientRect();
            return (
                bounding.top >= 0 &&
                bounding.left >= 0 &&
                bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        this.leftMove = function () {
            this.boxActive.classList.add('slider__container--hidden');
            setTimeout((e) => {
                this.boxActive.classList.remove('slider__container--hidden', 'slider__container--active');
                this.boxActive = this.boxActive.parentElement.previousElementSibling.querySelector('.slider__container');
                this.boxActive.classList.add('slider__container--active');
                this.box.insertBefore(
                    this.box.lastElementChild,
                    this.box.firstElementChild
                );
                this.box.style.transition = "none";
                this.box.style.marginLeft =  `-100%`;
                this.isRolling = false;
            }, 600);
            this.box.style.transition = "all .6s ease-in-out";
            this.box.style.marginLeft =  `0`;
        }
        this.rightMove = function () {
            this.boxActive.classList.add('slider__container--hidden');
            setTimeout((e) => {
                this.boxActive.classList.remove('slider__container--hidden', 'slider__container--active');
                this.boxActive = this.boxActive.parentElement.nextElementSibling.querySelector('.slider__container');
                this.boxActive.classList.add('slider__container--active');
                this.insertAfter(
                    this.box.lastElementChild,
                    this.box.firstElementChild
                );
                this.box.style.transition = "none";
                this.box.style.marginLeft =  `-100%`;
                this.isRolling = false;
            }, 600);
            this.box.style.transition = "all .6s ease-in-out";
            this.box.style.marginLeft =  `-200%`;
        }
        this.stopPlay = function () {
            clearInterval(this.intervalTime);
        }
        this.autoPlay = function () {
            this.intervalTime = setInterval(() => {
                this.direction === 'left' ? this.leftMove() : this.rightMove();
            }, this.delay)
        }
        this.init = function () {
            this.box.style.width =  `${this.box.children.length*100}%`;
            this.box.insertBefore(
                 this.box.lastElementChild,
                 this.box.firstElementChild
            );
            this.box.style.marginLeft =  `-100%`;
        }
        window.addEventListener('scroll', (event) => {
            if (this.inViewPort()) {
                if (!this.isInView) {
                    this.isInView = true;
                    this.autoPlay();
                }
            } else {
                this.isInView = false;
                this.stopPlay()
            }
        }, false);
        window.addEventListener('load', (event) => {
            if (this.inViewPort()) {
                if (!this.isInView) {
                    this.isInView = true;
                    this.autoPlay();
                }
            } else {
                this.isInView = true;
                this.stopPlay()
            }
        }, false);
    }

    function callSliders () {
        $slider.forEach((slider)=>{
            slider.sld = new Slider(slider);
            slider.sld.init();
        })
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
	function delay(milliseconds) {
	  return function(result) {
	    return new Promise(function(resolve, reject) {
	      setTimeout(function() {
	        resolve(result);
	      }, milliseconds);
	    });
	  };
	}
	function Forms (element) {
		this.element = element;
		this.type = this.element.dataset.typeForm;
		this.error = [];
		this.sending = false;
		this.sendBtn = this.element.querySelector('button');
		this.sendBtnText = this.sendBtn.querySelector('span');
		this.sendBtn.addEventListener('click', (e) => {
			e.preventDefault();
			if (!this.sending) {
				this.send();	
			}
		})
		this.element.addEventListener('submit', (e) => {
			e.preventDefault();
			if (!this.sending) {
				this.send();	
			}
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
		this.validateField = function (typeValidate, value) {
			let regex, response;

    		switch (typeValidate) {
    			case 'text':
		            regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/i
		            response = {
		                validation: regex.test(value),
		                message: 'Only letters'
		            }
		            if(regex.test(value) && value.length <= 3) {
		                response.validation = false
		                response.message = 'First name must be longer to 3 characters'
		            }
	            	return response
	            case 'comment':
		            regex = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\.\, ]+$/i
		            response = {
		                validation: regex.test(value),
		                message: 'Only (. or ,) are allowed as special characters'
		            }
		            /* Reparar esto agregar espacios en blanco */
		            if(regex.test(value) && value.length <= 25) {
		                response.validation = false
		                response.message = 'The description must have more than 25 characters'
		            }
		            if(regex.test(value) && value.length > 140) {
		                response.validation = false
		                response.message = 'The description must have more than 140 characters'
		            }
		            return response
	            case 'address':
		            regex = /^[-.?!,;:()# A-Za-z0-9]*$/i
		            response = {
		                validation: regex.test(value),
		                message: 'Only this special char -.?!,;:()#.'
		            }
		            /* Reparar esto agregar espacios en blanco */
		            if(regex.test(value) && value.length <= 10) {
		                response.validation = false
		                response.message = 'The description must have more than 10 characters'
		            }
		            if(regex.test(value) && value.length > 140) {
		                response.validation = false
		                response.message = 'The description must have more than 140 characters'
		            }
		            return response
		        case 'email':
		            regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
		            response = {
		                validation: regex.test(value),
		                message: 'Invalid format, try with name@host.com'
		            }
		            return response
		        case 'phone':
		            regex = /^[-+# 0-9]*$/i
		            response = {
		                validation: regex.test(value),
		                message: 'Invalid phone number.'
		            }
		            return response
		        case 'hidden':
		            response = {
		                validation: true,
		                message: ''
		            }
		            return response
		        default:
		            return false
		    }
		}
		this.evaluateField = async function (formData) {
			this.error = [];
			for (let pair of formData.entries()) {
				if (pair[0] != 'g-recaptcha-response') {
					let $input = this.element.querySelector(`#${pair[0]}`);
					let $parent = this.getParent($input);
					let $message = this.getMessageBox($parent);
					if (this.isEmpty(pair[1])) {
						$parent.classList.add('form__field--error');
						$message.innerText = 'This field is required';
						this.error.push(pair[0])
					} else {
						$parent.classList.remove('form__field--error');
						$message.innerText = '';
						
						let isValid = this.validateField($input.dataset.validate, pair[1] );

						if (isValid.validation) {
							$parent.classList.remove('form__field--error');
							$message.innerText = "";
						} else {
							this.error.push(pair[0])
							$parent.classList.add('form__field--error');
							$message.innerText = isValid.message;
						}

					}
				}	
			}

			if (this.error.length == 0 ) {
				this.sendBtnText.innerText = "LOADING"
				this.sending = true;

				let response = await this.postForm(
					`http://localhost/onshoreconnect/add/add.php?type=${this.type}`, 
					new FormData(this.element));
				console.log(response)
				if (await response) {
					if (!response.error) {
                        this.element.classList.add('form__hidden');
                        this.element.nextElementSibling.classList.add('form__send__message--active');
                        this.element.nextElementSibling.innerHTML = this.sendMessage(this.type, response.data);                          
                    } else {
                        addMessage('Upss.. Some error on database', 'danger')
                    }
				}
                
			}
		}
		this.postForm = async function (url, data) {
			params = {
		        method: 'POST',
		        body: data   
		    };

		    var request = new Request( url, params );
		 
		    let respose = await fetch( request ).then( r => r.json() )
		    .then( data => {
		        return data
		    })
		    .catch( e => e );

		    return respose
			/*return delay(3000)(data).then(function(result) {
			  return {
			  	"error": false,
			  	"data": {
			  		"first_name":"david",
			  		"last_name":"castillo"
			  	}
			  }
			});*/
		}
		this.sendMessage = function (type, data) {
    		switch (type) {
    			case 'contact':
	            	return `<p>Hi <span>${data.first_name} ${data.last_name}</span>, We will be in touch soon.</p>`;
	            case 'estimate':
		            return `<p>Hi <span>${data.first_name} ${data.last_name}</span> your quote has be send.</p>`;
		        default:
		            return false
		    }
		}
		this.send = async function () {
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