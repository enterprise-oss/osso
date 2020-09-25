import { generate, orange, PalettesProps } from '@ant-design/colors';

const presetPrimaryColors: {
  [key: string]: string;
} = {
  red: '#EC5B56',
  gold: '#FFCD83',
  green: '#73BA9B',
  blue: '#4E61A5',
};

const presetPalettes: PalettesProps = {};

Object.keys(presetPrimaryColors).forEach((key): void => {
  presetPalettes[key] = generate(presetPrimaryColors[key]);
  presetPalettes[key].primary = presetPalettes[key][5];
});

const red = presetPalettes.red;
const gold = presetPalettes.gold;
const green = presetPalettes.green;
const blue = presetPalettes.blue;

export { red, gold, blue, green, orange };
