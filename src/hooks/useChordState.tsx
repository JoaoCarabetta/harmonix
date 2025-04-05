import { useState, useMemo } from 'react'
import { Note, Interval } from '../types'
import { bandoneonNotes, noteNames } from '../constants'
import { findChordOnBandoneon, calculateNoteFromInterval, recognizeChord } from '../utils'

export function useChordState() {
  const [selectedNote, setSelectedNote] = useState<Note>(Note.C);
  const [selectedIntervals, setSelectedIntervals] = useState<Interval[]>(['3', '5']);
  const [isOpening, setIsOpening] = useState(true);

  const toggleInterval = (interval: Interval) => {
    setSelectedIntervals(prev => 
      prev.includes(interval) 
        ? prev.filter(i => i !== interval)
        : [...prev, interval].sort((a, b) => intervalToSemitones(a) - intervalToSemitones(b))
    )
  }

  const chordIntervals = useMemo(() => {
    return ['1', ...selectedIntervals] as Interval[];
  }, [selectedIntervals]);

  const chordName = useMemo(() => {
    return recognizeChord(selectedNote, chordIntervals);
  }, [selectedNote, chordIntervals]);

  const chord = useMemo(() => {
    return chordIntervals.map(interval => calculateNoteFromInterval(selectedNote, interval));
  }, [selectedNote, chordIntervals]);

  const chordNotes = useMemo(() => chord.map(note => noteNames[note]), [chord]);

  const noteToIntervalMap = useMemo(() => {
    const map: Record<number, Interval> = {};
    chord.forEach((note, index) => {
      map[note] = chordIntervals[index];
    });
    console.log('noteToIntervalMap:', map);
    return map;
  }, [chord, chordIntervals]);

  const rightHandNotes = useMemo(() => bandoneonNotes.right[isOpening ? 'open' : 'close'], [isOpening]);
  const leftHandNotes = useMemo(() => bandoneonNotes.left[isOpening ? 'open' : 'close'], [isOpening]);

  const rightHandChordNotes = useMemo(() => findChordOnBandoneon(chord, rightHandNotes, isOpening), [chord, rightHandNotes, isOpening]);
  const leftHandChordNotes = useMemo(() => findChordOnBandoneon(chord, leftHandNotes, isOpening), [chord, leftHandNotes, isOpening]);

  console.log('Selected Note:', noteNames[selectedNote]);
  console.log('Selected Intervals:', selectedIntervals);
  console.log('Chord:', chordNotes);
  console.log('Right Hand Chord Notes:', rightHandChordNotes);
  console.log('Left Hand Chord Notes:', leftHandChordNotes);

  return {
    selectedNote,
    setSelectedNote,
    selectedIntervals,
    toggleInterval,
    isOpening,
    setIsOpening,
    rightHandNotes,
    leftHandNotes,
    chord,
    chordNotes,
    rightHandChordNotes,
    leftHandChordNotes,
    noteToIntervalMap,
    chordName,
    setSelectedIntervals  // Add this line
  };
}

function intervalToSemitones(interval: Interval): number {
  const intervalMap: Record<Interval, number> = {
    '1': 0,
    'b2': 1,
    '2': 2,
    'b3': 3,
    '3': 4,
    '4': 5,
    '#4': 6,
    '5': 7,
    'b5': 6,
    '#5': 8,
    'b6': 8,
    '6': 9,
    'b7': 10,
    '7M': 11
  }
  return intervalMap[interval]
}