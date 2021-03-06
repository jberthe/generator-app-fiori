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
var request = require('request');
const chalk = require('chalk');

let tExcludeFileCDN = ["webapp/flpSandbox.html", "webapp/index.html"];

module.exports = class extends Generator {

  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);



    this.log.write('----------------------------------------------------------\r\n');
    this.log.write('|                                                        |\r\n');
    this.log.write('|               Welcome to Fiori App generator           |\r\n');
    this.log.write('|                                                        |\r\n');
    this.log.write('----------------------------------------------------------\r\n');



  }

  async prompting() {
    //const done = this.async();
    return new Promise((resolve, reject) => {
      this.full_answer = {};

      let finalQuestions = () => {
        this.log.write('\r\n*************************************\r\n');
        this.log.write('\r\n**** OData Service configuration ****\r\n');
        this.log.write('\r\n****                             ****\r\n');

        return this.prompt([{
          type: "list",
          name: "isODataConf",
          message: "Do you want to configure the OData service?",
          default: "Yes",
          choices: ["Yes", "No"],
          store: true
        }]).then((subAnswer) => {
          if (subAnswer.isODataConf === "Yes") {
            return this.prompt([{
              type: "input",
              name: "ODataServer",
              message: "ABAP Server uri",
              default: "https://my.server.local:8001",
              store: true
            },
            {
              type: "number",
              name: "serverClient",
              message: "ABAP Server client",
              default: "100",
              store: true
            },
            {
              type: "input",
              name: "userID",
              message: "ABAP Server user ID",
              store: true
            },
            {
              type: "password",
              name: "password",
              message: "ABAP Server password",
              store: true
            }]).then((answer) => {
              for (var myKey in answer) {
                this.full_answer.ODataConf[myKey] = answer[myKey];
              }
              this.log.write(chalk.bold.white('Service Odata retreiving...'));
              var res = new Promise((resolve, reject) => {
                request.get({
                  uri: answer.ODataServer + "/sap/opu/odata/IWFND/CATALOGSERVICE;v=2/ServiceCollection?$orderby=TechnicalServiceName asc&$format=json",
                  method: 'GET',
                  auth: {
                    user: answer.userID,
                    pass: answer.password,
                    sendImmediately: false
                  }
                }, (error, response, body) => {
                  if (response) {
                   this.log("\u001b[2J\u001b[0;0H");

                    var data = JSON.parse(response.toJSON().body);
                    var tService = [];
                    data.d.results.forEach((elem) => {
                      tService.push(elem.ServiceUrl.substring(elem.ServiceUrl.indexOf("/sap/opu")));
                    });
                    resolve(tService.sort());
                  } else {
                    this.log("\u001b[2J\u001b[0;0H");
                    this.log.write(chalk.red.white('Error connection to server: ' + answer.ODataServer + "\n\r"));
                    resolve([]);
                  }
                }

                )
              });



              return res.then((serviceList) => {
                if (serviceList.length > 0) {
                  return this.prompt([{
                    type: "list",
                    name: "ODataServiceURL",
                    message: "ODATA Service uri",
                    choices: serviceList
                  }]);
                } else {
                  return this.prompt([{
                    type: "input",
                    name: "ODataServiceURL",
                    message: "ODATA Service uri",
                    default: '/sap/opu/odata/sap/ZMY_DEMO_SRV'
                  }]);
                }
              });
            });
          }
        });



      };

      this.prompt([{
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
        type: "list",
        name: "is_local_library",
        message: "Are you using a local library or CDN?",
        default: "CDN",
        choices: ["CDN", "Local library"]
      }
      ]).then((sub_answers) => {
        this.full_answer["projectname"] = sub_answers.projectname;
        this.full_answer["name_space"] = sub_answers.name_space;
        this.full_answer["name_space_slash"] = sub_answers.name_space.split(".").join("/");

        if (sub_answers.is_local_library === "CDN") {
          this.full_answer["isCDN"] = true;
          this.log.write('\r\nThe UI5 version can be change later by the command : app-fiori:changeui5version\r\n');
          this.prompt([{
            type: "list",
            name: "UI5Version",
            message: "UI5 Version (for CDN lauchpad)",
            choices: ["1.78.11", "1.71.26", "1.60.31", "1.52.46", "1.38.47"]
          }]).then((sub_answers) => {
            this.full_answer["UI5Version"] = sub_answers.UI5Version;
            this.full_answer["ui5Path"] = "";
            this.full_answer["ODataConf"] = {};

            finalQuestions().then((answers) => {
              for (var myKey in answers) {
                this.full_answer.ODataConf[myKey] = answers[myKey];
              }

              this._loadConfiguration(this.full_answer).then(() => {
                resolve();
              });
            });
          });
        } else {
          this.prompt([{
            type: "input",
            name: "ui5Path",
            message: "Local UI5 Path",
            default: "../ui5"
          }]).then((sub_answers) => {
            this.full_answer["ui5Path"] = sub_answers.ui5Path;
            this.full_answer["UI5Version"] = "1.60.31";
            this.full_answer["ODataConf"] = {};

            finalQuestions().then((answers) => {
              for (var myKey in answers) {
                this.full_answer.ODataConf[myKey] = answers[myKey];
              }


              this._loadConfiguration(this.full_answer).then(() => {
                resolve();
              });

            });
          });
        }
      });
    });


  }

  _loadConfiguration(answer) {
    return new Promise((resolve, reject) => {

      this.destinationRoot(`${answer.projectname}`);
      this.config.set(this.full_answer);
      resolve();
    });

  }

  writing() {
    let zeroPad = function(num, places) {
      var zero = places - num.toString().length + 1;
      return Array(+(zero > 0 && zero)).join("0") + num;
    }

    this.options.oneTimeConfig = this.config.getAll();
    this.options.oneTimeConfig.fullNamespace = this.options.oneTimeConfig.name_space + "." + this.options.oneTimeConfig.projectname;

    if (this.options.oneTimeConfig.ODataConf.serverClient) {
      this.options.oneTimeConfig.ODataConf.serverClient = zeroPad(this.options.oneTimeConfig.ODataConf.serverClient, 3);
    }

    glob.sync('**', {
      cwd: this.sourceRoot(),
      nodir: true
    }).forEach((file) => {
      if (!this.options.oneTimeConfig.isCDN || (this.options.oneTimeConfig.isCDN && !tExcludeFileCDN.find((elem) => elem === file))) {

        const sOrigin = this.templatePath(file);
        const sTarget = this.destinationPath(file.replace(/^_/, '').replace(/\/_/, '/'));

        this.fs.copyTpl(sOrigin, sTarget, this.options.oneTimeConfig);
      }
    });

  }

  install() {
    this.installDependencies({
      bower: false,
      npm: true
    });
  }

  
};
