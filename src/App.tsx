'use client'

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { Button } from "./components/ui/button"
import { ChordDisplay } from './components/ChordDisplay'
import { BandoneonHand } from './components/BandoneonHand'
import { useChordState } from './hooks/useChordState'
import { bandoneonNotes, noteNames, intervalColors } from './constants'
import { Note, Interval } from './types'

export default function App() {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
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
    chordName
  } = useChordState()

  const intervals: Interval[] = [
    'b2', '2', 'b3', '3', '4', '#4', '5', 'b6', '6', 'b7', '7'
  ]

  const changeLanguage = (lng: string) => {
    console.log('Changing language to:', lng);
    i18n.changeLanguage(lng).then(() => {
      console.log('Language changed successfully to:', i18n.language);
      setCurrentLanguage(lng); // This will force a re-render
    }).catch((error) => {
      console.error('Error changing language:', error);
    });
  };

  useEffect(() => {
    console.log('Current language:', currentLanguage);
  }, [currentLanguage]);

  return (
    <Card className="w-full max-w-5xl mx-auto border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold">{t('title')}</CardTitle>
        <div className="flex justify-center space-x-2 mt-4">
          {['en', 'pt', 'es'].map((lang) => (
            <Button
              key={lang}
              variant={currentLanguage === lang ? "default" : "outline"}
              onClick={() => changeLanguage(lang)}
              className="w-12"
            >
              {lang.toUpperCase()}
            </Button>
          ))}
        </div>
      </CardHeader>
      {/* Bandoneon Hands */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[400px]">
        <BandoneonHand 
          title={t('leftHand')}
          notes={leftHandNotes} 
          activeNotes={leftHandChordNotes} 
          isRightHand={false}
          noteToIntervalMap={noteToIntervalMap}
        />
        <BandoneonHand 
          title={t('rightHand')}
          notes={rightHandNotes} 
          activeNotes={rightHandChordNotes} 
          isRightHand={true}
          noteToIntervalMap={noteToIntervalMap}
        />
      </div>

      {/* Opening/Closing Toggle */}
      <div className="flex justify-center mb-4"> 
        <Button
          variant={isOpening ? "default" : "outline"}
          onClick={() => setIsOpening(!isOpening)}
          className="w-32"
        >
          {isOpening ? t('opening') : t('closing')}
        </Button>
      </div>
        
      <CardContent className="space-y-8">
        {/* Root Note Selection */}
        <div className="space-y-2">
          <div className="text-sm font-medium mb-2">{t('selectRootNote')}</div>
          <div className="flex flex-wrap gap-2">
            {Object.values(Note).filter(note => typeof note === 'number').map((note) => (
              <Button
                key={note}
                variant={selectedNote === note ? "default" : "outline"}
                onClick={() => setSelectedNote(note as Note)}
                className="w-12"
                style={{
                  backgroundColor: selectedNote === note ? intervalColors['1'] : '#FFFFFF',
                  color: selectedNote === note ? '#FFFFFF' : '#000000',
                  borderColor: '#000000'
                }}
              >
                {noteNames[note as number]}
              </Button>
            ))}
          </div>
        </div>

        {/* Interval Selection */}
        <div className="space-y-2">
          <div className="text-sm font-medium mb-2">{t('selectIntervals')}</div>
          <div className="flex flex-wrap gap-2">
            {intervals.map((interval) => (
              <Button
                key={interval}
                variant={selectedIntervals.includes(interval) ? "default" : "outline"}
                onClick={() => toggleInterval(interval)}
                className="w-12"
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

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-8 flex items-center justify-center space-x-2">
          <span>{t('footer')}</span>
          <a href="https://github.com/JoaoCarabetta/bandoneon-chord" target="_blank" rel="noopener noreferrer">
            {/* Add GitHub logo here if needed */}
          </a>
        </div>
      </CardContent>
    </Card>
  )
}