/*module.exports = Teams ={
	HOME: 'home',
	VISIT: 'visit',
}
*/
module.exports = Options = {
  
    comparison: {
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
  
 }

