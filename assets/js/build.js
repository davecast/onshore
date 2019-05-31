let $body = document.querySelector('body');



	var sliders = document.querySelectorAll('.container--carousel');

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

sliders.forEach((element, index) => {
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
	
