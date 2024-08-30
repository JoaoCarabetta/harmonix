export enum Note {
    C = 0, CSharp, D, DSharp, E, F, FSharp, G, GSharp, A, ASharp, B
  }
  
  export type ChordType = 'major' | 'minor' | 'diminished' | 'augmented' | 'dominant7' | 'major7' | 'minor7';

export type Interval = 
  '1' | 'b2' | '2' | 'b3' | '3' | '4' | '#4' | '5' | 'b6' | '6' | 'b7' | '7' | 
  '8' | 'b9' | '9' | '#9' | '10' | '11' | '#11' | '12' | 'b13' | '13'