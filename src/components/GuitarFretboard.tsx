import React from 'react';
import { Note } from '../types';
import { noteNames } from '../constants';

interface GuitarFretboardProps {
  activeNotes: string[];
  noteToIntervalMap: { [key: number]: string };
  intervalColors: { [key: string]: string };
}

const GuitarFretboard: React.FC<GuitarFretboardProps> = ({
  activeNotes,
  noteToIntervalMap,
  intervalColors
}) => {
  // Standard guitar tuning (from high to low)
  const strings = [
    { note: Note.E, name: 'E' },   // High E
    { note: Note.B, name: 'B' },
    { note: Note.G, name: 'G' },
    { note: Note.D, name: 'D' },
    { note: Note.A, name: 'A' },
    { note: Note.E, name: 'E' }    // Low E
  ];

  const frets = Array.from({ length: 16 }, (_, i) => i); // 0 to 15 frets

  const getNoteAtFret = (stringNote: Note, fret: number): number => {
    return (stringNote + fret) % 12;
  };

  // Convert note names to numbers
  const activeNoteNumbers = activeNotes.map(note => {
    const noteIndex = Object.values(noteNames).indexOf(note);
    return noteIndex >= 0 ? noteIndex : -1;
  }).filter(note => note !== -1);

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="relative w-full max-w-[1400px]">
        {/* Strings and frets */}
        {strings.map((string, stringIndex) => (
          <div key={stringIndex} className="flex items-center mb-2">
            {/* String name */}
            <div className="w-16 text-center font-medium text-lg">
              {string.name}{stringIndex === 0 ? ' ↑' : stringIndex === strings.length - 1 ? ' ↓' : ''}
            </div>
            
            {/* Frets */}
            {frets.map((fret) => {
              const noteAtFret = getNoteAtFret(string.note, fret);
              const isActive = activeNoteNumbers.includes(noteAtFret);
              const interval = noteToIntervalMap[noteAtFret];
              
              return (
                <div
                  key={fret}
                  className="w-24 h-14 border-r-2 border-gray-300 relative flex items-center justify-center"
                  style={{
                    borderBottom: stringIndex === strings.length - 1 ? 'none' : '2px solid #666',
                    borderRight: fret === 0 ? '4px solid black' : '2px solid #d1d5db',
                  }}
                >
                  {isActive && (
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-base font-medium"
                      style={{
                        backgroundColor: intervalColors[interval] || '#000',
                      }}
                    >
                      {interval || noteNames[noteAtFret]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {/* Fret markers */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {[3, 5, 7, 9, 12, 15].map((fret) => (
            <div
              key={fret}
              className="absolute top-1/2 w-24 flex justify-center"
              style={{
                left: `${fret * 6 + 4}rem`,
                transform: 'translateY(-50%)',
              }}
            >
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            </div>
          ))}
        </div>

        {/* Fret numbers */}
        <div className="flex mt-4">
          <div className="w-16"></div> {/* Space for string names */}
          {frets.map((fret) => (
            <div key={fret} className="w-24 text-center text-lg font-medium text-gray-800">
              {fret}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuitarFretboard; 