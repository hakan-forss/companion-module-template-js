const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')
const HttpHandler = require('./http')
const FileReader = require('./fileReader');
const FileParser = require('./fileParser');
const scoreData = require('./scoreData');

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config) {
		this.config = config

		this.filecontents = '';
		this.fileLastUpdated = 0;
		this.scoreData = scoreData();
		this.INTERVAL = null;

		this.ENCODING_TYPES = [
			{ id: 'utf8', label: 'utf8'},
			{ id: 'utf16le', label: 'utf16le'},
			{ id: 'latin1', label: 'latin1'},
			{ id: 'base64', label: 'base64'},
			{ id: 'base64url', label: 'base64url'},
			{ id: 'hex', label: 'hex'}
		];

		this.VARIABLES = []

		this.updateStatus(InstanceStatus.Ok)

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions

		this.configUpdated(config)

	}
	// When module gets deleted
	async destroy() {
		this.stopInterval();
		this.log('debug', 'destroy')
	}

	updateOutput(){
		FileParser(this)
	}

	async configUpdated(config) {
		this.log('debug', 'configUpdated Start\n')

		this.config = config

		this.updateStatus(InstanceStatus.Ok);

		FileReader.stopInterval(this);
		this.fileLastUpdated = 0;

		// Quickly check if certain config values are present and continue setup
		if (this.config.fileUri !== '') {
			if (this.INTERVAL) {
				FileReader.stopInterval(this);
			}
			this.updateStatus(InstanceStatus.Connecting, 'Opening File...');
			FileReader.openFileAlways(this);
		}
		this.log('debug', 'configUpdated End\n')
	}

	handleHttpRequest(request){
		return HttpHandler(this,request);
	}

	// Return config fields for web config
	getConfigFields() {
		return [
			{
				type: 'checkbox',
				id: 'localScoreing',
				label: 'Use scoring in Companion? ',
				default: false
			},
			{
				type: 'checkbox',
				id: 'imageSubstitution',
				label: 'Substitute images with defined in Companion?',
				default: true
			},
			{
				type: 'textinput',
				id: 'fileUri',
				label: 'File Uri',
				width: 12,
				regex: Regex.SOMETHING,
			},
			{
				type: 'number',
				id: 'rate',
				width: 6,
				label: 'Update Rate (in ms) (set to 0 to read file once and not again unless manually activated)',
				default: 5000
			},
			{
				type: 'dropdown',
				id: 'encoding',
				width: 6,
				label: 'File Encoding',
				default: 'utf8',
				choices: this.ENCODING_TYPES
			},
			{
				type: 'textinput',
				id: 'hlogo',
				label: 'Home Logo Uri',
				width: 12,
				regex: Regex.SOMETHING,
			},
			{
				type: 'textinput',
				id: 'vlogo',
				label: 'Vistit Logo Uri',
				width: 12,
				regex: Regex.SOMETHING,
			},
			{
				type: 'textinput',
				id: 'companylogo',
				label: 'Company Logo Uri',
				width: 12,
				regex: Regex.SOMETHING,
			},
			{
				type: 'textinput',
				id: 'flagtrue',
				label: 'Flag True Uri',
				width: 12,
				regex: Regex.SOMETHING,
			},
			{
				type: 'textinput',
				id: 'flagfalse',
				label: 'Flag False Uri',
				width: 12,
				regex: Regex.SOMETHING,
			},

			{
				type: 'textinput',
				id: 'timeouttrue',
				label: 'Timeout True Uri',
				width: 12,
				regex: Regex.SOMETHING,
			},
			{
				type: 'textinput',
				id: 'timeoutfalse',
				label: 'Timeout False Uri',
				width: 12,
				regex: Regex.SOMETHING,
			},
		]
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
