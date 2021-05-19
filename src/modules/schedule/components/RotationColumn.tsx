import React from 'react';
import { Typography } from '@material-ui/core';

interface RotationColumnProps {
  selectedAircraftName: string,
  rotation: any
}

export default function RotationColumn({
  selectedAircraftName,
  rotation
}: RotationColumnProps) {
  return (
    <>
      <Typography>{selectedAircraftName}</Typography>
      {rotation.map((r: any) => <p>{r}</p>)}
    </>
  );
}
