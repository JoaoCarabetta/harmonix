import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { BandoneonButton } from './BandoneonButton'
import { createHandButtons } from '../utils'
import { leftHandMatrix, rightHandMatrix } from '../constants'
interface BandoneonHandProps {
  title: string;
  notes: string[][];
  activeNotes: string[];
  isRightHand: boolean;
}

export const BandoneonHand: React.FC<BandoneonHandProps> = ({ title, notes, activeNotes, isRightHand }) => {
  const buttons = createHandButtons(isRightHand ? rightHandMatrix : leftHandMatrix, notes);

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-4rem)] flex items-center justify-center p-2">
        <div className="w-full h-full flex items-center justify-center">
          <svg width="100%" height="100%" viewBox="0 0 500 250" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(20, 20)">
              {buttons.map((button) => (
                <BandoneonButton
                  key={`${button.row}-${button.col}`}
                  x={button.x}
                  y={button.y}
                  isActive={activeNotes.includes(button.note)}
                  isRightHand={isRightHand}
                  note={button.note}
                />
              ))}
            </g>
          </svg>
        </div>
      </CardContent>
    </Card>
  );
};