const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const util = require("util");
const generateReadMe = require("./Develop/generate");
const generateAvatar = require("./Develop/generateAvatar");
const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);
// acting user through promot series of offensive quiestions
function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is your project name?",
    },
    {
      type: "input",
      name: "description",
      message: "please write a short description of your please",
    },
    {
      type: "list",
      message: "what kind of license should your project have?",
      name: "license",
      choices: ["none", "all of them", "both a and b"],
    },
    {
      type: "suggest",
      name: "install",
      message: "what command should be run to install dependenices? (npm i)",
      suggestions: ["npm i"],
    },
    {
      type: "suggest",
      name: "test",
      message: "what command should be run to run tests? (npm test)",
      suggestions: ["npm test"],
    },
    {
      type: "input",
      message: "what does the user need to know about using the repo?",
      name: "usage",
    },
    {
      type: "input",
      message:
        "What does the user need to know about contributing to the repo?",
      name: "contributing",
    },
    {
      type: "input",
      message: "Enter your GitHub username:",
      name: "user",
    },
  ]);
}

//declaring the  function
promptUser()
  // displays all the answers except ones that require axios
  .then(function (answers) {
    const readMe = generateReadMe(answers);
    return writeFileAsync("generatedReadme.md", readMe);
  })
  .then(function (username) {
    //getting the function from module generateAvatar
    const URL = generateAvatar(username);
    // template literals
    const queryUrl = `https://api.github.com/users/${URL}`;
    // using the axios package to get the data from githubs api
    axios.get(queryUrl).then(function (res) {
      // getting only the avatar_url property
      const repoNames = res.data.avatar_url;
      // attaching using appendFileAsync to the same file declared in the functon above
      return appendFileAsync("generatedReadme.md", repoNames);
    });
  })
  // show message if everything went well
  .then(function () {
    console.log("Successfully wrote readme file ");
  })

  .catch(function (err) {
    // show err message if something went wrong
    console.error(err);
  });
