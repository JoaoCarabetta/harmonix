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
      strokeWidth="2"
    />
    <circle
      cx={x}
      cy={y}
      r="18"
      fill="none"
      stroke={isActive ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.05)"}
      strokeWidth="1"
    />
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="14"
      fill={isActive ? "#FFFFFF" : "#4A5568"}
      fontWeight={isActive ? "bold" : "normal"}
      style={{ textShadow: isActive ? '0 1px 2px rgba(0,0,0,0.3)' : 'none' }}
    >
      {note}
    </text>
  </g>
)