import AccessData from '/-access/'

if (navigator.serviceWorker) {
	navigator.serviceWorker.register('/-sw/?t&v=2', { scope:'/' });
	navigator.serviceWorker.addEventListener('message', event => {
		console.log('New version is ready. Reload please.', event.data)
		//location.reload()
    })
	if (navigator.serviceWorker.controller) { //В первый раз данные придут с кодом воркера
		navigator.serviceWorker.controller.postMessage({
			ADMIN_TIME: AccessData.time, 
			UPDATE_TIME: AccessData.update
		})
	}
}