import React from 'react';
import { Typography } from '@material-ui/core';

interface RotationColumnProps {
  selectedAircraftName: string
}

export default function RotationColumn({
  selectedAircraftName
}: RotationColumnProps) {
  return (
    <Typography>{selectedAircraftName}</Typography>
  );
}
