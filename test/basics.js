const helpers = require('yeoman-test');
const path = require('path');
const assert = require('yeoman-assert');

describe('backbone:app', function () {
    this.timeout(200000);
    const answers = {
        projectname: 'UTProjectName',
        name_space: 'ch.saphir.ut.demo',
        ui5Path: '../ui5',
        ODataServer: 'http://my.server.local:8000',
        ODataServiceURL: '/sap/opu/odata/sap/MyService',
        serverClient: '001',
        userID: 'UTUser',
        password: 'UTPassword'
    };

    it('should return -1 when the value is not present', function () {
        assert.equal([1, 2, 3].indexOf(4), -1);
    });
    it('generate a project', function () {
        // The object returned acts like a promise, so return it to wait until the process is done
        

        return helpers.run(path.join(__dirname, '../generators/app'))
            .inDir(path.join(__dirname, 'tmp'))
            .withPrompts(answers).then(function(){

                
            });

    });
    it('Check ui5.yaml parameters ', function () {
        assert.fileContent('ui5.yaml', 'rootPath: "' + answers.ui5Path + '"');
        assert.fileContent('ui5.yaml', 'baseUri: "' + answers.ODataServer + '/sap"');
        assert.fileContent('ui5.yaml', 'auth: "' + answers.userID + ':' + answers.password  + '"');
        assert.fileContent('ui5.yaml', 'client: "' + answers.serverClient + '"');
        assert.fileContent('ui5.yaml', 'server: ' + answers.ODataServer);
        assert.fileContent('ui5.yaml', 'user: ' + answers.userID);
        assert.fileContent('ui5.yaml', 'password: ' + answers.password);
    });
});