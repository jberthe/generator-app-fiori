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

describe('backbone:app', function () {
    it("Genertate application CDN", () => {
        

        return helpers.run(path.join(__dirname, '../generators/app'))
            .inDir(path.join(__dirname, 'tmp'))
        
            .withPrompts({
                projectname: "ProjectCDNNoService_UT",
                name_space: "ch.my.company.module",
                is_local_library: "CDN",
                UI5Version: "1.71.26",
                isODataConf: "No"
            });
        }
    );

    it("Files should exist", () => {
        assert.file([
            'package.json',
            'ui5.yaml',
            '.eslintrc.json',
            '.eslintignore',
            '.gitignore',
            '.env',
            'webapp/test.html',
            'webapp/manifest.json',
            'webapp/Component.js',
            'webapp/view/App.view.xml',
            'webapp/view/Main.view.xml',
            'webapp/view/MessageManager.fragment.xml',
            'webapp/view/NotFound.view.xml',
            'webapp/view/ObjectNotFound.view.xml',
            'webapp/test/flpSandboxCDN.html',
            'webapp/test/initMockServer.js',
            'webapp/test/mockServer.html',
            'webapp/test/unit/AllTests.js',
            'webapp/test/unit/unitTests.qunit.html',
            'webapp/test/unit/unitTests.qunit.js',
            'webapp/model/formatter.js',
            'webapp/model/models.js',
            'webapp/model/ODataModel.js',
            'webapp/model/UIModel.js',
            'webapp/i18n/i18n.properties',
            'webapp/controller/App.controller.js',
            'webapp/controller/BaseController.js',
            'webapp/controller/ErrorHandler.js',
            'webapp/controller/Main.controller.js',
            'webapp/controller/NotFound.controller.js'
        ]);

    });
    it("Files should not exist", () => {
        assert.noFile([
            'webapp/flpSandbox.html',
            'webapp/index.html'
        ]);
    });

    it('NPM scripts should exist', () => {
        assert.fileContent('package.json', '"deploy"');
        assert.fileContent('package.json', '"lint"');
        assert.fileContent('package.json', '"start"');
        assert.fileContent('package.json', '"startCDN"');
        assert.fileContent('package.json', '"build"');
        assert.fileContent('package.json', '"test"');
    });

   
});