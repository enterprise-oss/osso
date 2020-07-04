import { OssoProvider, ProviderMap, Providers } from './index.types';
import { azure, okta } from './providers';

const providers: ProviderMap<Providers> = {
  [Providers.Azure]: azure,
  [Providers.Okta]: okta,
};

const useOssoFields = (): {
  fieldsForProvider: (provider: Providers) => OssoProvider;
  providers: ProviderMap<Providers>;
} => {
  const fieldsForProvider = (provider: Providers) => {
    return providers[provider];
  };

  return {
    providers,
    fieldsForProvider,
  };
};

export default useOssoFields;
