module.exports = async function (self) {
	const variables = []
	
	addPart(self.scoreData.Game, "game_", "Game ", variables)
	addPart(self.scoreData.Home, "home_", "Home ", variables)
	addPart(self.scoreData.Visit, "visit_", "Visit ", variables)
	for (let i = 0; i < self.scoreData.Settings.Toggles.length; i++) {
		addPart(self.scoreData.Settings.Toggles[i], "toggle"+(i+1) +"_","Toggle"+(i+1) +" ",variables)	
	}
	for (let i = 0; i < self.scoreData.Context.length; i++) {
		addPart(self.scoreData.Context[i], "context"+(i+1) +"_","Context"+(i+1) +" ",variables)	
	}

	self.setVariableDefinitions(variables)
	self.updateVariables()
}

function addPart(scoreDataPart, variableIdPrefix, variableNamePrefix, variables) {

	for (const key of Object.keys(scoreDataPart)) {
		const part = {}
		part.variableId = variableIdPrefix + key.toLowerCase()
		part.name = variableNamePrefix + key
		variables.push(part)
	}
}

