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
const glob = require('glob');

module.exports = class extends Generator {

  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

  }

  async prompting() {
    const answers = await this.prompt([{
        type: "input",
        name: "projectname",
        message: "Your project name"
      },
      {
        type: "input",
        name: "name_space",
        message: "Namespace",
        default: "ch.my.company.module"
      },
      {
        type: "input",
        name: "ui5Path",
        message: "Local UI5 Path",
        default: "../ui5"
      },
      {
        type: "input",
        name: "ODataServer",
        message: "ABAP Server uri",
        default: "https://my.server.local:8001"
      },
      {
        type: "input",
        name: "ODataServiceURL",
        message: "ODATA Service uri",
        default: "/sap/opu/odata/sap/MyService"
      },
      {
        type: "input",
        name: "serverClient",
        message: "ABAP Server client",
        default: "100"
      },
      {
        type: "input",
        name: "userID",
        message: "ABAP Server user ID"
      },
      {
        type: "input",
        name: "password",
        message: "ABAP Server password"
      }
    ]).then((answers) => {
      this.destinationRoot(`${answers.projectname}`);
      this.config.set(answers)
    });
  }

  writing() {
    this.options.oneTimeConfig = this.config.getAll();
    this.options.oneTimeConfig.fullNamespace = this.options.oneTimeConfig.name_space + this.options.oneTimeConfig.projectname;

    glob.sync('**', {
      cwd: this.sourceRoot(),
      nodir: true
    }).forEach((file) => {
      const sOrigin = this.templatePath(file);
      const sTarget = this.destinationPath(file.replace(/^_/, '').replace(/\/_/, '/'));

      this.fs.copyTpl(sOrigin, sTarget, this.options.oneTimeConfig);
    });

  }

  install() {
    this.installDependencies({
      bower: false,
      npm: true
    });
  }
};