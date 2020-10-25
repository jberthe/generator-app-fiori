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
const helpers = require('yeoman-test');
const path = require('path');
const assert = require('yeoman-assert');
const { doesNotMatch } = require('yeoman-assert');
var SANDBOX = path.resolve(__dirname, 'sandbox');

var temp = require('temp').track();

describe('Create Sandbox project', function () {
	before(function (done) {
		helpers.testDirectory(SANDBOX, done);
	});


	describe("Generate the root application", () => {
		it("Load generator", () => {
			return  helpers.run(path.join(__dirname, '../generators/app'))
				.cd(SANDBOX)
				.withPrompts({
					projectname: "ProjectCDNNoService_UT",
					name_space: "ch.my.company.module",
					is_local_library: "CDN",
					UI5Version: "1.71.26",
					isODataConf: "No"
				});

		});

		it("Check version", () => {
				assert.fileContent('webapp/test/flpSandboxCDN.html', "1.71.26");
		});
	});


});
