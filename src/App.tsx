'use client'

import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from "./components/ui/card"
import { Button } from "./components/ui/button"
import { ChordDisplay } from './components/ChordDisplay'
import { BandoneonHand } from './components/BandoneonHand'
import { useChordState } from './hooks/useChordState'
import { bandoneonNotes, noteNames, intervalColors } from './constants'
import { Note, Interval, ChordType } from './types'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function App() {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const {
    selectedNote,
    setSelectedNote,
    selectedIntervals,
    toggleInterval,
    isOpening,
    setIsOpening,
    rightHandNotes,
    leftHandNotes,
    chordNotes,
    rightHandChordNotes,
    leftHandChordNotes,
    noteToIntervalMap,
    chordName,
    setSelectedIntervals
  } = useChordState()

  const intervals: Interval[] = [
    'b2', '2', 'b3', '3', '4', '#4', '5', 'b6', '6', 'b7', '7'
  ]

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then(() => {
      setCurrentLanguage(lng);
    }).catch((error) => {
      console.error('Error changing language:', error);
    });
  };

  const commonChords: ChordType[] = ['major', 'minor', 'dominant7', 'major7', 'minor7', 'diminished', 'augmented'];

  const getChordIntervals = (chordType: ChordType): Interval[] => {
    switch(chordType) {
      case 'major':
        return ['3', '5'];
      case 'minor':
        return ['b3', '5'];
      case 'dominant7':
        return ['3', '5', 'b7'];
      case 'major7':
        return ['3', '5', '7'];
      case 'minor7':
        return ['b3', '5', 'b7'];
      case 'diminished':
        return ['b3', 'b5', 'b7'];
      case 'augmented':
        return ['3', '#5'];
      default:
        return [];
    }
  };

  const selectCommonChord = (chordType: ChordType) => {
    setSelectedIntervals(getChordIntervals(chordType));
  };

  const isChordSelected = (chordType: ChordType) => {
    const chordIntervals = getChordIntervals(chordType);
    return JSON.stringify(selectedIntervals.sort()) === JSON.stringify(chordIntervals.sort());
  };

  return (
    <div className="w-full h-screen flex">
      {/* Fixed Control Panel */}
      <div className="w-64 bg-gray-100 overflow-y-auto flex-shrink-0">
        <div className="h-full flex flex-col p-4">
          <h1 className="text-xl font-bold mb-4">{t('title')}</h1>
          
          {/* Opening/Closing Toggle */}
          <div className="mb-4">
            <div className="flex rounded-md overflow-hidden">
              <Button
                variant={isOpening ? "default" : "outline"}
                onClick={() => setIsOpening(true)}
                className={`flex-1 ${isOpening ? 'bg-black text-white hover:bg-gray-800' : 'text-black hover:bg-gray-200'}`}
              >
                {t('opening')}
              </Button>
              <Button
                variant={!isOpening ? "default" : "outline"}
                onClick={() => setIsOpening(false)}
                className={`flex-1 ${!isOpening ? 'bg-black text-white hover:bg-gray-800' : 'text-black hover:bg-gray-200'}`}
              >
                {t('closing')}
              </Button>
            </div>
          </div>
          
          {/* Root Note Selection */}
          <div className="mb-4">
            <div className="text-sm font-medium mb-2">{t('selectRootNote')}</div>
            <div className="grid grid-cols-4 gap-2">
              {Object.values(Note).filter(note => typeof note === 'number').map((note) => (
                <Button
                  key={note}
                  variant={selectedNote === note ? "default" : "outline"}
                  onClick={() => setSelectedNote(note as Note)}
                  className={`h-10 ${selectedNote === note ? 'bg-black text-white hover:bg-gray-800' : 'text-black hover:bg-gray-200'}`}
                >
                  {noteNames[note as number]}
                </Button>
              ))}
            </div>
          </div>

          {/* Common Chords */}
          <div className="mb-4">
            <div className="text-sm font-medium mb-2">{t('commonChords')}</div>
            <div className="grid grid-cols-2 gap-2">
              {commonChords.map((chordType) => (
                <Button
                  key={chordType}
                  variant="outline"
                  onClick={() => selectCommonChord(chordType)}
                  className={`h-10 text-xs transition-colors duration-200 ${
                    isChordSelected(chordType)
                      ? 'bg-black text-white' 
                      : 'hover:bg-gray-200'
                  }`}
                >
                  {t(`chordTypes.${chordType}`)}
                </Button>
              ))}
            </div>
          </div>

          {/* Interval Selection */}
          <div className="mb-4">
            <div className="text-sm font-medium mb-2">{t('selectIntervals')}</div>
            <div className="grid grid-cols-4 gap-2">
              {intervals.map((interval) => (
                <Button
                  key={interval}
                  variant={selectedIntervals.includes(interval) ? "default" : "outline"}
                  onClick={() => toggleInterval(interval)}
                  className="h-10"
                  style={{
                    backgroundColor: selectedIntervals.includes(interval) ? intervalColors[interval] : '#FFFFFF',
                    color: selectedIntervals.includes(interval) ? '#FFFFFF' : '#000000',
                    borderColor: '#000000'
                  }}
                >
                  {interval}
                </Button>
              ))}
            </div>
          </div>

          <ChordDisplay 
            chordName={chordName}
            notes={chordNotes}
          />

          {/* Language Selector */}
          <div className="mt-auto">
            <div className="flex justify-center space-x-2">
              {['en', 'pt', 'es'].map((lang) => (
                <Button
                  key={lang}
                  variant={currentLanguage === lang ? "default" : "outline"}
                  onClick={() => changeLanguage(lang)}
                  className={`w-12 ${currentLanguage === lang ? 'bg-black text-white hover:bg-gray-800' : 'text-black hover:bg-gray-200'}`}
                >
                  {lang.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bandoneon Hands */}
      <div className="flex-grow flex flex-col">
        <div className="flex-1 w-full h-1/2">
          <BandoneonHand 
            notes={leftHandNotes} 
            activeNotes={leftHandChordNotes} 
            isRightHand={false}
            noteToIntervalMap={noteToIntervalMap}
          />
        </div>
        <div className="flex-1 w-full h-1/2">
          <BandoneonHand 
            notes={rightHandNotes} 
            activeNotes={rightHandChordNotes} 
            isRightHand={true}
            noteToIntervalMap={noteToIntervalMap}
          />
        </div>
      </div>
    </div>
  )
}