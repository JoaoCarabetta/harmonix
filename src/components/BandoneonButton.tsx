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
      r="20"
      fill={isActive ? color : "#FFFFFF"}
      stroke={isActive ? "#4A5568" : "#CBD5E0"}
      strokeWidth="1.5"
    />
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="14"
      fill={isActive ? "#FFFFFF" : "#4A5568"}
      fontWeight={isActive ? "bold" : "normal"}
    >
      {note}
    </text>
  </g>
)