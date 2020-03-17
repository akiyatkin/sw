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
	if (/^\/-/.test(url.pathname)) return
	let r = url.pathname.match(/\.(\w+$)/)
	//Для всех запросов js, tpl и css дбавляем t
	if (!r || !~['tpl','js','css', 'html'].indexOf(r[1].toLowerCase()) ) return
   	console.log(event.request.url, CACHE_NAME)
	url = event.request.url
	url = url + (~url.indexOf('?')? '&' : '?') + 't=' + CACHE_NAME
	let options = {}
	if (event.request.mode == 'no-cors') {
		options['mode'] = 'no-cors'	
	}
	let request = new Request(url, options)
	event.respondWith(fetch(request))
});
