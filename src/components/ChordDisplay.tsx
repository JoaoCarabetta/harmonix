import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

interface ChordDisplayProps {
  rootNote: string;
  chordType: string;
  notes: string[];
}

export const ChordDisplay: React.FC<ChordDisplayProps> = ({ rootNote, chordType, notes }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">{rootNote} {chordType}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center space-x-4">
          {notes.map((note, index) => (
            <div key={index} className="text-2xl font-bold">{note}</div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};