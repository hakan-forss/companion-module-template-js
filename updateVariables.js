module.exports = function(self) {
	self.log("debug", 'Updating variables')
	const variables = {}
	updatePart(self.scoreData.Game,"game_",variables)
	updatePart(self.scoreData.Home,"home_",variables)
	updatePart(self.scoreData.Visit,"visit_",variables)
		
	for (let i = 0; i < self.scoreData.Settings.Toggles.length; i++) {
		updatePart(self.scoreData.Settings.Toggles[i], "toggle"+(i+1) +"_",variables)	
	}
	for (let i = 0; i < self.scoreData.Context.length; i++) {
		updatePart(self.scoreData.Context[i], "context"+(i+1) +"_",variables)	
	}

	self.setVariableValues(variables)

	self.log("debug", 'Checking Feedbacks')
	self.checkFeedbacks('timeoutsLeftFeedback')
	self.checkFeedbacks('downsFeedback')
	self.checkFeedbacks('toggleFeedback')

	self.log("debug", 'Done checking Feedbacks')
	
	self.log("debug", 'Done updating variables')
}


function updatePart(scoreDataPart, variableIdPrefix, variables) {
	for (const [key, value] of Object.entries(scoreDataPart)) {
		variables[variableIdPrefix + key.toLowerCase()] = value;
	}
}
