import React from 'react';
import { Window } from 'react95';
import LoaderImage from './loader.gif';
import WindowHeader from '../WindowHeader';

export default function Loader() {
  return (
    <Window>
      <WindowHeader title="Logging On" />
      <img src={LoaderImage} alt="aol loader" />
    </Window>
  );
}