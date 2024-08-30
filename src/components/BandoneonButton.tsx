import React from 'react'

interface BandoneonButtonProps {
  x: number;
  y: number;
  isActive: boolean;
  isRightHand: boolean;
  note: string;
}

export const BandoneonButton: React.FC<BandoneonButtonProps> = ({ x, y, isActive, isRightHand, note }) => (
  <g>
    <circle
      cx={x}
      cy={y}
      r="15"
      fill={isActive ? (isRightHand ? "#ff4136" : "#0074D9") : "#F0F0F0"}
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