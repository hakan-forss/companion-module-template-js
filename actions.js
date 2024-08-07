module.exports = function (self) {
	self.setActionDefinitions({
		setHomeScore_action: {
			name: 'Set Home Score',
			options: [
				{
					id: 'setHomeScore',
					type: 'number',
					label: 'Score',
					default: 0,
					min: 0,
					max: 100,
				},
			],
			callback: async (event) => {
				self.setVariableValues({
					'homescore': event.options.setHomeScore
				})
				self.updateOutput()
			},
		},

		setVisitScore_action: {
			name: 'Set Visit Score',
			options: [
				{
					id: 'setVisitScore',
					type: 'number',
					label: 'Score',
					default: 0,
					min: 0,
					max: 100,
				},
			],
			callback: async (event) => {
				self.setVariableValues({
					'visitscore': event.options.setVisitScore
				})
				self.updateOutput()
			},
		},

	})
}
