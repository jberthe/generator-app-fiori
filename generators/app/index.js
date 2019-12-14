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
        message: "ABAP Server password"serverClient
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