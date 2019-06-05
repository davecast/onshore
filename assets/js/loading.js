window.onload = function() {
	let $loading = document.querySelector('#loading')
	$loading.classList.add('loading--hidden')

	setTimeout(()=>{
		$loading.remove();
		console.log('Charge')
	},1000)
};