import { format, parseISO } from 'date-fns';
import React, { ReactElement } from 'react';

export default function Timestamp({
  timestamp,
  variant = 'long',
}: {
  timestamp: string;
  variant?: 'short' | 'long';
}): ReactElement {
  const date = parseISO(timestamp);

  const formats = {
    long: 'd MMMM y',
    short: 'P',
  };

  const formatted = format(date, formats[variant]);
  return <span>{formatted}</span>;
}
