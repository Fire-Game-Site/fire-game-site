import games from '../../public/games.json'

export async function GET() {
	let str = ''
	const predef = ['contact', '', 'updates']

	for (const i of predef) {
		str += `https://firegamesite.com/${i}\n`
	}
	for (const i in games) {
		str += `https://firegamesite.com/${i}\n`
	}

	return new Response(str)
}