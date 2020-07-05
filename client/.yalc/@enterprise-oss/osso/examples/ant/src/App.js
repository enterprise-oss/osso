import React from 'react';
import './App.css';

import {
  Form,
  Input,
  Select,
  Button,
} from 'antd';

const InputComponent = ({ label, ...inputProps }) => (
  <Form.Item label={label}>
    <Input {...inputProps} />
  </Form.Item>
);

function App() {
  const [provider, setProvider] = useState();
  const { providers, fieldsForProvider } = useOssoFields();

  // Provided by client side Osso hook - pass the desired service to 
  // the function to receive an object describing the fields needed to 
  // configure an Identity Provider instance for that service
  const providerDetails = fieldsForProvider(activeIdentityProvider.value);

  // Normally provided by GraphQL-based Osso hook, data here is mocked
  const identityProvider = {
    id: '2fdb5db6-4fcd-4872-80e2-6c59137370ef',
    service: activeIdentityProvider.value,
    acsUrl: 'http://demo.ossoapp.io/auth/saml/2fdb5db6-4fcd-4872-80e2-6c59137370ef/callback',
  };


  return (
    <div className="App">
      <Select style={{ width: 120 }} onChange={(value) => setProvider(value)}>
        {Object.values(providers).map((provider) => (
          <Select.Option value={provider.value}>{provider.label}</Select.Option>
        ))}
      </Select>
    </div>
  );
}

export default App;
