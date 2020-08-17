import { RouteComponentProps } from 'react-router-dom';

export interface MatchParams {
  id: string;
}

export interface MatchProps extends RouteComponentProps {
  params: MatchParams;
}

export type OauthClientPageProps = {
  match: MatchProps;
};
