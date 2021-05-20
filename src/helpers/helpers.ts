export function isValidRotation(rotation: any) {
  if (rotation.length < 2) { return true; }

  return isValid(rotation);
}

function isValid(rotation: any) {
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
