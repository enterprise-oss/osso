import { DownloadOutlined } from '@ant-design/icons';
import { OssoButtonComponentProps } from '@enterprise-oss/osso';
import { Button } from 'antd';
import React, { ReactElement } from 'react';

export default function ButtonComponent({
  children,
  onClick,
}: OssoButtonComponentProps): ReactElement {
  return (
    <Button type="ghost" onClick={onClick} icon={<DownloadOutlined />}>
      {children}
    </Button>
  );
}
