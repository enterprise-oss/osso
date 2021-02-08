import { Providers, useOssoFields } from '@enterprise-oss/osso';
import classnames from 'classnames';
import React, { ReactElement } from 'react';

import {
  primaryContainer,
  providerActive,
  providerLabel,
  providerLogo,
  providerStyles,
  secondaryContainer,
  secondaryProvider,
} from './index.module.css';
export default function ProviderPicker({
  provider,
  onChange,
}: {
  provider?: Providers;
  onChange?: (value: Providers) => void;
}): ReactElement {
  const { providers } = useOssoFields();

  return (
    <>
      <div className={primaryContainer}>
        {Object.values(providers)
          .filter((provider) => provider.primary)
          .map((providerOption) => (
            <div
              key={providerOption.value}
              className={classnames(providerStyles, {
                [providerActive]: provider === providerOption.value,
              })}
              onClick={() => onChange(providerOption.value)}
            >
              <img src={providerOption.iconUrl} className={providerLogo} />
              <span className={providerLabel}>{providerOption.label}</span>
            </div>
          ))}
      </div>
      <div className={secondaryContainer}>
        {Object.values(providers)
          .filter((provider) => !provider.primary)
          .map((providerOption) => (
            <div
              key={providerOption.value}
              className={classnames(secondaryProvider, {
                [providerActive]: provider === providerOption.value,
              })}
              onClick={() => onChange(providerOption.value)}
            >
              <span className={providerLabel}>
                {providerOption.description}
              </span>
            </div>
          ))}
      </div>
    </>
  );
}
