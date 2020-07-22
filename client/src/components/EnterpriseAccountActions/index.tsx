import { DownOutlined } from '@ant-design/icons';
import { useEnterpriseAccount } from '@enterprise-oss/osso';
import { Button, Dropdown, Menu } from 'antd';
import React, { ReactElement, useState } from 'react';

import IdentityProviderForm from '~/client/src/components/IdentityProviderForm';

// import styles from './index.module.css';

export default function EnterpriseAccountActions({
  domain,
}: {
  domain: string;
}): ReactElement {
  const [modalOpen, setModalOpen] = useState(false);
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

      <IdentityProviderForm
        closeModal={() => setModalOpen(false)}
        enterpriseAccount={data?.enterpriseAccount}
        open={modalOpen}
      />
    </>
  );
}
