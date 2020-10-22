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
const rimraf = require('rimraf');
var SANDBOX = path.resolve(__dirname, 'sandbox/ProjectCDNNoService_UT');
var temp = require('temp').track();

describe('Change UI5 Version in project folder.', function () {

	describe("Launch the sub-generator", () => {
		it("Check the current version", () => {
			assert.fileContent('webapp/test/flpSandboxCDN.html', "1.71.26");
		});

		it("Change the version to 9.99.99", function (done) {
			helpers.run(path.join(__dirname, '../generators/changeui5version'))

				.cd(SANDBOX)
				//.inTmpDir()

				.withPrompts({
					UI5Version: "9.99.99"
				}).on('end', () => {
					done();
				});
		});

		it("Should have modify the version", (done) => {
			setTimeout(() => {
				assert.fileContent('webapp/test/flpSandboxCDN.html', "9.99.99");
				done();
			}, 5000);
		
		})
	});
});
