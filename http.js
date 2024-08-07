const { CompanionHTTPRequest, CompanionHTTPResponse } = require('@companion-module/base')
//const { Parser } = require('@json2csv/plainjs')

const defaultHTTPRequest = () => {
	return { method: 'GET', path: '', headers: {}, baseUrl: '', hostname: '', ip: '', originalUrl: '', query: {} }
}

module.exports = function (self, request) {
	//console.log(request);
	console.log("Http request start");
	const response = {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ status: 200, message: 'Not Found !!' }),
	}

	response.body = JSON.stringify([self.scoreData.output])

	response.status = 200
	response.body = JSON.stringify(self.footballData)


	/*
	const getAll = () => {
		response.status = 200
		response.body = JSON.stringify(self.footballData)
	}

	const getHomePlayers = () => {
		getPlayers(self,self.footballData.home.Players)
	}

	const getVisitPlayers = () => {
		getPlayers(self,self.footballData.visit.Players)
	}

	const getHomeVsVisitors = () => {
			const reqFields = request.query?.fields || '2'
			generateCSV(self,self.footballData,response)
	}

	const getDrives = () => {
		getDrivesData(self,self.footballData.drives)
	}

	const endpoints = {
		GET: {
			homeplayers: getHomePlayers,
			visitplayers: getVisitPlayers,
			homevsvisitors:getHomeVsVisitors,
			drives:getDrives,

		},
	}

	

	const endpoint = request.path.replace('/', '').toLowerCase()

	if (endpoints[request.method][endpoint]){
		endpoints[request.method][endpoint]()
	} else {
		getAll()
	} 

	//console.log(response);
*/
	return response

/*
	function getPlayers(self,Players) {
		const format = request.query?.format || 'json'

		if (format === 'json') {
			response.body = JSON.stringify(generatePlayerData(Players))
			response.status = 200
		} else if (format === 'csv') {
			generateCSV(self,Players, response)
		} else {
			response.body = JSON.stringify({ status: 400, message: 'Unsupported format type' })
		}
	}

	function getDrivesData(self,drives) {
		
		const format = request.query?.format || 'json'

		if (format === 'json') {
			response.body = JSON.stringify(drives)
		} else if (format === 'csv') {
			generateCSV(self, drives, response)
		}
	}


	function generatePlayerData(players) {
		const data = []

		for (const key in players) {
			if (players.hasOwnProperty(key)) {
				data.push(players[key])
			}
		}
		return data
	}


	function generateCSV(self, data, response) {
		const fieldsSelector = {
			'1': self.config.fields1,
			'2': self.config.fields2,
			'3': self.config.fields3,
			'4': self.config.fields4,
			'5': self.config.fields5,
			'6': self.config.fields6,
			'7': self.config.fields7,
			'8': self.config.fields8,
			'9': self.config.fields9,
			'10': self.config.fields10,
			'dynamic':self.getVariableValue('dynamic_csv_fields'),
		}

		try {

			const reqFields = request.query?.fields || '0'
			// More info: https://github.com/juanjoDiaz/json2csv/blob/main/docs/advanced-options/data-selection.md
			const csvOpts = {
				header: true,
			}
			//console.log(fieldsSelector[reqFields])
			if (reqFields != '0') {
				csvOpts.fields = JSON.parse(fieldsSelector[reqFields])
			}
			//console.log(csvOpts)

			const csvParser = new Parser(csvOpts)
			const csvBody = csvParser.parse(data)
			response.body = csvBody

		} catch (err) {
			self.log('error', err)
			response.body = JSON.stringify({ status: 500, message: 'Error parsing spreadsheet JSON to CSV ' + err })
		}
		response.status = 200
	}
*/
}


