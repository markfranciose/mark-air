import React from 'react';
// @ts-ignore
import HSBar from 'react-horizontal-stacked-bar-chart';
import { Button, Typography } from '@material-ui/core';

import { isValidRotation } from '../../../helpers/helpers';

export default function UsageViz({
  rotation,
  resetRotation
}: any) {
  if (isValidRotation(rotation)) {
    return (
      <HorizontalBarChart rotation={rotation} />
    );
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography style={{ marginRight: 12 }} color="error" data-testid="invalid-rotation">invalid rotation</Typography>
      <Button variant="outlined" onClick={resetRotation}>
        Reset
      </Button>
    </div>
  );
}

const COLOR_CODES = {
  IDLE: 'lightgrey',
  SCHEDULED: 'lightgreen',
  TURN: 'plum'
};

function HorizontalBarChart({ rotation }: any) {
  function generateData() {
    if (!rotation) {
      return [{ value: 100, color: COLOR_CODES.IDLE }];
    }

    if (rotation.length === 0) {
      return [{ value: 100, color: COLOR_CODES.IDLE }];
    }

    const flights: any[] = [];
    const TURNOVER_DATA = { value: 20 * 60, color: COLOR_CODES.TURN };
    rotation.forEach((flight: any, index: number) => {
      flights.push({
        value: flight.arrivaltime - flight.departuretime,
        color: COLOR_CODES.SCHEDULED
      });
      flights.push(TURNOVER_DATA);

      if (index !== rotation.length - 1) {
        flights.push({
          value: rotation[index + 1].departuretime - (flight.arrivaltime + (20 * 60)),
          color: COLOR_CODES.IDLE
        });
      }
    });

    return [
      { value: rotation[0].departuretime, color: COLOR_CODES.IDLE },
      ...flights,
      { value: 86400 - rotation[rotation.length - 1].arrivaltime, color: COLOR_CODES.IDLE }
    ];
  }

  const data = generateData();
  return (
    <div
      data-testid="valid-bar-chart"
      style={{ width: 400 }}
    >
      <HSBar
        data={data}
      />
    </div>
  );
}
