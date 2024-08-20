const { combineRgb, CreateUseBuiltinInvertForFeedbacksUpgradeScript } = require('@companion-module/base')
const { utils } = require('./utils')

const Teams ={
	HOME: 'home',
	VISIT: 'visit',
}

const selectTeamOption = {
	type: 'dropdown',
	label: 'Select team',
	id: 'team',
	default: Teams.HOME,
	tooltip: 'Teams',
	choices: [
		{ id: Teams.HOME, label: 'Home' },
		{ id: Teams.VISIT, label: 'Visit' },
	],
}

function getToggles(self,firstIsHeadline = false){
	const toggles =[]
	if(firstIsHeadline)
	{
		toggles.push({
			id:0,
			label:'Select Toggle'
		})
	}
	for (let i = 0; i < self.scoreData.Settings.Toggles.length; i++) {
		const toggle = {}
		toggle.id = i+1
		toggle.label =  self.scoreData.Settings.Toggles[i].Name
		toggles.push(toggle)
	}
	return toggles
}
module.exports = async function (self) {
	self.setFeedbackDefinitions({
		timeoutsLeftFeedback: {
			name: 'Timeouts left',
			description:'Check timeouts left and select Toggle to be updated',
			type: 'boolean',
			label: 'Timeouts left',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				selectTeamOption,
				{
					type: 'dropdown',
					label: 'Comparison',
					id: 'comparison',
					default: 'gte',
					choices: [
					  { id: 'eq', label: '=' },
					  { id: 'lt', label: '<' },
					  { id: 'lte', label: '<=' },
					  { id: 'gt', label: '>' },
					  { id: 'gte', label: '>=' },
					],
				  },
				  {
					id: 'num',
					type: 'number',
					label: 'Timouts left',
					default: 1,
					min: 0,
					max: 10,
				},
				{
					type: 'dropdown',
					label: 'Select toggle to be updated',
					id: 'toggles',
					default: '1',
					choices: getToggles(self),
	
				  },
			],
			callback: (feedback) => {
				let team = ''
				if (feedback.options.team == Teams.HOME) {
					team = self.scoreData.Home
				} else {
					team = self.scoreData.Visit
				}
			

				const timoutsInRange = {
					eq: team.TimeoutsLeft === feedback.options.num,
					lt: team.TimeoutsLeft < feedback.options.num,
					lte: team.TimeoutsLeft <= feedback.options.num,
					gt: team.TimeoutsLeft > feedback.options.num,
					gte: team.TimeoutsLeft >= feedback.options.num,
				  }


				if (timoutsInRange[feedback.options.comparison]) {
					self.scoreData.Settings.Toggles[feedback.options.toggles -1].State= true
					return true
				} else {
					self.scoreData.Settings.Toggles[feedback.options.toggles -1].State =false
					return false
				}
			},
		},

		downsFeedback: {
			name: 'Downs',
			description:'Check Down/Try and select Toggle to be updated',
			type: 'boolean',
			label: 'Down/Try',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					type: 'dropdown',
					label: 'Comparison',
					id: 'comparison',
					default: 'eq',
					choices: [
					  { id: 'eq', label: '=' },
					  { id: 'lt', label: '<' },
					  { id: 'lte', label: '<=' },
					  { id: 'gt', label: '>' },
					  { id: 'gte', label: '>=' },
					],
				  },
				  {
					id: 'num',
					type: 'number',
					label: 'Downs',
					default: 1,
					min: 0,
					max: 10,
				},
				{
					type: 'dropdown',
					label: 'Select toggle to be updated',
					id: 'toggles',
					default: '1',
					choices: getToggles(self),
	
				  },
			],
			callback: (feedback) => {
			
				const downsInRange = {
					eq: self.scoreData.Game.Down === feedback.options.num,
					lt: self.scoreData.Game.Down < feedback.options.num,
					lte: self.scoreData.Game.Down <= feedback.options.num,
					gt: self.scoreData.Game.Down > feedback.options.num,
					gte: self.scoreData.Game.Down >= feedback.options.num,
				  }

				
				if (downsInRange[feedback.options.comparison]) {
					self.scoreData.Settings.Toggles[feedback.options.toggles -1].State= true
					return true
				} else {
					self.scoreData.Settings.Toggles[feedback.options.toggles -1].State =false
					return false
				}
			},
		},

		toggleFeedback: {
			name: 'Toggle state',
			description:'State of a toggle',
			type: 'boolean',
			label: 'Toggle state',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					type: 'dropdown',
					label: 'Select toggle',
					id: 'toggles',
					default: '1',
					choices: getToggles(self),
	
				  },
			],
			callback: (feedback) => {
					return self.scoreData.Settings.Toggles[feedback.options.toggles -1].State
			},
		},
	})


}
