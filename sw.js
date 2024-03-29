
this.addEventListener('install', event => {
	console.log('SW install', { ADMIN_TIME, UPDATE_TIME })
  	this.skipWaiting();
})

this.addEventListener('activate', event => {
	console.log('SW activate', { ADMIN_TIME, UPDATE_TIME })
})

this.addEventListener('message', event => {
	//10 нужна была чтобы не было постоянной перезагрузки страницы если сайт в отладочном режиме и время админа постоянно меняется
	//if (ADMIN_TIME + 10 >= event.data.ADMIN_TIME && UPDATE_TIME + 10 >= event.data.UPDATE_TIME) return
	if (ADMIN_TIME >= event.data.ADMIN_TIME && UPDATE_TIME >= event.data.UPDATE_TIME) return
	ADMIN_TIME = event.data.ADMIN_TIME
	UPDATE_TIME = event.data.UPDATE_TIME
	event.waitUntil(this.clients.matchAll().then(clientList => {
		clientList.forEach(client => {
			client.postMessage(event.data)
		})
	}))
})

this.addEventListener('fetch', event => {
	//Только с сервера, только GET, и без -
	if (event.request.method !== 'GET') return
	
	let url = new URL(event.request.url)
	
	//??
	if (url.origin !== location.origin) return
	
	let dyn = false
	let ext = url.pathname.match(/\.(\w+$)/)
	if (/sw=public/.test(url.search)) {
		dyn = false
	} else if (!ext || ext == 'php' || /.*\/$/.test(url.pathname)) {
		dyn = true
	}
	//Дефаулт public выставляется только для динамики системы
	if (ext == 'php' && !/^\/-/.test(url.pathname)) return

	//Если есть метка t, то пропускаем
	if (/[&\?]t[=&]/.test(url.search)) return
	if (/[&\?]t$/.test(url.search)) return


	const {
		credentials, headers, integrity, 
		method, redirect, referrer, referrerPolicy
	} = event.request

	let cache = 'default'

	let options = { 
		cache, credentials, headers, integrity, 
		method, redirect, referrer, referrerPolicy
	}

	url = event.request.url
	url = url + (~url.indexOf('?') ? '&' : '?') + 't='

	if (dyn || event.request.mode == 'navigate') {
		url += ADMIN_TIME
	} else {
		url += UPDATE_TIME	
	}
	
	
	if (event.request.mode == 'no-cors') {
		mode = 'no-cors'	
	} else {
		mode = null
	}
	
	let request = new Request(url, options)

	//console.log(event.request.url, UPDATE_TIME)
	let responce = fetch(request)
	event.respondWith(responce)
});

