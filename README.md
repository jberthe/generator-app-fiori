# generator-app-fiori
Generate SAPUI5 Applciation base on UI5 Tooling.

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


