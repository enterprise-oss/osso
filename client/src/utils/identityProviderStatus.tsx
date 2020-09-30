import { IdentityProvider, IdentityProviderStatus } from '@enterprise-oss/osso';
import { Tag } from 'antd';
import React, { ReactElement } from 'react';

import { blue, green, orange, red } from './colors';

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

export const color = (
  status: IdentityProviderStatus,
): string[] & {
  primary?: string | undefined;
} => {
  return {
    [IdentityProviderStatus.pending]: orange,
    [IdentityProviderStatus.configured]: blue,
    [IdentityProviderStatus.active]: green,
    [IdentityProviderStatus.error]: red,
  }[status];
};

const colorString = (status: IdentityProviderStatus) => {
  return {
    [IdentityProviderStatus.pending]: 'orange',
    [IdentityProviderStatus.configured]: 'blue',
    [IdentityProviderStatus.active]: 'green',
    [IdentityProviderStatus.error]: 'red',
  }[status];
};

export const backgroundColor = (status: IdentityProviderStatus): string => {
  return {
    [IdentityProviderStatus.pending]: '#FEF3E8',
    [IdentityProviderStatus.configured]: '#EDEFF6',
    [IdentityProviderStatus.active]: '#F1F8F5',
    [IdentityProviderStatus.error]: '#FEF4F4',
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

export function StatusStringTag({
  identityProvider,
  className,
}: {
  identityProvider: IdentityProvider;
  className?: string;
}): ReactElement {
  return (
    <span
      style={{ color: color(identityProvider.status).primary, fontWeight: 600 }}
      className={className}
    >
      {identityProvider.status}
    </span>
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
