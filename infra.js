import AccessData from '/-access/'

if (navigator.serviceWorker) {
	navigator.serviceWorker.register('/-sw/?t', { scope:'/' });
	navigator.serviceWorker.addEventListener('message', event => {
		console.log('New version is ready. Reload please.', event.data)
		location.reload()
    })
	navigator.serviceWorker.controller.postMessage({
		ADMIN_TIME: AccessData.time, 
		UPDATE_TIME: AccessData.update
	})
}