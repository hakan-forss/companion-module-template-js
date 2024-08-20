const { CompanionHTTPRequest, CompanionHTTPResponse } = require('@companion-module/base')
const { Parser } = require('@json2csv/plainjs')

const defaultHTTPRequest = () => {
	return { method: 'GET', path: '', headers: {}, baseUrl: '', hostname: '', ip: '', originalUrl: '', query: {} }
}

module.exports = function (self, request) {
	//console.log(request);
	//console.log("Http request start");
	const response = {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ status: 200, message: 'Not Found !!' }),
	}

	const suiteCGCSV = '[{"label":"hscore","value":"Home.Score"},{"label":"vscore","value":"Visit.Score"},{"label":"hnameshort","value":"Home.NameShort","default":"HOM"},{"label":"vnameshort","value":"Visit.NameShort","default":"VIS"},{"label":"hrecordoverall","value":"Home.RecordOverall","default":" "},{"label":"vrecordoverall","value":"Visit.RecordOverall","default":" "},{"label":"periodshort","value":"Game.PeriodShort","default":" "},{"label":"periodlong","value":"Game.PeriodLong","default":" "},{"label":"hlogo","value":"Home.Logo","default":" "},{"label":"vlogo","value":"Visit.Logo","default":" "},{"label":"toggle6image","value":"Settings.Toggles[6].Image","default":" "},{"label":"toggle2image","value":"Settings.Toggles[7].Image","default":" "},{"label":"counter8image1","value":"Settings.Toggles[3].Image","default":" "},{"label":"counter8image2","value":"Settings.Toggles[4].Image","default":" "},{"label":"counter8image3","value":"Settings.Toggles[5].Image","default":" "},{"label":"counter9image1","value":"Settings.Toggles[0].Image","default":" "},{"label":"counter9image2","value":"Settings.Toggles[1].Image","default":" "},{"label":"counter9image3","value":"Settings.Toggles[2].Image","default":" "},{"label":"companylogo","value":"Game.BroadcasterLogo","default":" "},{"label":"footballdownand","value":"Context[0].Value","default":" "} ]'

	outputData(self,self.scoreData)


	function outputData(self,data) {
		const format = request.query?.format || 'json'

		if (format === 'json') {
			response.body = JSON.stringify(data)
			response.status = 200
		} else if (format === 'csv') {
			generateCSV(self,data, response)
		} else {
			response.body = JSON.stringify({ status: 400, message: 'Unsupported format type' })
		}
	}


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

*/

	function generateCSV(self, data, response) {

		try {

			const reqFields = request.query?.fields || '0'
			// More info: https://github.com/juanjoDiaz/json2csv/blob/main/docs/advanced-options/data-selection.md
			const csvOpts = {
				header: true,
			}
			csvOpts.fields = JSON.parse(suiteCGCSV)
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


}


