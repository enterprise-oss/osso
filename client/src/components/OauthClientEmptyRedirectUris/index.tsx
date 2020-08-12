import { PlusCircleFilled } from '@ant-design/icons';
import { Button, Card } from 'antd';
import React, { ReactElement } from 'react';

import { blue } from '~/client/src/utils/colors';

import styles from './index.module.css';

export default function EmptyAccountIdentityProviders({
  onAdd,
}: {
  onAdd: () => void;
}): ReactElement {
  return (
    <>
      <Card className={styles.cardRoot} size="small">
        <div className={styles.cardBody}>
          <PlusCircleFilled
            className={styles.icon}
            style={{ color: blue.primary }}
          />
          <p>
            In order to begin using this client, you&apos;ll need to specify
            your redirect URIs.
          </p>
        </div>
        <div className={styles.cardFooter}>
          <Button onClick={onAdd} type="primary">
            Add new redirect
          </Button>
        </div>
      </Card>
    </>
  );
}
