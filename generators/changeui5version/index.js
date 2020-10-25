/**
 * Copyright 2019 Joseph BERTHE
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var Generator = require('yeoman-generator');
var $ = require("jquery");
const glob = require('glob');
var fs = require('fs');


module.exports = class extends Generator {

	prompting() {
		const modules = this.config.get("uimodules");
		return this.prompt([{
			type: "list",
			name: "UI5Version",
			message: "Change the UI5 version for CDN approach (currently: " + this.config.get("UI5Version") + ")",
			choices: ["1.78.11", "1.71.26", "1.60.31", "1.52.46", "1.38.47"]
		}]).then((answer) => {
			this.options = answer;
		})
	}

	async writing() {
		fs.readFile("webapp/test/flpSandboxCDN.html", 'utf8', (err, data)  => {
			if (err) {
				return console.log(err);
			}
			// read the stored information
			let oldVErsion = this.config.get("UI5Version");

			var result = data.replace(new RegExp(oldVErsion, "g"), this.options.UI5Version);

			fs.writeFile("webapp/test/flpSandboxCDN.html", result, 'utf8',  (err) => {
				if (err) {
					return console.log(err);
				} 
				this.config.set("UI5Version", this.options.UI5Version);
			});
		});
	}
}