if (navigator.serviceWorker) {
	window.addEventListener('load', async () => {
		let worker = await navigator.serviceWorker.register('/-sw',{ scope:'/' });
	})
}