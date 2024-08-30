import { Note, ChordType, Interval } from './types'
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

export function calculateNoteFromInterval(root: Note, interval: Interval): Note {
  const semitones = intervalToSemitones(interval)
  return (root + semitones) % 12
}

function intervalToSemitones(interval: Interval): number {
  const intervalMap: Record<Interval, number> = {
    '1': 0, 'b2': 1, '2': 2, 'b3': 3, '3': 4, '4': 5, '#4': 6,
    '5': 7, 'b6': 8, '6': 9, 'b7': 10, '7': 11, '8': 12,
    'b9': 13, '9': 14, '#9': 15, '10': 16, '11': 17, '#11': 18,
    '12': 19, 'b13': 20, '13': 21
  }
  return intervalMap[interval]
}

export function recognizeChord(root: Note, intervals: Interval[]): string {
  const rootName = noteNames[root];
  const intervalSet = new Set(intervals);

  // Don't remove the root note from the interval set
  let chordName = rootName;
  let hasThird = false;
  let hasFifth = false;
  let hasSeventh = false;

  if (intervalSet.size === 1 && intervalSet.has('1')) {
    return rootName;
  }

  if (intervalSet.has('3')) {
    hasThird = true;
  } else if (intervalSet.has('b3')) {
    chordName += 'm';
    hasThird = true;
  }

  if (intervalSet.has('5')) {
    hasFifth = true;
  } else if (intervalSet.has('b5')) {
    chordName += 'b5';
  } else if (intervalSet.has('#5')) {
    chordName += '#5';
  }

  if (intervalSet.has('7')) {
    chordName += 'maj7';
    hasSeventh = true;
  } else if (intervalSet.has('b7')) {
    chordName += '7';
    hasSeventh = true;
  }

  if (intervalSet.has('2') || intervalSet.has('9')) {
    chordName += 'add9';
  }

  if (intervalSet.has('4') || intervalSet.has('11')) {
    chordName += 'add11';
  }

  if (intervalSet.has('6') || intervalSet.has('13')) {
    chordName += '6';
  }

  if (!hasThird && !hasFifth && !hasSeventh) {
    if (intervalSet.has('4')) {
      chordName += 'sus4';
    } else if (intervalSet.has('2')) {
      chordName += 'sus2';
    }
  }

  if (!hasThird && !hasFifth && intervalSet.has('b7')) {
    return rootName + '7no3no5';
  }

  return chordName;
}