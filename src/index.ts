import { makeQuestionsHelper } from "./helpers/make-questions";
import { automataOptions } from "./config/automata-options";
import * as inquirer from "inquirer";
import { templateHelper } from "./helpers/template";

(async function() {
  await makeQuestionsHelper.ask();

  templateHelper.generateTemplate();  
})();