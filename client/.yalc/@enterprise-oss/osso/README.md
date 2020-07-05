`osso-react` provides a collection of React components and hooks to help developers provide functionality in their React applications that allow users to configure SAML-based Single Sign On configuration for an account.

This library is primarily intended to be used within the Osso ecosystem, but can provide some utility to developers who are rolling their own SSO solution. Learn more about Osso at ossoapp.com, and skip below for non-Osso usecases.

## Osso Developers

If your team uses an Osso instance to manage SAML-based SSO for your enterprise accounts, you'll need to create an `EnterpriseAccount` on your Osso instance for each account who wishes to use SSO. An `IdentityProvider` must be configured to establish a secure handshake between your Osso instance and the account's Identity Provider instance.

Osso offers multiple approaches to provide this functionality to your internal users (teammates in Sales or Customer Success) and / or your end users who can configure SSO for their own accounts. These approaches range from low effort / no customization to a highly customizable approach.

### Admin UI

Osso instances offer an Admin UI out of the box. The Admin UI React application uses `osso-react` itself, and you can see some examples in the main `osso` repo.

If you use the Admin UI, you do not need to do anything with this package. This is the lowest effort approach, and offers the least customization, but supports configuration by both internal users and end users. See the Admin UI docs.

### Modal Widget

Osso also offers a modal widget that you can use in your web application. The modal widget also makes use of `osso-react` and provides further examples. 

This approach requires a little more effort than the Admin UI, but still does nto offer much customization. The primary benefit of using this approach is that the user configuring the Identity Provider will stay on your site. The modal widget also does not require that you use React in your application.

If you wish to use the modal widget, see the Modal Widget docs.

### UI Based Components

`osso-react` provides a handful of React components that can be used in your application with some customization.

The components offered are primarily form or form-like components. The general approach `osso-react` takes with these components is to allow the developer to provide individual components for elements like Buttons and Inputs, while `osso-react` handles things like form layouts and copy.

Using `osso-react` components takes some effort, but the forms should feel right at home in your application. You can view some examples in the examples directory that demonstrate integrating Osso with some popular UI kits.

### Headless Hooks

`osso-react` also offers hooks that will allow you to create your own entirely custom forms that gather all of the required information. Additional hooks allow you to fetch and submit Identity Provider data to your Osso instance GraphQL API.

The API hooks are wrappers around Apollo Client, so if you use Apollo you should feel right at home. 
