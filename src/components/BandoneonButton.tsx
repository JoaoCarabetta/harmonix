import React from 'react'

interface BandoneonButtonProps {
  x: number;
  y: number;
  isActive: boolean;
  isRightHand: boolean;
  note: string;
  color: string;
}

export const BandoneonButton: React.FC<BandoneonButtonProps> = ({ x, y, isActive, isRightHand, note, color }) => (
  <g>
    <circle
      cx={x}
      cy={y}
      r="15"
      fill={color}
      stroke="#000000"
      strokeWidth="2"
    />
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="10"
      fill={isActive ? "#FFFFFF" : "#000000"}
    >
      {note}
    </text>
  </g>
)