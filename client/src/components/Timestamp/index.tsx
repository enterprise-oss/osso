import { format, isValid, parseISO } from 'date-fns';
import React, { ReactElement } from 'react';

export default function Timestamp({
  timestamp,
  variant = 'long',
}: {
  timestamp: string;
  variant?: 'short' | 'long' | 'month';
}): ReactElement {
  const date = parseISO(timestamp);

  if (!isValid(date)) {
    return null;
  }

  const formats = {
    long: 'd MMMM y',
    short: 'P',
    month: 'MM/y',
  };

  const formatted = format(date, formats[variant]);
  return <span>{formatted}</span>;
}
