function generateAnswers(answers) {
  // function to display all answers expect the ones with axios using template literals
  return `
  Project name:
   # ${answers.title}

  Project description
   # ${answers.description} 

   ## Table of Contents 


   *[installation](#installation)

   *[Usage](#usage)

   *[License](#license)

   *[Constribuating](#constribuating)

   *[Test](#tests)

   *[Questios](#question)

## Intallation
 
    to intall the necessary dependencies, run the following command 

    ----
    # ${answers.install}
    ----
  
## Usage
    ---
    #${answers.usage}
    ---

## License

the licenses are:
# ${answers.license}
   

## Contributing

    #${answers.contributing}

## Tests
   what is the command to run test 
    
   ---
   # ${answers.test}
   ---
   
   
   `;
}

module.exports = generateAnswers;
