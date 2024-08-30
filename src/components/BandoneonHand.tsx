import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { BandoneonButton } from './BandoneonButton'
import { createHandButtons } from '../utils'
import { leftHandMatrix, rightHandMatrix, intervalColors, noteNames } from '../constants'
import { Interval, Note } from '../types'

interface BandoneonHandProps {
  title: string;
  notes: string[][];
  activeNotes: string[];
  isRightHand: boolean;
  noteToIntervalMap: Record<number, Interval>;
}

export const BandoneonHand: React.FC<BandoneonHandProps> = ({ 
  title, 
  notes, 
  activeNotes, 
  isRightHand,
  noteToIntervalMap
}) => {
  const buttons = createHandButtons(isRightHand ? rightHandMatrix : leftHandMatrix, notes);

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className='p-1'>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-4rem)] flex items-center justify-center p-2">
        <div className="w-full h-full flex items-center justify-center">
          <svg width="100%" height="100%" viewBox="0 0 500 250" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(20, 20)">
              {buttons.map((button) => {
                const isActive = activeNotes.includes(button.note);
                const noteWithoutOctave = button.note.replace(/\d+$/, '');
                const noteIndex = noteNames.indexOf(noteWithoutOctave);
                const interval = noteToIntervalMap[noteIndex];
                let color = '#F0F0F0';
                if (isActive) {
                  color = interval ? intervalColors[interval] : '#000000';
                }
                console.log(`Button: ${button.note}, Active: ${isActive}, Interval: ${interval}, Color: ${color}`);
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
      </CardContent>
    </Card>
  );
};