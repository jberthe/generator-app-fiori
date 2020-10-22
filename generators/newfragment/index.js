const Generator = require("yeoman-generator");

module.exports = class extends Generator {
	prompting() {
		var aPrompt = [{
			type: "input",
			name: "fragmentName",
			message: "Fragment's name:"
		},
			{
			type: "list",
			name: "whichTemplate",
			message: "To which template do you want?",
			choices: ["Empty", "SelectDialog", "SimpleForm"]
		}];

		return this.prompt(aPrompt);

	}

	async writing() {

	}
}