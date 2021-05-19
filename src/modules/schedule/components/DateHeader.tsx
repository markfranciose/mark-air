import React from 'react';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';

export default function DateHeader() {
  const TODAY = new Date().getTime();
  const TOMORROW = new Date(TODAY + 86400000);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <NavigateBefore />
      <p>{TOMORROW.toLocaleString()}</p>
      <NavigateNext />
    </div>
  );
}
