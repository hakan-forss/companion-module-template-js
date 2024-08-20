const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')

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


module.exports = function (self) {
	self.setActionDefinitions({
		setScore_action: {
			name: 'Score - Set Score',
			description:'Set the score',
			options: [
				selectTeamOption,
				{
					id: 'score',
					type: 'textinput',
					label: 'Score',
					default: 0,
					useVariables : true,
					regex: RegExp.NUMBER,
				},
		
			],
			callback: async (event) => {
				const score = parseInt(await self.parseVariablesInString(event.options.score))
				if(Number.isInteger(score)){
					getTeam(event,self).Score = score
				} else{
					self.log('warn', 'Score is not an number')
				}
				if(getTeam(event,self).Score < 0)
					getTeam(event,self).Score = 0

				self.updateVariables()
			},
		},

		changeScore_action: {
			name: 'Score - Change the score',
			description:'Increse or decrese the score',
			options: [
				selectTeamOption,
				{
					id: 'amount',
					type: 'textinput',
					label: 'Amount',
					default: 1,
					useVariables : true,
					regex: RegExp.NUMBER,
				},
			],
			callback: async (event) => {
				const amount = parseInt(event.options.amount)
				if(Number.isInteger(amount)){
					getTeam(event,self).Score  += amount
				} else{
					self.log('warn', 'Score is not an number')
				}
				if(getTeam(event,self).Score < 0)
					getTeam(event,self).Score = 0

				self.updateVariables()
			},
		},

		setDown_action: {
			name: 'Down/try - Set Down/try',
			description:'Set the Down/try',
			options: [
				{
					id: 'down',
					type: 'textinput',
					label: 'Down/try',
					default: 1,
					useVariables : true,
					regex: RegExp.NUMBER,
				},
				{
					id: 'downShort',
					type: 'textinput',
					label: 'Down short text',
					default: '1st and',
					useVariables : true,
				},
		
			],
			callback: async (event) => {
				const down = parseInt(await self.parseVariablesInString(event.options.down))
				if(Number.isInteger(down)){
					self.scoreData.Game.Down = down
				} else{
					self.log('warn', 'Down/try is not an number')
				}
				if(self.scoreData.Game.Down < 0)
					self.scoreData.Game.Down = 0

				self.scoreData.Game.DownShort = await self.parseVariablesInString(event.options.downShort)
				self.updateVariables()
			},
		},


		
		setToGo_action: {
			name: 'Togo - Set togo/distance',
			description:'Set togo/distance',
			options: [
				{
					id: 'togo',
					type: 'textinput',
					label: 'togo/distance',
					default: 10,
					useVariables : true,
					regex: RegExp.NUMBER,
				},
				{
					id: 'togoShort',
					type: 'textinput',
					label: 'togo/distance short text',
					default: '10',
					useVariables : true,
				},
		
			],
			callback: async (event) => {
				self.scoreData.Game.Togo= await self.parseVariablesInString(event.options.togo)
				self.scoreData.Game.TogoShort = await self.parseVariablesInString(event.options.togoShort)

				self.updateVariables()
			},
		},

		setContext_action: {
			name: 'Context - Context',
			description:'Set a context field',
			options: [
				{
					id: 'value',
					type: 'textinput',
					label: 'Value',
					useVariables : true,
				},
		
			],
			callback: async (event) => {


				self.scoreData.Context[0].Value = await self.parseVariablesInString(event.options.value)
				self.updateVariables()
			},
		},
		setPeriod_action: {
			name: 'Period - Set Period',
			description:'Set the Period',
			options: [
				{
					id: 'period',
					type: 'textinput',
					label: 'Period number',
					default: 1,
					useVariables : true,
					regex: RegExp.NUMBER,
				},
				{
					id: 'periodShort',
					type: 'textinput',
					label: 'Period short name',
					default: "1st",
					useVariables : true,
				},
				{
					id: 'periodLong',
					type: 'textinput',
					label: 'Period long name',
					default: "1st Quater",
					useVariables : true,
				},		
			],
			callback: async (event) => {
				const period = parseInt(await self.parseVariablesInString(event.options.period))
				if(Number.isInteger(period)){
					self.scoreData.Game.Period = period
				} else{
					self.log('warn', 'Period is not an number')
				}
				self.scoreData.Game.PeriodShort = await self.parseVariablesInString(event.options.periodShort)
				self.scoreData.Game.PeriodLong = await self.parseVariablesInString(event.options.periodLong)

				self.updateVariables()
			},
		},

		setTimeoutsLeft_action: {
			name: 'Timeout - Set timeouts left',
			description:'Set timeouts left. When setting a value lower than 0 it will be set to 0',
			options: [
				selectTeamOption,
				{
					id: 'timeoutsleft',
					type: 'textinput',
					label: 'Timeouts left',
					default: 0,
					useVariables : true,
					regex: RegExp.NUMBER,
				},
		
			],
			callback: async (event) => {
				const timeoutsLeft = parseInt( await self.parseVariablesInString(event.options.timeoutsleft) )
				if(Number.isInteger(timeoutsLeft)){
					getTeam(event,self).TimeoutsLeft = timeoutsLeft
				} else{
					self.log('warn', 'Score is not an number')
				}
				if(getTeam(event,self).TimeoutsLeft < 0)
					getTeam(event,self).TimeoutsLeft = 0

				self.updateVariables()
			},
		},


		changeTimeoutsLeft_action: {
			name: 'Timeout - Change timeouts left',
			description:'Positive numbers increase. Negative numbers decrese. When setting a value lower than 0 it will be set to 0',
			options: [
				selectTeamOption,
				{
					id: 'amount',
					type: 'textinput',
					label: 'Amount',
					default: 1,
					useVariables : true,
					regex: RegExp.NUMBER,
				},
			],
			callback: async (event) => {
				const amount = parseInt( await self.parseVariablesInString(event.options.amount) )
				if(Number.isInteger(amount)){
					getTeam(event, self).TimeoutsLeft += amount
					
				} else{
					self.log('warn', 'Score is not an number')
				}
				if(getTeam(event, self).TimeoutsLeft < 0)
					getTeam(event, self).TimeoutsLeft = 0
				self.updateVariables()
			},
		},

		setToggle_action: {
			name: 'Toggle - Toggle',
			description:'Set or toggle toggle',
			options: [
				{
					type: 'dropdown',
					label: 'Select toggle',
					id: 'toggles',
					default: '1',
					choices: getToggles(self),
	
				  },
				  {
					type: 'dropdown',
					label: 'State',
					id: 'toggleState',
					default: 'true',
					choices: [
						{ id: 'toggle', label: 'Toggle'},
						{ id: 'true', label: 'True' },
						{ id: 'false', label: 'False' },
				
					],
				  },

				],
			callback: async (event) => {
				switch (event.options.toggleState) {
					case 'true':
						self.scoreData.Settings.Toggles[event.options.toggles - 1].State = true
						break;
					case 'false':
						self.scoreData.Settings.Toggles[event.options.toggles - 1].State = false
						break;
					default:
						self.scoreData.Settings.Toggles[event.options.toggles - 1].State = !self.scoreData.Settings.Toggles[event.options.toggles - 1].State
						break;
				}
				self.updateVariables()
			},
		},

		setToggleValues_action: {
			name: 'Toggle - Set toggle values',
			description:'Set toggle values. NOTE: These values will not saved between sessions',
			options: [
				{
					type: 'dropdown',
					label: 'Select toggle',
					id: 'toggles',
					default: '1',
					choices: getToggles(self),
				},
				{
					type: 'textinput',
					label: 'Value when True',
					id: 'valueTrue',
					useVariables: true,
				},  
				{
					type: 'textinput',
					label: 'Value when False',
					id: 'valueFalse',
					useVariables: true,
				},  

				{
					type: 'textinput',
					label: 'Image when True',
					id: 'imageTrue',
					useVariables: true,
				},  

				{
					type: 'textinput',
					label: 'Image when false',
					id: 'imageFalse',
					useVariables: true,
				},  

				],
			callback: async (event) => {
				const selectedToggle = self.scoreData.Settings.Toggles[event.options.toggles-1]
				selectedToggle.ValueTrue = await self.parseVariablesInString(event.options.valueTrue)
				selectedToggle.ValueFalse = await self.parseVariablesInString(event.options.valueFalse)
				selectedToggle.ValueAlternate = await self.parseVariablesInString(event.options.valueAlternate)
				selectedToggle.ImageTrue = await self.parseVariablesInString(event.options.imageTrue)
				selectedToggle.ImageFalse = await self.parseVariablesInString(event.options.imageFalse)

				self.updateVariables()
			},
		},

		setTeamValues_action: {
			name: 'Team - Set team values',
			description:'Set team values',
			options: [
				selectTeamOption,
				{
					type: 'textinput',
					label: 'Name (Long)',
					id: 'nameLong',
					useVariables: true,
				},  
				{
					type: 'textinput',
					label: 'Name (Short)',
					id: 'nameShort',
					useVariables: true,
				},  
				{
					type: 'textinput',
					label: 'Mascot',
					id: 'mascot',
					useVariables: true,
				},  
				{
					type: 'textinput',
					label: 'Logo',
					id: 'logo',
					useVariables: true,
				},  
				{
					type: 'textinput',
					label: 'Logo (Small)',
					id: 'logoSmall',
					useVariables: true,
				},  
				{
					type: 'colorpicker',
					enableAlpha: true,
					label: 'Color',
					id: 'color',
					useVariables: true,
				},  
				{
					type: 'textinput',
					label: 'Record',
					id: 'record',
					useVariables: true,
				},  
  				{
					type: 'textinput',
					label: 'Record Overall',
					id: 'recordOverall',
					useVariables: true,
				},  
  				{
					type: 'textinput',
					label: 'Record Conference',
					id: 'recordConference',
					useVariables: true,
				}, 
				{
					type: 'textinput',
					label: 'Ranking',
					id: 'ranking',
					useVariables: true,
				}, 

				],
			callback: async (event) => {
				const team = getTeam(event,self)
				
				team.NameLong = await self.parseVariablesInString(event.options.nameLong)
				team.NameShort = await self.parseVariablesInString(event.options.nameShort)
				team.Mascot = await self.parseVariablesInString(event.options.mascot)
				team.Logo = await self.parseVariablesInString(event.options.logo)
				team.LogoSmall = await self.parseVariablesInString(event.options.logoSmall)
				team.Color = await self.parseVariablesInString(event.options.color)
				team.Record = await self.parseVariablesInString(event.options.record)
				team.RecordOverall = await self.parseVariablesInString(event.options.recordOverall)
				team.RecordConference = await self.parseVariablesInString(event.options.recordConference)
				team.Ranking = await self.parseVariablesInString(event.options.ranking)

				self.updateVariables()
			},
		},

	})
}



function getTeam(event, self) {
	if (event.options.team == Teams.HOME) {
		return self.scoreData.Home
	} else {
		return self.scoreData.Visit
	}
}

