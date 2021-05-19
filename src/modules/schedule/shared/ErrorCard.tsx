import React from 'react';
import { Card, Typography } from '@material-ui/core';
import { Error } from '@material-ui/icons';

interface ErrorCardProps {
  errorMessage: string;
}

export default function ErrorCard({
  errorMessage
}: ErrorCardProps) {
  return (
    <Card data-testid="error-card">
      <Error />
      <Typography>
        { errorMessage }
      </Typography>
    </Card>
  );
}
