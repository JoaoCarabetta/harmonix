'use client'

import React, { useState } from 'react'
import { Button } from "./components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { Switch } from "./components/ui/switch"
import { Label } from "./components/ui/label"
import { ChordDisplay } from './components/ChordDisplay';

enum Note {
  C = 0, CSharp, D, DSharp, E, F, FSharp, G, GSharp, A, ASharp, B
}

type ChordType = 'major' | 'minor' | 'diminished' | 'augmented' | 'dominant7' | 'major7' | 'minor7';

function generateChord(root: Note, type: ChordType): number[] {
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

// Helper function to convert note number to note name
function noteToString(note: number): string {
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  return noteNames[note % 12];
}

// Function to find chord notes on the bandoneon
function findChordOnBandoneon(chord: number[], notes: string[][], isOpening: boolean): string[] {
  const chordNotes: string[] = [];
  
  chord.forEach(note => {
    const noteString = noteToString(note);
    const isSharp = noteString.includes('#');
    notes.forEach(row => {
      row.forEach(buttonNote => {
        if (isSharp) {
          if (buttonNote.startsWith(noteString)) {
            chordNotes.push(buttonNote);
          }
        } else {
          if (buttonNote.startsWith(noteString) && !buttonNote.includes('#')) {
            chordNotes.push(buttonNote);
          }
        }
      });
    });
  });
  
  return chordNotes;
}


const ROW_SPACING = 40
const COL_SPACING = 30

const createHandButtons = (matrix: number[][], notes: string[] = []) => {
  return matrix.flatMap((row, rowIndex) => 
    row.map((hasButton, colIndex) => 
      hasButton ? { 
        row: rowIndex, 
        col: colIndex,
        x: colIndex * COL_SPACING,
        y: rowIndex * ROW_SPACING,
        note: notes[rowIndex * row.length + colIndex] || ''
      } : null
    ).filter((button): button is NonNullable<typeof button> => button !== null)
  )
}

const leftHandMatrix = [
  [0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
]

const leftHandButtons = createHandButtons(leftHandMatrix)

const rightHandMatrix = [
  [0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
]

const rightHandButtons = createHandButtons(rightHandMatrix)

const BandoneonButton = ({ x, y, isActive, isRightHand, note }: { x: number; y: number; isActive: boolean; isRightHand: boolean; note: string }) => (
  <g>
    <circle
      cx={x}
      cy={y}
      r="15"
      fill={isActive ? (isRightHand ? "#ff4136" : "#0074D9") : "#F0F0F0"}
      stroke="#000000"
      strokeWidth="2"
    />
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="10"
      fill={isActive ? "#FFFFFF" : "#000000"}
    >
      {note}
    </text>
  </g>
)

// @ts-ignore
const BandoneonHand = ({ buttons, activeButtons, isRightHand, notes }) => (
  <svg width="100%" height="100%" viewBox="0 0 500 250" preserveAspectRatio="xMidYMid meet">
    <g transform="translate(20, 20)">
      {buttons.map((button) => {
        const note = notes[button.row][button.col];
        return (
          <BandoneonButton
            key={`${button.row}-${button.col}`}
            x={button.x}
            y={button.y}
            isActive={activeButtons.includes(note)}
            isRightHand={isRightHand}
            note={note}
          />
        );
      })}
    </g>
  </svg>
)
const bandoneonNotes = {
  right: {
    open: [
      ['', '', '', '', 'B6', '', 'G#6', '', 'G6', '', 'F6', '', '', '', '', ''],
      ['', '', '', 'C#4', '', 'A6', '', 'F#6', '', 'E6', '', 'D#6', '', '', '', ''],
      ['', '', 'C4', '', 'D4', '', 'G4', '', 'A#5', '', 'C6', '', 'D6', '', '', ''],
      ['', 'B3', '', 'E4', '', 'C#5', '', 'F#4', '', 'A4', '', 'C5', '', 'E5', '', ''],
      ['A3', '', 'F4', '', 'A#4', '', 'G#4', '', 'B4', '', 'D5', '', 'G#5', '', 'B5', ''],
      ['', 'A#3', '', 'D#4', '', 'F5', '', 'D#5', '', 'F#5', '', 'A5', '', 'C#6', '', 'G5'],
    ],
    close: [
      ['', '', '', '', 'A6', '', 'G#6', '', 'F#6', '', 'F6', '', '', '', '', ''],
      ['', '', '', 'C4', '', 'G6', '', 'A#5', '', 'C6', '', 'D#6', '', '', '', ''],
      ['', '', 'D4', '', 'C#4', '', 'G#4', '', 'A#4', '', 'C5', '', 'D6', '', '', ''],
      ['', 'B3', '', 'F#4', '', 'F#5', '', 'G4', '', 'B4', '', 'D5', '', 'G5', '', ''],
      ['A3', '', 'F4', '', 'E4', '', 'A4', '', 'C#5', '', 'E5', '', 'A5', '', 'C#6', ''],
      ['', 'A#3', '', 'D#4', '', 'F5', '', 'E5', '', 'G#5', '', 'B5', '', 'E6', '', 'D#5'],
    ],
  },
  left: {
    open: [
      ['', '', '', '', 'G#2', '', 'A#2', '', 'C#3', '', 'F3', '', 'G#4', '', ''],
      ['', 'E2', '', 'A2', '', 'G3', '', 'D#3', '', 'F4', '', 'A#3', '', 'F2', ''],
      ['', '', 'D3', '', 'A3', '', 'C4', '', 'E4', '', 'C3', '', 'G2', '', ''],
      ['', 'E3', '', 'G#3', '', 'B3', '', 'D4', '', 'F#4', '', 'C#4', '', 'F#2', ''],
      ['D2', '', 'B2', '', 'G4', '', 'A4', '', 'D#4', '', 'F#3', '', 'D#2', '', 'C2'],
    ],
    close: [
      ['', '', '', '', 'G#2', '', 'A#2', '', 'D#3', '', 'D#4', '', 'G4', '', ''],
      ['', 'D2', '', 'D3', '', 'A#3', '', 'C4', '', 'C#3', '', 'C3', '', 'F#2', ''],
      ['', '', 'G2', '', 'G3', '', 'B3', '', 'D4', '', 'F4', '', 'F#3', '', ''],
      ['', 'A2', '', 'E3', '', 'A3', '', 'C#4', '', 'E4', '', 'G#3', '', 'B2', ''],
      ['E2', '', 'E3', '', 'F#4', '', 'G#4', '', 'B4', '', 'F3', '', 'C#2', '', 'F2'],
    ],
  },
};


export default function App() {
  const [selectedNote, setSelectedNote] = useState<Note>(Note.C);
  const [selectedChordType, setSelectedChordType] = useState<ChordType>('major');
  const [isOpening, setIsOpening] = useState(true);

  const [rightHandNotes, setRightHandNotes] = useState(bandoneonNotes.right.open);
  const [leftHandNotes, setLeftHandNotes] = useState(bandoneonNotes.left.open);

  // Generate chord and find its notes on the bandoneon
  const chord = generateChord(selectedNote, selectedChordType);
  const chordNotes = chord.map(noteToString);
  const rightHandChordNotes = findChordOnBandoneon(chord, rightHandNotes, isOpening);
  const leftHandChordNotes = findChordOnBandoneon(chord, leftHandNotes, isOpening);

  // Update notes when isOpening changes
  React.useEffect(() => {
    setRightHandNotes(bandoneonNotes.right[isOpening ? 'open' : 'close']);
    setLeftHandNotes(bandoneonNotes.left[isOpening ? 'open' : 'close']);
  }, [isOpening]);

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Bandoneon Chord Finder</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-2">
          <div className="text-sm font-medium mb-2">Select a root note:</div>
          <div className="flex flex-wrap gap-2">
            {Object.keys(Note).filter(key => isNaN(Number(key))).map((note) => (
              <Button
                key={note}
                variant={selectedNote === Note[note] ? "default" : "outline"}
                onClick={() => setSelectedNote(Note[note])}
                className={`w-16 ${
                  selectedNote === Note[note]
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-white text-black hover:bg-gray-200"
                } border border-black`}
              >
                {note.includes('Sharp') ? note.replace('Sharp', '#') : note}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium mb-2">Select a chord type:</div>
          <div className="flex flex-wrap gap-2">
            {['major', 'minor', 'diminished', 'augmented', 'dominant7', 'major7', 'minor7'].map((type) => (
              <Button
                key={type}
                variant={selectedChordType === type ? "default" : "outline"}
                onClick={() => setSelectedChordType(type as ChordType)}
                className={`w-24 ${
                  selectedChordType === type
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-white text-black hover:bg-gray-200"
                } border border-black`}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            variant={isOpening ? "default" : "outline"}
            onClick={() => setIsOpening(!isOpening)}
            className="w-32"
          >
            {isOpening ? "Opening" : "Closing"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Left Hand</CardTitle>
            </CardHeader>
            <CardContent className="h-[450px] flex items-center justify-center p-4">
              <div className="w-full h-full flex items-center justify-center">
                <BandoneonHand 
                  buttons={leftHandButtons} 
                  activeButtons={leftHandChordNotes} 
                  isRightHand={false} 
                  notes={leftHandNotes}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">Right Hand</CardTitle>
            </CardHeader>
            <CardContent className="h-[450px] flex items-center justify-center p-4">
              <div className="w-full h-full flex items-center justify-center">
                <BandoneonHand 
                  buttons={rightHandButtons} 
                  activeButtons={rightHandChordNotes} 
                  isRightHand={true} 
                  notes={rightHandNotes}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <ChordDisplay 
          rootNote={noteToString(selectedNote)}
          chordType={selectedChordType}
          notes={chordNotes}
        />

        <div className="text-center text-sm text-gray-500 mt-8 flex items-center justify-center space-x-2">
          <span>Created with ♥ by João Carabetta | "Music is the universal language of mankind" - Henry Wadsworth Longfellow | </span>
          <a href="https://github.com/JoaoCarabetta/bandoneon-chord" target="_blank" rel="noopener noreferrer">
            {/* <Image src="/github-mark.svg" alt="GitHub" width={20} height={20} /> */}
          </a>
        </div>
      </CardContent>
    </Card>
  )
  }