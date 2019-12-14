# Description
This generator create a Fiori application base on Worklist template. It uses the last UI5 Tooling to make your life easy. The generated project embedded as well a Lanchpad to integrate an SAPui5 Component. You do not need to create an `index.html`to load your project.

This template is for Fiori programmer which develop on On-Premise ABAP system.

## References
I based my work on multiple sources. 
- SAPui5 template is based on https://github.com/SAP/openui5-worklist-app
- The generator I used to help mine is https://github.com/SAP/generator-easy-ui5
- https://github.com/SAP/ui5-tooling

I wanted to fork the Easy-ui5 generator but the structre was not what I expected. I do not want the abillity to add HTML or JS view. The application I wanted to have as template should have App.view as starting point. Furthermore, I wanted to used the semantic page to build my application.

## Context
The generator will provide to you an application in local environment. The UI5 library should be already installed locally. Its also give you an application connected to your ABAP server. If you are behind a proxy please dosen't forget to set it up.

## How-To
We assume that you execute the generator in the following environement :
```
<root_folder>
   |
   +- <ui_5repository>
   |
   +- HERE
```
### Install
1. Get [Node.js](https://nodejs.org/en/download/) (version 8.5 or higher)
2. Install the generator
    ```sh
    npm install -g yo generator-app-fiori
    ```
3. Verify your installation to see if Yeoman has been installed correctly
    ```sh
    yo
    ```
	Make sure you see the `app-fiori` generator listed.
### Usage
#### Create your first SAPui5 App within a few seconds!

1. Scaffold your SAPui5 project
    ```
    yo app-fiori
    ```
2. Answer the prompts to create your SAPui5 project
3. Run it locally
    ```
    cd <your project name>
    ui5 serve
    ```
4. In your favorite browser, launch the `Launchpad.html`

#### Deploy on ABAP Server
 ```
npm build
```

