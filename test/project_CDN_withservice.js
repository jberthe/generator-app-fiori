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

describe('CDN Project with OData service', function () {
    it("Genertate application", () => {
        
        return helpers.run(path.join(__dirname, '../generators/app'))
            //.inDir(path.join(__dirname, 'tmp'))
            .inTmpDir()
        
            .withPrompts({
                projectname: "ProjectCDNWithService_UT",
                name_space: "ch.my.company.module",
                is_local_library: "CDN",
                UI5Version: "1.71.26",
                isODataConf: "Yes",
                ODataServer: "https://my.server.local:8001",
                serverClient: "100",
                userID: "demo",
                password: "demo",
                ODataServiceURL: "/sap/opu/odata/sap/ZMY_DEMO_SRV"
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

    it("ui5.yaml should not contains.", () => {
        assert.noFileContent("ui5.yaml", "ui5-middleware-servestatic");
        assert.noFileContent("ui5.yaml", "mountPath: /ui5");
    
    });
    
    it("UI5 Library should be", () => {
        assert.fileContent("webapp/test/flpSandboxCDN.html", "https://ui5.sap.com/1.71.26/");
    });

    it("Server shouldne set", () => {
        assert.fileContent("ui5.yaml", 'baseUri: "https://my.server.local:8001/sap"');
    });
    
    it("Service OData should be here", () => {
        assert.fileContent("webapp/manifest.json", '"mainService": {');
    });

    it("Credential should be in the .env file", () => {
        assert.fileContent(".env", 'UI5_TASK_NWABAP_DEPLOYER__USER=demo');
        assert.fileContent(".env", 'UI5_TASK_NWABAP_DEPLOYER__PASSWORD=demo');
        assert.fileContent(".env", 'UI5_TASK_NWABAP_DEPLOYER__CLIENT=100');
        assert.fileContent(".env", 'PROXY_PASSWORD=demo');
        assert.fileContent(".env", 'PROXY_USERNAME=demo');
    });
});