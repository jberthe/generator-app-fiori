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

describe('Add new fragment in the project', function () {

	describe("Start (empty fragment)", () => {
		it("Add new empty fragment", function (done) {
			helpers.run(path.join(__dirname, '../generators/newfragment'))
				.cd(SANDBOX)

				.withPrompts({
					fragmentName: "MyNewEmptyFragment",
					whichTemplate: "Empty"
				}).on('end', () => {
					done();
				});
		});

		it("Should have a file as fragment", () => {
				assert.file('webapp/view/MyNewEmptyFragment.fragment.xml');		
		});

		it("Should have a file without content", () => {
			assert.noFileContent('webapp/view/MyNewEmptyFragment.fragment.xml', "SelectDialog");
			assert.noFileContent('webapp/view/MyNewEmptyFragment.fragment.xml', "VBox");
		});
	});

	describe("Start (fragment with select dialog)", () => {

		it("Add new fragment with Dialog", function (done) {
			helpers.run(path.join(__dirname, '../generators/newfragment'))
				.cd(SANDBOX)

				.withPrompts({
					fragmentName: "MyNewDialogFragment",
					whichTemplate: "SelectDialog"
				}).on('end', () => {
					done();
				});
		});

		it("Should have a file as fragment", () => {
			assert.file('webapp/view/MyNewDialogFragment.fragment.xml');
		});

		it("Should have a file with content dialog", () => {
			assert.fileContent('webapp/view/MyNewDialogFragment.fragment.xml', "SelectDialog");
			assert.noFileContent('webapp/view/MyNewDialogFragment.fragment.xml', "SimpleForm");
		});
	});

	describe("Start (fragment with form)", () => {

		it("Add new fragment with Form", function (done) {
			helpers.run(path.join(__dirname, '../generators/newfragment'))
				.cd(SANDBOX)

				.withPrompts({
					fragmentName: "MyNewFormFragment",
					whichTemplate: "SimpleForm"
				}).on('end', () => {
					done();
				});
		});

		it("Should have a file as fragment", () => {
			assert.file('webapp/view/MyNewFormFragment.fragment.xml');
		});

		it("Should have a file with content dialog", () => {
			assert.noFileContent('webapp/view/MyNewFormFragment.fragment.xml', "SelectDialog");
			assert.fileContent('webapp/view/MyNewFormFragment.fragment.xml', "SimpleForm");
		});
	});
});
