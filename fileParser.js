const fs = require('fs')
const { parseString } = require('xml2js')

module.exports = function (self) {
	// Parse XML string to JSON
	parseString(self.filecontents, (err, source) => {
		self.log('debug', 'Start Parsing')
		if (err) {
			console.error('Error parsing XML:', err)
			return
		}

//		imageSubsitution(self,source)
		if(self.config.localScoreing){

			source.output.hscore = self.getVariableValue('homescore')
			source.output.vscore = self.getVariableValue('visitscore')

		} else{
			console.log("Hepp")
			self.setVariableValues({
				'gameperiod': source.output.period,
				'homescore': source.output.hscore,
				'visitscore':source.output.vscore,
			})
		}


		//self.scoreData = source

		//console.log(source)

		//const destination = self.scoreData
		//console.log(data)

		self.log('debug', 'Parsing done')

		//UpdatingVariables(self,destination)

		//console.log(destination)
	})

	function imageSubsitution(self, source) {
		
		if (self.config.imageSubstitution) {
			source.output.vlogo = self.config.vlogo
			source.output.hlogo = self.config.hlogo
			source.output.companylogo = self.config.companylogo

			//Flag
			if (source.output.toggle2raw == 'true') {
				source.output.toggle2image = self.config.flagtrue
				source.output.toggle2imagealternate = self.config.flagfalse
			} else {
				source.output.toggle2image = self.config.flagfalse
				source.output.toggle2imagealternate = self.config.flagtrue
			}

			//Timeout
			if (source.output.toggle6raw == 'true') {
				source.output.toggle6image = self.config.timeouttrue
				source.output.toggle6imagealternate = self.config.timeoutfalse
			} else {
				source.output.toggle6image = self.config.timeoutfalse
				source.output.toggle6imagealternate = self.config.timeouttrue
			}

			/*
		toggleimage1
		toggleimage1alternate
		toggleimage2
		toggleimage2alternate
		toggleimage3
		toggleimage3alternate
		toggleimage4
		toggleimage4alternate
		toggleimage5
		toggleimage5alternate
		toggleimage6
		toggleimage6alternate
		toggleimage7
		toggleimage7alternate
		toggleimage8
		toggleimage8alternate
		toggleimage9
		toggleimage9alternate
		toggleimage10
		toggleimage10alternate
		toggleimage11
		toggleimage11alternate
		toggleimage12
		toggleimage12alternate
		toggleimage13
		toggleimage13alternate
		toggleimage14
		toggleimage14alternate
		toggleimage15
		toggleimage15alternate
		toggleimage16
		toggleimage16alternate
		toggleimage17
		toggleimage17alternate
		toggleimage18
		toggleimage18alternate
		toggleimage19
		toggleimage19alternate
		toggleimage20
		toggleimage20alternate
		sponsorcarousellogo
		sponsorfulllogo
		self.scoreData = source
		homeplayer1headshot
		visitplayer1headshot
		homeplayer2headshot
		visitplayer2headshot
	
		homeplayer3headshot
		visitplayer3headshot
	
		counter8image1
		counter8image2
		counter8image3
		counter8image4
		counter8image5
		counter8image6
		counter8image7
		counter8image8
		counter8image9
		counter8image10
		counter9image1
		counter9image2
		counter9image3
		counter9image4
		counter9image5
		counter9image6
		counter9image7
		counter9image8
		counter9image9
		counter9image10
		counter10image1
		counter10image2
		counter10image3
		counter10image4
		counter10image5
		counter10image6
		counter10image7
		counter10image8
		counter10image9
		counter10image10
		counter10image1
		counter10image2
		counter10image3
		counter10image4
		counter10image5
		counter10image6
		counter10image7
		counter10image8
		counter10image9
		counter10image10
		counter11image1
		counter11image2
		counter11image3
		counter11image4
		counter11image5
		counter11image6
		counter11image7
		counter11image8
		counter11image9
		counter11image10
		counter12image1
		counter12image2
		counter12image3
		counter12image4
		counter12image5
		counter12image6
		counter12image7
		counter12image8
		counter12image9
		counter12image10
		counter13image1
		counter13image2
		counter13image3
		counter13image4
		counter13image5
		counter13image6
		counter13image7
		counter13image8
		counter13image9
		counter13image10
	*/
		}
	}
}
