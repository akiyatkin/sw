import AccessData from '/-access/'

if (navigator.serviceWorker) {

	navigator.serviceWorker.register('/-sw/?t', { scope:'/' });

	navigator.serviceWorker.addEventListener('message', event => {
		//Срабатывает только если было обновление, чтобы точно не было кэша нужно перезагрузить страницу
		//После этого момента запросы уже с новым ключём, может быть наложение двух версий
		console.log('New version is ready. Reload please.', event.data.ADMIN_TIME)
    })

    if (navigator.serviceWorker.controller) {
		navigator.serviceWorker.controller.postMessage({
			ADMIN_TIME: AccessData.time, 
			UPDATE_TIME: AccessData.update
		})
	}
}