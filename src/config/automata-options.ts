import { IAutomataStateMapping } from "../types/automata-state-mapping";
import { Template } from "../types/template-type";

class AutomataOptions {
  public templateType: Template = Template.GoTo;
  public symbolCount: number = 3;
  public symbolList: string[] = ['a', 'b', 'c'];
  public stateCount: number = 3;
  public initialState: number = 0;

  public finalStateCount: number = 1;
  public finalStates: number[] = [2];

  public stateMapping: Array<IAutomataStateMapping[]> = [
    [
      {
        state: 1, 
        symbol: 'a'
      }, 
      {
        state: 0,
        symbol: 'c'
      },
      {
        state: 0,
        symbol: 'b'
      }
    ],
    [
      {
        state: 1,
        symbol: 'a'
      },
      {
        state: 2,
        symbol: 'b'
      },
      {
        state: 0, 
        symbol: 'c'
      }
    ],
    [
      {
        state: 2,
        symbol: 'a'
      },
      {
        state: 2,
        symbol: 'b'
      },
      {
        state: 2,
        symbol: 'c'
      }
    ]
  ];
}

export const automataOptions = new AutomataOptions();