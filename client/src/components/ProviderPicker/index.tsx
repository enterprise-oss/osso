import { Providers, useOssoFields } from '@enterprise-oss/osso';
import classnames from 'classnames';
import React, { ReactElement } from 'react';

import styles from './index.module.css';
export default function ProviderPicker({
  provider,
  onChange,
}: {
  provider?: Providers;
  onChange?: (value: Providers) => void;
}): ReactElement {
  const { providers } = useOssoFields();

  return (
    <div className={styles.root}>
      {Object.values(providers).map((providerOption) => (
        <div
          key={providerOption.value}
          className={classnames(styles.provider, {
            [styles.providerActive]: provider === providerOption.value,
          })}
          onClick={() => onChange(providerOption.value)}
        >
          <img src={providerOption.iconUrl} className={styles.providerLogo} />
          <span className={styles.providerLabel}>{providerOption.label}</span>
        </div>
      ))}
    </div>
  );
}
