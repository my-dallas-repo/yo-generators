
var Generator = require('yeoman-generator');
module.exports = class extends Generator {
    
    async prompting() {

        const answers = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "Your Project name: ",
                default: this.appname
            },
            {
                type: "input",
                name: "description",
                message: "Describe Your Project: ",
            },
            {
                type: "input",
                name: "version",
                message: "Your Version (1.0.0): ",
            },
            {
                type: "input",
                name: "author",
                message: "Who Is the Author: ",
            }
        ]);
    
        this._buildPackageJSON(answers.name, answers.description, answers.version, answers.author);

        this.log("App Name: ", answers.name);
        this.log("Cool Feature: ", answers.cool);

      }


      /** CREATES PACKAGE JSON **/

    _buildPackageJSON(name, desc, ver, author) {

        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'), {
                name: name,
                ver: ver,
                desc: desc,
                auth: author
            }
        );
    }


   /** CREATE DIRECTORY STRUCTURE **/

   createStructure() {

        this.fs.copyTpl(this.templatePath('_src/_index.html'), this.destinationPath('src/index.html'));
        this.fs.copyTpl(this.templatePath('_src/_css/_img/_favicon.ico'), this.destinationPath('src/css/img/favicon.ico'));
        this.fs.copyTpl(this.templatePath('_src/_css/_sample1.css'), this.destinationPath('src/css/sample1.css'));

        this.fs.copyTpl(this.templatePath('_src/_includes/_SampleReplace.html'), this.destinationPath('src/includes/SampleReplace.html'));

        this.fs.copyTpl(this.templatePath('_src/_js/_libs/_jquery-3.3.1.min.js'), this.destinationPath('src/js/libs/jquery-3.3.1.min.js'));
        this.fs.copyTpl(this.templatePath('_src/_js/_sample1.js'), this.destinationPath('src/js/sample1.js'));
        this.fs.copyTpl(this.templatePath('_src/_js/_sample2.js'), this.destinationPath('src/js/sample2.js'));

   }



   /** COPIES OVER BOILER PLATE FILES **/

    copying() {

        this.fs.copyTpl(this.templatePath('editorconfig'), this.destinationPath('.editorconfig'));
        this.fs.copy(this.templatePath('jshint'), this.destinationPath('.jshint'));
        this.fs.copy(this.templatePath('_Gruntfile.js'), this.destinationPath('Gruntfile.js'));
        
    }



    method1() {
        this.log('method 1 just ran... yolo');
      }

};

/**************************************
 * A SIMPLE WEB APP GENERATOR
 *  FOR JAVASCRIPT, JQUERY FRAMEWORKS
 *  USES JSHINT AND SERVER CONNECT 
 *  FOR INSTANT LIVE CODE CHANGES
 * 
 *  DATE: 08-05-2019
 *  AUTHOR: MCROOK
 **************************************/