this.addEventListener('install', async (event) => {
	console.log('install', CACHE_NAME)
})

this.addEventListener('activate', async (event) => {
	console.log('activate', CACHE_NAME)
});

this.addEventListener('fetch', event => {
	//Только с сервера, только GET, и без -
	if (event.request.method !== 'GET') return
	let url = new URL(event.request.url)
	if (url.origin !== location.origin) return
	//if (/^\/-/.test(url.pathname)) return
	if (/[&\?]t=\d+/.test(url.search)) return

	//let r = url.pathname.match(/\.(\w+$)/)
	/*
		Пользователь меняет: корзину, личный кабинет - no-store)
		Администратор меняет: json, php - not-modified)
		Программист меняет: index.tpl, js, css и / - public с версией в адресе
		Никто не меняет: jpg, png, gif ... - public без версии в адресе
	*/
	//if (r && !~['tpl','js','css'].indexOf(r[1].toLowerCase()) ) return
   	
	const {
		cache, credentials, headers, integrity, 
		method, redirect, referrer, referrerPolicy
	} = event.request

	let options = { 
		cache, credentials, headers, integrity, 
		method, redirect, referrer, referrerPolicy
	}

	url = event.request.url
	url = url + (~url.indexOf('?') ? '&' : '?') + 't=' + CACHE_NAME
	
	if (event.request.mode == 'no-cors') {
		mode = 'no-cors'	
	} else {
		mode = null
	}
	
	let request = new Request(url, options)

	//console.log(event.request.url, CACHE_NAME)

	event.respondWith(fetch(request))
});
