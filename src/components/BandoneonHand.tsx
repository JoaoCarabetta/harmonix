import React from 'react'
import { BandoneonButton } from './BandoneonButton'
import { createHandButtons } from '../utils'
import { leftHandMatrix, rightHandMatrix, intervalColors, noteNames } from '../constants'
import { Interval } from '../types'

interface BandoneonHandProps {
  notes: string[][];
  activeNotes: string[];
  isRightHand: boolean;
  noteToIntervalMap: Record<number, Interval>;
}

export const BandoneonHand: React.FC<BandoneonHandProps> = ({ 
  notes, 
  activeNotes, 
  isRightHand,
  noteToIntervalMap
}) => {
  const buttons = createHandButtons(isRightHand ? rightHandMatrix : leftHandMatrix, notes);

  return (
    <div className="w-full h-full flex items-center justify-center py-8">
      <svg width="100%" height="100%" viewBox="0 0 500 250" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(20, 20) scale(0.9)">
          {buttons.map((button) => {
            const isActive = activeNotes.includes(button.note);
            const noteWithoutOctave = button.note.replace(/\d+$/, '');
            const noteIndex = noteNames.indexOf(noteWithoutOctave);
            const interval = noteToIntervalMap[noteIndex];
            let color = isActive ? (interval ? intervalColors[interval] : '#000000') : '#FFFFFF';
            return (
              <BandoneonButton
                key={`${button.row}-${button.col}`}
                x={button.x}
                y={button.y}
                isActive={isActive}
                isRightHand={isRightHand}
                note={button.note}
                color={color}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};