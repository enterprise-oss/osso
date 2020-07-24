import { DownOutlined } from '@ant-design/icons';
import {
  deleteEnterpriseAccount,
  useEnterpriseAccount,
} from '@enterprise-oss/osso';
import { Button, Dropdown, Menu } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

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
  const { deleteAccount } = deleteEnterpriseAccount();
  const history = useHistory();
  return (
    <>
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item onClick={() => setModalOpen(true)}>
              Add new IDP
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                deleteAccount(data?.enterpriseAccount?.id);
                history.replace('/enterprise');
              }}
            >
              Delete customer
            </Menu.Item>
          </Menu>
        }
      >
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
