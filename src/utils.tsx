import { Note, ChordType } from './types'
import { noteNames } from './constants'

export function generateChord(root: Note, type: ChordType): number[] {
  const chord: number[] = [root];
  
  switch(type) {
    case 'major':
      chord.push((root + 4) % 12, (root + 7) % 12);
      break;
    case 'minor':
      chord.push((root + 3) % 12, (root + 7) % 12);
      break;
    case 'diminished':
      chord.push((root + 3) % 12, (root + 6) % 12);
      break;
      case 'augmented':
        chord.push((root + 4) % 12, (root + 8) % 12);
        break;
      case 'dominant7':
        chord.push((root + 4) % 12, (root + 7) % 12, (root + 10) % 12);
        break;
      case 'major7':
        chord.push((root + 4) % 12, (root + 7) % 12, (root + 11) % 12);
        break;
      case 'minor7':
        chord.push((root + 3) % 12, (root + 7) % 12, (root + 10) % 12);
        break;
    }
    
    return chord;
  }
  
  export function noteToString(note: number): string {
    return noteNames[note];
  }
  
  export function createHandButtons(matrix: number[][], notes: string[][]) {
    const buttons = [];
    const buttonSize = 30;
    const rowSpacing = 10;
    const colSpacing = 3;
  
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (matrix[row][col] === 1) {
          buttons.push({
            row,
            col,
            x: col * (buttonSize + colSpacing),
            y: row * (buttonSize + rowSpacing),
            note: notes[row][col]
          });
        }
      }
    }
  
    return buttons;
  }
  
  export function findChordOnBandoneon(chord: number[], notes: string[][], isOpening: boolean): string[] {
    const chordNotes = chord.map(noteToString);
    const foundNotes: string[] = [];
  
    for (let row = 0; row < notes.length; row++) {
      for (let col = 0; col < notes[row].length; col++) {
        const note = notes[row][col];
        if (chordNotes.includes(note.replace(/\d+$/, ''))) {
          foundNotes.push(note);
        }
      }
    }
  
    return foundNotes;
  }