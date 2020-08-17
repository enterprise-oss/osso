import React, { CSSProperties, ReactElement } from 'react';

export default function HorizontalRule({
  style,
}: {
  style?: CSSProperties;
}): ReactElement {
  return (
    <hr
      style={{
        ...{ border: 'none', borderTop: '1px solid #e8e8e8' },
        ...style,
      }}
    />
  );
}
