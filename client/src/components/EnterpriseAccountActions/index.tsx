import { DownOutlined } from '@ant-design/icons';
import { useEnterpriseAccount } from '@enterprise-oss/osso';
import { Button, Dropdown, Menu } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';

import CreateIdentityProvider from '~/client/src/components/CreateIdentityProvider';

export default function EnterpriseAccountActions({
  domain,
}: {
  domain: string;
}): ReactElement {
  const [modalOpen, setModalOpen] = useState(false);
  const [key, setKey] = useState(Math.random());

  useEffect(() => {
    if (modalOpen) return;
    setTimeout(() => {
      setKey(Math.random());
    }, 500);
  }, [modalOpen]);

  const { data } = useEnterpriseAccount(domain);

  const menu = (
    <Menu>
      <Menu.Item onClick={() => setModalOpen(true)} key="addIdp">
        Add new IDP
      </Menu.Item>
      <Menu.Item key="destroyCustomer">Delete customer</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu}>
        <Button type="primary">
          Actions <DownOutlined />
        </Button>
      </Dropdown>

      <CreateIdentityProvider
        key={key}
        closeModal={() => setModalOpen(false)}
        enterpriseAccount={data?.enterpriseAccount}
        open={modalOpen}
      />
    </>
  );
}
