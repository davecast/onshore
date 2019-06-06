window.onload = function() {
	let $loading = document.querySelector('#loading')
	$loading.classList.add('loading--hidden')

	setTimeout(()=>{
		$loading.remove();
		init();
	},1000)
};