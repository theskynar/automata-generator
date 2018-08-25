import { makeQuestionsHelper } from "./helpers/make-questions";
import { automataOptions } from "./config/automata-options";
import * as inquirer from "inquirer";

(async function() {
  //await makeQuestionsHelper.ask();
  
  // const { msg } = await inquirer.prompt<{ msg: string }>({
  //   message: "Digite a mensagem",
  //   name: "msg",
  //   type: "input"
  // });

  const msg = "cbaab";

  let stateIndex = 0;
  for (let letter of msg) {
    const currentState = automataOptions.stateMapping[stateIndex];
    const map = currentState.find(x => x.symbol === letter);

    if (!map) {
      return console.log("Rejected!");
    }

    stateIndex = map.state;
  }

  if (automataOptions.finalStates.indexOf(stateIndex) !== -1) {
    console.log("Accepted");
  } else {
    console.log("Rejected");
  }

})();