<p align="center">
  Osso (logo)
  <img width="600px" src="https://raw.githubusercontent.com/ksensehq/eventnative/master/artwork/en-video.gif" />
</p>


<table>
  <tr>
    <td>
      <img width="200"  src="https://github.com/enterprise-oss/osso/blob/main/public/favicon/android-chrome-512x512.png?raw=true" />
    </td>
    <td><br/>
    
**Osso** is an open source microservice for adding SAML based SSO to your app. Deploy Osso to your infrastructure of choice, use the Osso Admin UI or [osso-react](https://github.com/enterprise-oss/osso-react) to configure SAML for your customers that demand it, and sign them in to your application using OAuth with one of our OAuth client libraries, [omniuath-osso](https://github.com/enterprise-oss/omniauth-osso) or [passport-osso](https://github.com/enterprise-oss/omniauth-osso).
<br/><br/>
<table>
  <tr>
    <td>

**osso** <br/> [![Build status](https://badge.buildkite.com/7e933f15ee68031e7bd2da5f0f5fcff77c7a2898911507de2a.svg?branch=main)](https://buildkite.com/enterpriseoss/osso)
</td>
<td>
    
**osso-rb** <br/> [![Build status](https://badge.buildkite.com/0e01845bdd51be4131b9cbd496d9caa39cd48f171fc2d9a9ca.svg?branch=main)](https://buildkite.com/enterpriseoss/osso-rb)
</td>

<td>
    
**osso-react** <br/> [![Build status](https://badge.buildkite.com/3ef31f87d8369e801ccdfde95f3e25dce4ba791a0f6dac288e.svg?branch=main)](https://buildkite.com/enterpriseoss/osso-react)
</td>
<td>
    
**omniauth-osso** <br/> [![Build status](https://badge.buildkite.com/3ef31f87d8369e801ccdfde95f3e25dce4ba791a0f6dac288e.svg?branch=main)](https://buildkite.com/enterpriseoss/osso-react)
</td>
<td>
    
**passport-osso** <br/> [![Build status](https://badge.buildkite.com/3ef31f87d8369e801ccdfde95f3e25dce4ba791a0f6dac288e.svg?branch=main)](https://buildkite.com/enterpriseoss/osso-react)
</td>
</tr>
</table>
</td>
  </tr>
</table>
<br>


<a href="#"><img align="right" src="https://raw.githubusercontent.com/ksensehq/eventnative/master/artwork/feat-n.png" width="40px" /></a>



## Features
 * **Treat SAML like OAuth**: SAML is clunky, and you're probably already using OAuth. Osso provides an OAuth server, an Admin UI for managing OAuth clients, and OAuth client libraries for Ruby and NodeJS. Let Osso worry about the ugly SAML bits and customer configuration while your team focuses on your core application.
 
 * **SAML Config in Osso's UI or yours**: For every customer who demands SAML SSO, you'll need to go through a multistep process of creating a secure handshake between Osso and the customer's SAML provider. Get started quickly by configuring your customers' SAML providers in the Osso Admin UI, or allow your customers to perform configuration themselves in your UI with hooks and components from our React library [osso-react](https://github.com/enterprise-oss/osso-react).
 
 * **Docs for everyone**: SAML is an open specification, but each provider uses specific terminolgoy and offers their own workflows for adding a new application. Osso generates PDF documentation with the data your customer needs to configure your app in any provider, and provides thorough documentation for your team who integrates and manages your Osso instance.


<a href="#">
  <img align="right" src="https://raw.githubusercontent.com/ksensehq/eventnative/master/artwork/quick-n.png" width="40px">
</a>

## Get Started

#### Deploy
The fastest way to get started is to [deploy to Heroku](https://docs.eventnative.dev/deployment/deploy-on-heroku):

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

We also offer paid hosted plans that can reduce the integration workload on your development team.

Git-based deploys are another recommended way to deploy and maintain your own Osso instance. Updates will primarily be made in osso-rb and osso-react, libraries that provide the core functionality, so be sure to stay on top of updates.

We also offer A Dockerfile for Docker based deploys. *TODO: get some help with this. maybe make a list of options?*

#### Authenticate to Admin UI

Osso uses JWTs for Admin auth. Craft a JWT on your own server with `{scope: 'admin', email: 'you@company.com'}`, sign it with your `JWT_HMAC_SECRET` and send yourself to Osso with a `token` query parameter - see our JWT Authentication docs for more.

Osso hosted plans let you skip this step, and provide a team management portal (SAML auth supported 😉) for logging in to your Osso Admin UI.

#### Consume OAuth

When a user wants to sign in to your application with SAML, send them to Osso with their email domain as part of an OAuth 2.0 authorization flow. Osso routes the user to their SAML provider, normalizes the payload, and sends them back to your application to complete the OAuth flow.

Use [omniauth-osso](https://github.com/enterprise-oss/omniauth-osso) or [passport-osso](https://github.com/enterprise-oss/omniauth-osso) for more convenience.

## Documentation

Osso's primary documentation is at [ossoapp.com](https://ossoapp.com). Key sections include:
* [SSO and SAML Background](https://docs.eventnative.dev/scaling-eventnative) - Learn about Single Sign-On and SAML, why your customers want it and how to integrate it to your offering. 
 * [Deployment](https://docs.eventnative.dev/deployment) - Guides for deploying Osso to Heroku, via git or Docker, plus how to keep your instance up to date.
 * [JWT Authentication](https://docs.eventnative.dev/configuration) - Authenticating admin or end-users to your Osso instance to configure SAML providers or OAuth clients.
 * [OAuth Setup](https://docs.eventnative.dev/configuration) - Authenticating SAML users to your application via OAuth.  
 * [Self-serve Integration](https://docs.eventnative.dev/geo-data-resolution) - Use our React library to build forms in your app that allow your customers to configure SAML themselves.
 
 

<a href="#"><img align="right" src="https://raw.githubusercontent.com/ksensehq/eventnative/master/artwork/com-n.png" width="40px" /></a>
##  Community
We'd be thrilled to receive community contributions, but please note that Osso is owned and managed by a for-profit company, EnterpriseOSS, and you will not be compensated for your contributions. The goal of the project is to provide boilerplate code that you can evaluate to be certain you're confident running it in production, lowering the cost of adding better security for your customers while staying off of the [SSO Wall of Shame](https://sso.tax/).

<a href="#"><img align="right" src="https://raw.githubusercontent.com/ksensehq/eventnative/bb6a40cc5f0a84d29b270f510ea4f632f3314e71/artwork/ksense-logo.svg" width="40px" /></a>
## Open Source

Osso is developed and maintained by EntepriseOSS with a Business Source License. BSL is used by companies like [Sentry](https://sentry.io/_/open-source/) and [MariaDB](https://mariadb.com/bsl-faq-mariadb/). While not _technically_ an open source license according to OSI, you are only prohibited from using Osso to compete with hosted Osso plans offered by EnterpriseOSS.