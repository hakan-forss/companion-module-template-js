module.exports = async function (self) {
	self.setVariableDefinitions([
		{ variableId: 'gameperiod', name: 'Game Period' },
		{ variableId: 'homescore', name: 'Home Score' },
		{ variableId: 'visitscore', name: 'Visitors Score' },
		{ variableId: 'hometol', name: 'Home Timeouts left' },
		{ variableId: 'visittol', name: 'Visitors Timeouts left' },
	])
}
