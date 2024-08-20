const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')
const GetConfigFields = require('./configFields')
const UpdateVariables = require('./updateVariables')
const HttpHandler = require('./http')
const FileReader = require('./fileReader');
const FileParser = require('./fileParser');
const scoreData = require('./scoreData');

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config) {
		this.log('debug', 'Init Start\n')
		this.config = config
		this.configUpdated(config)

		this.updateStatus(InstanceStatus.Ok)

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions

	
		this.log('debug', 'Init End\n')
	}
	// When module gets deleted
	async destroy() {
		this.stopInterval();
		this.log('debug', 'destroy')
	}

	async configUpdated(config) {
		this.log('debug', 'configUpdated Start\n')

		this.config = config
		this.scoreData = scoreData.scoreData(this);

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks

		this.updateStatus(InstanceStatus.Ok);

		this.log('debug', 'configUpdated End\n')
	}

	handleHttpRequest(request){
		return HttpHandler(this,request);
	}

	// Return config fields for web config
	getConfigFields() {
		return GetConfigFields(this)
	}



	updateVariables(){
		UpdateVariables(this)
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}
}



runEntrypoint(ModuleInstance, UpgradeScripts)
