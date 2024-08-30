'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { Button } from "./components/ui/button"
import { ChordDisplay } from './components/ChordDisplay'
import { BandoneonHand } from './components/BandoneonHand'
import { useChordState } from './hooks/useChordState'
import { bandoneonNotes, chordTypes, noteNames } from './constants'
import { Note, ChordType } from './types'

export default function App() {
  const {
    selectedNote,
    setSelectedNote,
    selectedChordType,
    setSelectedChordType,
    isOpening,
    setIsOpening,
    rightHandNotes,
    leftHandNotes,
    chord,
    chordNotes,
    rightHandChordNotes,
    leftHandChordNotes
  } = useChordState()

  return (
    <Card className="w-full max-w-5xl mx-auto border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold">Bandoneon Chord Finder</CardTitle>
      </CardHeader>
      {/* Bandoneon Hands */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[400px]">
        <BandoneonHand title="Left Hand" notes={leftHandNotes} activeNotes={leftHandChordNotes} isRightHand={false} />
        <BandoneonHand title="Right Hand" notes={rightHandNotes} activeNotes={rightHandChordNotes} isRightHand={true} />
      </div>

      {/* Opening/Closing Toggle */}
      <div className="flex justify-center mb-4"> 
        <Button
          variant={isOpening ? "default" : "outline"}
          onClick={() => setIsOpening(!isOpening)}
          className="w-32"
        >
          {isOpening ? "Opening" : "Closing"}
        </Button>
      </div>
        
      <CardContent className="space-y-8">
        {/* Root Note Selection */}
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

        {/* Chord Type Selection */}
        <div className="space-y-2">
          <div className="text-sm font-medium mb-2">Select a chord type:</div>
          <div className="flex flex-wrap gap-2">
            {chordTypes.map((type) => (
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

        <ChordDisplay 
          rootNote={noteNames[selectedNote]}
          chordType={selectedChordType}
          notes={chordNotes}
        />

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-8 flex items-center justify-center space-x-2">
          <span>Created with ♥ by João Carabetta | "Music is the universal language of mankind" - Henry Wadsworth Longfellow | </span>
          <a href="https://github.com/JoaoCarabetta/bandoneon-chord" target="_blank" rel="noopener noreferrer">
            {/* Add GitHub logo here if needed */}
          </a>
        </div>
      </CardContent>
    </Card>
  )
}