import {
  CheckCircleFilled,
  DownloadOutlined,
  ExclamationCircleFilled,
  InfoCircleFilled,
  WarningFilled,
} from '@ant-design/icons';
import { IdentityProvider, IdentityProviderStatus } from '@enterprise-oss/osso';
import { Button, Tag } from 'antd';
import React, { ReactElement } from 'react';

import { blue, gold, green, red } from './colors';

export function StatusCopy({
  identityProvider,
}: {
  identityProvider: IdentityProvider;
}): ReactElement {
  switch (identityProvider.status) {
    case IdentityProviderStatus.pending:
      return (
        <span>
          Users from this IDP won&apos;t be able to sign in until you or your
          customer finishes configuration.
        </span>
      );
    case IdentityProviderStatus.configured:
      return (
        <span>
          This IDP is configured and ready for users to sign in. Once a user has
          signed in successfully, the status will change to Active.
        </span>
      );
    case IdentityProviderStatus.active:
      return (
        <span>
          Your customer&apos;s users are successfully signing in using this IDP
        </span>
      );
    case IdentityProviderStatus.error:
      return (
        <span>
          Something went wrong with a user signing into this IDP. Review
          configuration with your customer.
        </span>
      );
  }
}

export function StatusIcon({
  identityProvider,
  className,
}: {
  identityProvider: IdentityProvider;
  className: string;
}): ReactElement {
  console.log(gold);
  switch (identityProvider.status) {
    case IdentityProviderStatus.pending:
      return (
        <WarningFilled
          style={{ color: color(identityProvider.status).primary }}
          className={className}
        />
      );
    case IdentityProviderStatus.configured:
      return (
        <InfoCircleFilled
          color={color(identityProvider.status).primary}
          className={className}
        />
      );
    case IdentityProviderStatus.active:
      return (
        <CheckCircleFilled
          color={color(identityProvider.status).primary}
          className={className}
        />
      );
    case IdentityProviderStatus.error:
      return (
        <ExclamationCircleFilled
          color={color(identityProvider.status).primary}
          className={className}
        />
      );
  }
}

export function StatusActions({
  identityProvider,
  className,
  onActions,
}: {
  identityProvider: IdentityProvider;
  className?: string;
  onActions?: ((arg?: any) => void)[];
}): ReactElement {
  switch (identityProvider.status) {
    case IdentityProviderStatus.pending:
      return (
        <>
          <Button
            type="ghost"
            href={identityProvider.documentationPdfUrl}
            icon={<DownloadOutlined />}
          >
            Download PDF
          </Button>
          <Button
            onClick={(args) => onActions[1](args)}
            style={{ marginLeft: 16 }}
            type="primary"
          >
            Complete setup
          </Button>
        </>
      );
    case IdentityProviderStatus.configured:
    case IdentityProviderStatus.active:
      return null;
    case IdentityProviderStatus.error:
      return (
        <ExclamationCircleFilled
          style={{ color: color(identityProvider.status).primary }}
          className={className}
        />
      );
  }
}

const color = (status: IdentityProviderStatus) => {
  return {
    [IdentityProviderStatus.pending]: gold,
    [IdentityProviderStatus.configured]: blue,
    [IdentityProviderStatus.active]: green,
    [IdentityProviderStatus.error]: red,
  }[status];
};

const colorString = (status: IdentityProviderStatus) => {
  return {
    [IdentityProviderStatus.pending]: 'gold',
    [IdentityProviderStatus.configured]: 'blue',
    [IdentityProviderStatus.active]: 'green',
    [IdentityProviderStatus.error]: 'red',
  }[status];
};

export function StatusTag({
  identityProvider,
  className,
}: {
  identityProvider: IdentityProvider;
  className?: string;
}): ReactElement {
  return (
    <Tag
      style={{ margin: 0 }}
      color={colorString(identityProvider.status)}
      className={className}
    >
      {identityProvider.status}
    </Tag>
  );
}
const order = [
  IdentityProviderStatus.error,
  IdentityProviderStatus.pending,
  IdentityProviderStatus.configured,
  IdentityProviderStatus.active,
];

export const byStatus = (
  { status: a }: { status: IdentityProviderStatus },
  { status: b }: { status: IdentityProviderStatus },
): number => {
  if (a === b) return 0;
  const aIdx = order.indexOf(a);
  const bIdx = order.indexOf(b);
  return aIdx < bIdx ? -1 : 1;
};
