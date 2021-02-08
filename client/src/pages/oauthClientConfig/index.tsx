import { useOAuthClient } from '@enterprise-oss/osso';
import { Button, Card, Col, Row, Spin } from 'antd';
import React, { ReactElement, useState } from 'react';

import OauthClientEmptyRedirectUris from '~/client/src/components/OauthClientEmptyRedirectUris';
import OauthClientHeader from '~/client/src/components/OauthClientHeader';
import OauthClientRedirectUris from '~/client/src/components/OauthClientRedirectUris';
import RedirectUrisModal from '~/client/src/components/RedirectUrisModal';

import { card, cardTopRow } from './index.module.css';
import { OauthClientPageProps } from './index.types';

export default function OauthClientConfig(
  props: OauthClientPageProps,
): ReactElement {
  const { data, loading, error: _error } = useOAuthClient(
    props.match.params.id,
  );

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Row gutter={[24, 24]}>
        <Col sm={24} lg={12}>
          <Card className={card}>
            {loading ? (
              <Spin />
            ) : (
              <OauthClientHeader oauthClient={data.oauthClient} />
            )}
          </Card>
        </Col>
        <Col sm={24} lg={12}>
          <Card className={card}>
            <div className={cardTopRow}>
              <h1>Redirects</h1>
              <Button size="small" onClick={() => setModalOpen(true)}>
                Edit
              </Button>
            </div>
            {loading ? (
              <Spin />
            ) : data.oauthClient.redirectUris.length === 0 ? (
              <OauthClientEmptyRedirectUris onAdd={() => setModalOpen(true)} />
            ) : (
              <OauthClientRedirectUris oauthClient={data.oauthClient} />
            )}
          </Card>
        </Col>
      </Row>
      {data && (
        <RedirectUrisModal
          redirectUris={data?.oauthClient?.redirectUris}
          oauthClientId={data?.oauthClient?.id}
          open={modalOpen}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
