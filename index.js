const inquirer = require("inquirer");
const fs = require("fs");

const getLicenceBade = (licence) => {
  switch (licence) {
    case "GPL":
      return "[![GPL license](https://img.shields.io/badge/License-GPL-blue.svg)](http://perso.crans.org/besson/LICENSE.html)";
    case "GPLv3":
      return "[![GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg)](http://perso.crans.org/besson/LICENSE.html)";
    case "MIT":
      return "[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)";
  }
};

const generateMD = (answers) =>
  `
${getLicenceBade(answers.license)}

  ${answers.title}
## Description 
${answers.Descrpition}
## Table of Contents 
* [Installation](#Installation)
* [Usage](#Usage)
* [Licence](#license)
* [Questions](#Questions)
## Installation
${answers.Installation}
## Usage
${answers.Usage}
## Licence
${answers.license}
## Questions:
If you have questions you can reach me on [Github](https://github.com/${
    answers.username
  }) alternatively use email me at ${answers.email}
`;

inquirer
  .prompt([
    {
      type: "input",
      name: "title",
      message: "Your project title?",
    },
    {
      type: "input",
      name: "Description",
      message: "A brief description of your project.",
    },
    {
      type: "input",
      name: "Table_of_contents",
      message: "Table of contents",
    },
    {
      type: "input",
      name: "Installation",
      message: "Stepts to install project?",
    },
    {
      type: "input",
      name: "usage",
      message: "What is this project usage for?",
    },
    {
      type: "list",
      name: "license",
      message: "Chose the appropriate license for this project: ",
      choices: ["MIT", "GPL", "GPLv3"],
    },
    {
      type: "input",
      name: "username",
      message: "Please enter your GitHub username: ",
    },

    {
      type: "input",
      name: "email",
      message: "Please enter your email: ",
    },
  ])

  .then((answers) => {
    const generateContent = generateMD(answers);

    fs.writeFile("README.md", generateContent, (err) =>
      err ? console.log(err) : console.log("README.md file created!!")
    );
  });
