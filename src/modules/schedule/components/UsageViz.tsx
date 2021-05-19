import React from 'react';
// @ts-ignore
import HSBar from 'react-horizontal-stacked-bar-chart';

export default function UsageViz({ rotation }: any) {
  if (isValid(rotation)) {
    const util = calculateUtlization(rotation);
    return (
      <>
        <p>{`valid ${util}`}</p>
        <CoolChart rotation={rotation} />
      </>
    );
  }
  return <p>invalid</p>;
}

function isValid(rotation: any) {
  if (rotation.length < 2) { return true; }

  return checkTimes(rotation);
}

/** The difference between the */
function checkTimes(rotation: any) {
  for (let i = 1; i < rotation.length; i += 1) {
    const departure = rotation[i].departuretime;
    const { origin } = rotation[i];

    const arrival = rotation[i - 1].arrivaltime;
    const { destination } = rotation[i - 1];

    const lessThan20MinuteOverlap = departure - arrival < 1200;
    const wrongAirport = origin !== destination;

    if (lessThan20MinuteOverlap || wrongAirport) { return false; }
  }
  return true;
}

function calculateUtlization(rotation: any) {
  const time = rotation.reduce((acc: number, o: any) => acc + (o.arrivaltime - o.departuretime), 0);

  return (time / 86400) * 100;
}

const COLOR_CODES = {
  IDLE: 'lightgrey',
  SCHEDULED: 'lightgreen',
  TURN: 'lightpurple'
};

function CoolChart({ rotation }: any) {
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
  console.log(data);
  return (
    <HSBar
      data={data}
    />
  );
}
