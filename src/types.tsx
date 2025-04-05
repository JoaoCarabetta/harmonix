export enum Note {
    C = 0, CSharp, D, DSharp, E, F, FSharp, G, GSharp, A, ASharp, B
  }
  
  export type ChordType = 'major' | 'minor' | 'diminished' | 'augmented' | 'dominant7' | 'major7' | 'minor7';

export type Interval = 
  '1' | 'b2' | '2' | 'b3' | '3' | '4' | '#4' | '5' | 'b5' | '#5' | 'b6' | '6' | 'b7' | '7M';

export type Instrument = 'bandoneon' | 'guitar';