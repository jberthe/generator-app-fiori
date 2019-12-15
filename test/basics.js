const helpers = require('yeoman-test');
const path = require('path');
const assert = require('yeoman-assert');

describe('backbone:app', function () {
    it('should return -1 when the value is not present', function () {
        assert.equal([1, 2, 3].indexOf(4), -1);
    });
    it('generate a project', function () {
        // The object returned acts like a promise, so return it to wait until the process is done
        return helpers.run(path.join(__dirname, '../generators/app'))
            //.inDir(path.join(__dirname, 'tmp'))
            .withPrompts({
                projectname: 'UTProjectName',
                name_space: 'ch.saphir.ut.demo',
                ui5Path: '../ui5',
                ODataServer: 'http://my.server.local:8000',
                serverClient: '001',
                userID: 'UTUser',
                password: 'UTPassword'
            });

    })
});