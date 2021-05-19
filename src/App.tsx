import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';

import defaultTheme from './Theme';
import Schedule from './modules/schedule/Schedule';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Schedule />
    </ThemeProvider>
  );
}

export default App;
