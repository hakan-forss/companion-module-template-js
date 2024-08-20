const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')

module.exports = function (self){
    const fields = [
        {
            type: 'textinput',
            id: 'broadcasterName',
            label: 'Broadcaster name',
            width: 12,
            regex: Regex.SOMETHING,
        },

        {
            type: 'textinput',
            id: 'broadcasterLogo',
            label: 'Broadcaster Logo',
            width: 12,
            regex: Regex.SOMETHING,
        },

        {
            type: 'textinput',
            id: 'broadcasterLogoSmall',
            label: 'Broadcaster Logo (Small)',
            width: 12,
            regex: Regex.SOMETHING,
        },

        {
            type: 'textinput',
            id: 'copyright',
            label: 'Copyright',
            width: 12,
            regex: Regex.SOMETHING,
        },
        {
            id: 'important-line',
            type: 'static-text',
            label: 'Toggle setup',
            value: 'Toogles are used to show different states. E.g. current in a timeout, Home team has more than 1 timeout left, are on second try/down',
            width: 12,
        },
    ]

    for (let i = 0; i < 30; i++) {
        let id = i+1
    fields.push(
        {
            type: 'textinput',
            label: 'Toggle ' + id + ' name:',
            id: 'name_' + id,
            useVariables: true,
            width: 8,
            default: 'Toggle ' + id,
        },  

        {
            type: 'checkbox',
            label: 'Startup state',
            id: 'state_' + id,
            width: 4,
            default: false,
        },  

        {
            type: 'textinput',
            label: 'Value when True:',
            id: 'valueTrue_' + id,
            useVariables: true,
            default:'Yes',
            width: 3,
        },  
        {
            type: 'textinput',
            label: 'Value when False',
            id: 'valueFalse_' + id,
            useVariables: true,
            default:'False',
            width: 3,

        },  

        {
            type: 'textinput',
            label: 'Image when True',
            id: 'imageTrue_' + id,
            useVariables: true,
            width: 3,
        },  

        {
            type: 'textinput',
            label: 'Image when false',
            id: 'imageFalse_' + id,
            useVariables: true,
            width: 3,
        },
    )
    }
    
    return fields    
}