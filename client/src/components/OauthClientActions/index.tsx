import { DownOutlined } from '@ant-design/icons';
import { createOauthClient, useOAuthClient } from '@enterprise-oss/osso';
import { Button, Dropdown, Menu } from 'antd';
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

// const newName = (name: string) => {
//   if (name.match(/.*\s-\scopy$/)) {
//     return name + ' (1)';
//   }

//   const regex = /.*\s-\scopy\s\((\d)\)$/g;
//   const match = regex.exec(name);

//   if (match) {
//     return name.replace(match[1], String(parseInt(match[1], 10) + 1));
//   }

//   return name + ' - copy';
// };

export default function EnterpriseAccountActions({
  id,
}: {
  id: string;
}): ReactElement {
  const { data, deleteClient } = useOAuthClient(id);
  const name = data?.oauthClient?.name;
  const history = useHistory();
  const { createClient } = createOauthClient();

  return (
    <>
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item
              onClick={() =>
                createClient(name).then((resp) => {
                  const id = resp?.data?.createOauthClient?.oauthClient?.id;
                  if (id) {
                    history.push(`/config/${id}`);
                  }
                })
              }
            >
              Duplicate
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                deleteClient().then(() => {
                  history.replace('/config');
                });
              }}
            >
              Delete client
            </Menu.Item>
          </Menu>
        }
      >
        <Button type="primary">
          Actions <DownOutlined />
        </Button>
      </Dropdown>
    </>
  );
}
