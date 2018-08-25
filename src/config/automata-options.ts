import { IAutomataStateMapping } from "../types/automata-state-mapping";

class AutomataOptions {
  public symbolCount: number = 0;
  public symbolList: string[] = [];
  public stateCount: number = 0;
  public initialState: number = 0;

  public finalStateCount: number = 0;
  public finalStates: number[] = [];

  public stateMapping: Array<IAutomataStateMapping[]>;
}

export const automataOptions = new AutomataOptions();