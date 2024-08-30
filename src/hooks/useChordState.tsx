import { useState, useMemo } from 'react'
import { Note, ChordType } from '../types'
import { bandoneonNotes, noteNames } from '../constants'
import { generateChord, findChordOnBandoneon } from '../utils'

export function useChordState() {
  const [selectedNote, setSelectedNote] = useState<Note>(Note.C);
  const [selectedChordType, setSelectedChordType] = useState<ChordType>('major');
  const [isOpening, setIsOpening] = useState(true);

  const chord = useMemo(() => generateChord(selectedNote, selectedChordType), [selectedNote, selectedChordType]);
  const chordNotes = useMemo(() => chord.map(note => noteNames[note]), [chord]);

  const rightHandNotes = useMemo(() => bandoneonNotes.right[isOpening ? 'open' : 'close'], [isOpening]);
  const leftHandNotes = useMemo(() => bandoneonNotes.left[isOpening ? 'open' : 'close'], [isOpening]);

  const rightHandChordNotes = useMemo(() => findChordOnBandoneon(chord, rightHandNotes, isOpening), [chord, rightHandNotes, isOpening]);
  const leftHandChordNotes = useMemo(() => findChordOnBandoneon(chord, leftHandNotes, isOpening), [chord, leftHandNotes, isOpening]);

  return {
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
  };
}