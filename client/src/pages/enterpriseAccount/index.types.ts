import { RouteComponentProps } from 'react-router-dom';

export interface MatchParams {
  domain: string;
}

export interface MatchProps extends RouteComponentProps {
  params: MatchParams,
}

export type InputProps = {
  match: MatchProps;
};


