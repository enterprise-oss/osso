import {
  DeleteOutlined,
  PlusOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';
import { RedirectUri, useOAuthClient } from '@enterprise-oss/osso';
import { Button, Form, Input, Modal, Tooltip } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { ReactElement, useReducer } from 'react';

const reducer = (state: RedirectUri[], action) => {
  switch (action.type) {
    case 'valueChanged':
      return state.map((uri) => {
        if (uri.id !== action.id) return uri;
        return { ...uri, uri: action.value };
      });
    case 'makePrimary':
      return state.map((uri) => ({ ...uri, primary: uri.id === action.id }));
    case 'addNew':
      return [
        ...state,
        {
          uri: '',
          primary: state.length ? false : true,
          id: `${Math.random()}`,
        },
      ];
    case 'remove':
      return state.filter((uri) => uri.id !== action.id);
    default:
      throw new Error();
  }
};

export default function RedirectUrisModal({
  oauthClientId,
  redirectUris,
  closeModal,
  open,
}: {
  oauthClientId: string;
  redirectUris: RedirectUri[];
  closeModal: () => void;
  open: boolean;
}): ReactElement {
  const [state, dispatch] = useReducer(reducer, redirectUris);

  const { setRedirectUris } = useOAuthClient(oauthClientId);
  const [form] = useForm();
  return (
    <Modal
      width={640}
      title="Edit redirects"
      visible={open}
      onCancel={closeModal}
      destroyOnClose={true}
      footer={
        <>
          <Button
            onClick={() => {
              closeModal();
              form.resetFields();
            }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={() => {
              form
                .validateFields()
                .then(() => {
                  const obj = state.reduce(
                    (uris, uri) => [
                      ...uris,
                      { id: uri.id, primary: uri.primary, uri: uri.uri },
                    ],
                    [],
                  );
                  return setRedirectUris(obj);
                })
                .then(() => {
                  form.resetFields();
                  closeModal();
                })
                .catch((error) => {
                  console.error(error);
                });
            }}
          >
            Done
          </Button>
        </>
      }
    >
      <Form
        layout="vertical"
        form={form}
        hideRequiredMark={true}
        initialValues={state.reduce(
          (values, obj, index) => ({ ...values, [`uri-${index}`]: obj.uri }),
          {},
        )}
      >
        {state.map((uriObject, index) => (
          <Form.Item
            validateTrigger="onSubmit"
            rules={[
              {
                required: true,
                type: 'url',
                message: 'Enter a valid URI with protocol',
              },
            ]}
            key={uriObject.id}
            name={`uri-${index}`}
          >
            <div>
              <Input
                defaultValue={uriObject.uri}
                onChange={(event) =>
                  dispatch({
                    type: 'valueChanged',
                    id: uriObject.id,
                    value: event.target.value,
                  })
                }
                prefix={
                  <Tooltip
                    title={uriObject.primary ? 'Primary' : 'Make primary'}
                  >
                    {uriObject.primary ? (
                      <StarFilled />
                    ) : (
                      <StarOutlined
                        onClick={() =>
                          dispatch({ type: 'makePrimary', id: uriObject.id })
                        }
                      />
                    )}
                  </Tooltip>
                }
                suffix={
                  <Tooltip title="Remove">
                    <DeleteOutlined
                      onClick={() =>
                        dispatch({ type: 'remove', id: uriObject.id })
                      }
                    />
                  </Tooltip>
                }
              />
            </div>
          </Form.Item>
        ))}
        <Button
          shape="circle"
          icon={<PlusOutlined />}
          onClick={() => dispatch({ type: 'addNew' })}
        />
      </Form>
    </Modal>
  );
}
