export class Log {

	static time(name, operation) {
		console.time(name)
		operation()
		console.timeEnd(name)
	}
}