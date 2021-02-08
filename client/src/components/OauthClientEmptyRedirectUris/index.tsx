import { PlusCircleFilled } from '@ant-design/icons';
import { Button, Card } from 'antd';
import React, { ReactElement } from 'react';

import { blue } from '~/client/src/utils/colors';

import { cardBody, cardFooter, cardRoot, icon } from './index.module.css';

export default function EmptyAccountIdentityProviders({
  onAdd,
}: {
  onAdd: () => void;
}): ReactElement {
  return (
    <>
      <Card className={cardRoot} size="small">
        <div className={cardBody}>
          <PlusCircleFilled className={icon} style={{ color: blue.primary }} />
          <p>
            In order to begin using this client, you&apos;ll need to specify
            your redirect URIs.
          </p>
        </div>
        <div className={cardFooter}>
          <Button onClick={onAdd} type="primary">
            Add new redirect
          </Button>
        </div>
      </Card>
    </>
  );
}
