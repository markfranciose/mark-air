import React from 'react';

export default function UsageViz({ rotation }: any) {
  if (isValid(rotation)) {
    const util = calculateUtlization(rotation);
    console.log(util);
    return <p>{`valid ${util}`}</p>;
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
