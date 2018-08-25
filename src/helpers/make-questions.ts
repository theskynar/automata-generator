import * as inquirer from "inquirer";
import { automataOptions } from "../config/automata-options";
import { IAutomataStateMapping } from "../types/automata-state-mapping";


/**
 * Helper for make automata options.
 * 
 * @class MakeQuestionsHelper
 */
class MakeQuestionsHelper {

  /**
   * Ask for all options.
   * 
   * @memberof MakeQuestionsHelper
   */
  public async ask() {
    try {
      automataOptions.symbolCount = await this.askForSymbolCount();
      automataOptions.symbolList = await this.askForSymbols(automataOptions.symbolCount);
      automataOptions.stateCount = await this.askForStateCount();
      automataOptions.initialState = await this.askForInitialState();
      automataOptions.finalStateCount = await this.askForFinalStateCount();
      automataOptions.finalStates = await this.askForFinalStates(automataOptions.finalStateCount);
      automataOptions.stateMapping = await this.askForStateMapping(automataOptions.stateCount, automataOptions.symbolList);
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Ask for symbol count.
   * 
   * @private
   * @returns 
   * @memberof MakeQuestionsHelper
   */
  private async askForSymbolCount() {
    const { symbolCount } = await inquirer.prompt({
      message: "Quantos simbolos tem o alfabeto?",
      type: "input",
      name: "symbolCount",
      validate: input => !isNaN(parseInt(input))
    }) as any;
      
    return parseInt(symbolCount);
  }

  /**
   * Ask for all symbols.
   * 
   * @private
   * @param {number} symbolCount 
   * @returns 
   * @memberof MakeQuestionsHelper
   */
  private async askForSymbols(symbolCount: number) {
    const result: string[] = [];

    for (let i = 0; i < symbolCount; i++) {
      const { symbol } = await inquirer
        .prompt({
          message: `Qual o símbolo ${i}?`,
          type: "input",
          name: "symbol",
          validate: input => input.length > 0
        }) as any;

      result.push(symbol);
    }

    return result;
  }

  /**
   * Ask for state count.
   * 
   * @private
   * @returns 
   * @memberof MakeQuestionsHelper
   */
  private async askForStateCount() {
    const { stateCount } = await inquirer.prompt({
      message: "Quantos estados tem o autômato?",
      type: "input",
      name: "stateCount",
      validate: input => !isNaN(parseInt(input))
    }) as any;
      
    return parseInt(stateCount);
  }

  /**
   * Ask for initial state.
   * 
   * @private
   * @returns 
   * @memberof MakeQuestionsHelper
   */
  private async askForInitialState() {
    const { initialState } = await inquirer.prompt({
      message: "Qual o estado inicial?",
      type: "input",
      name: "initialState",
      validate: input => !isNaN(parseInt(input))
    }) as any;
      
    return parseInt(initialState);
  }

  /**
   * Ask for final state count.
   * 
   * @private
   * @returns 
   * @memberof MakeQuestionsHelper
   */
  private async askForFinalStateCount() {
    const { finalStateCount } = await inquirer.prompt({
      message: "Existem quantos estados finais?",
      type: "input",
      name: "finalStateCount",
      validate: input => !isNaN(parseInt(input))
    }) as any;
      
    return parseInt(finalStateCount);
  }
  
  /**
   * Ask for final states (index)
   * 
   * @private
   * @param {number} finalStateCount 
   * @returns 
   * @memberof MakeQuestionsHelper
   */
  private async askForFinalStates(finalStateCount: number) {
    const result: number[] = [];

    for (let i = 0; i < finalStateCount; i++) {
      const { finalState } = await inquirer
        .prompt({
          message: `Qual o símbolo final ${i}?`,
          type: "input",
          name: "finalState",
          validate: input => !isNaN(parseInt(input))
        }) as any;

      result.push(parseInt(finalState));
    }

    return result;
  }

  /**
   * Ask for transition table.
   * 
   * @private
   * @param {number} stateCount 
   * @param {string[]} symbolList 
   * @returns 
   * @memberof MakeQuestionsHelper
   */
  private async askForStateMapping(stateCount: number, symbolList: string[]) {
    const result: Array<IAutomataStateMapping[]> = [];

    for (let i = 0; i < stateCount; i++) {
      const mappings: IAutomataStateMapping[] = [];

      for (let symbol of symbolList) {
        const { state } = await inquirer.prompt({
          message: `Para o estado E${i} e o símbolo ${symbol}, qual o próximo estado?`,
          type: "input",
          name: "state",
          validate: input => !isNaN(parseInt(input))
        }) as any;
        
        mappings.push({ symbol, state });
      }

      result.push(mappings);
    }

    return result;
  }
}

export const makeQuestionsHelper = new MakeQuestionsHelper();