<p align="center">
  <img width="300px" src="https://raw.githubusercontent.com/enterprise-oss/osso/main/.github/logo.png" />
</p>

**Osso** is a source available microservice for adding SAML based SSO to your app. Deploy Osso to your infrastructure of choice, use the Osso Admin UI or [osso-react](https://github.com/enterprise-oss/osso-react) to configure SAML for your customers that demand it, and sign them in to your application using OAuth with one of our OAuth client libraries, [omniauth-osso](https://github.com/enterprise-oss/omniauth-osso) or [passport-osso](https://github.com/enterprise-oss/omniauth-osso).
<br/><br/>
<p align="center">
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
    
**omniauth-osso** <br/> [![Build status](https://badge.buildkite.com/3ef31f87d8369e801ccdfde95f3e25dce4ba791a0f6dac288e.svg?branch=main)](https://buildkite.com/enterpriseoss/omniauth-osso)
</td>
<td>
    
**passport-osso** <br/> [![Build status](https://badge.buildkite.com/6a1e4b4b0def8422ba056fcbb321f153ef875a48f15547988a.svg?branch=main)](https://buildkite.com/enterpriseoss/passport-osso)

</td>
</tr>
</table>
</p>
<br>


<!-- <a href="#"><img align="right" src="https://placekitten.com/40/40" width="40px" /></a> -->



## Features
 * **Treat SAML like OAuth**: SAML is clunky, and you're probably already using OAuth. Osso provides an OAuth server, an Admin UI for managing OAuth clients, and OAuth client libraries for Ruby and NodeJS. Let Osso worry about the ugly SAML bits and customer configuration while your team focuses on your core application.
 
 * **SAML Config in Osso's UI or yours**: For every customer who demands SAML SSO, you'll need to go through a multistep process of creating a secure handshake between Osso and the customer's SAML provider. Get started quickly by configuring your customers' SAML providers in the Osso Admin UI, or allow your customers to perform configuration themselves in your UI with hooks and components from our React library [osso-react](https://github.com/enterprise-oss/osso-react).
 
 * **Docs for everyone**: SAML is an open specification, but each Identity Provider uses specific terminology and offers their own workflows for adding a new application. Osso generates PDF documentation with the data your customer needs to configure your app in any provider, and provides thorough documentation for your team who integrates and manages your Osso instance.


<!-- <a href="#"><img align="right" src="https://placekitten.com/40/40" width="40px" /></a> -->


## Get Started

#### Deploy
The fastest way to get started is to deploy to Heroku. Heroku will deploy your app, generating required ENV variables, and boostrapping your instance's database.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/enterprise-oss/osso/tree/main)

We also offer paid hosted plans that can reduce the integration workload on your development team.

Git-based deploys are another recommended way to deploy and maintain your own Osso instance. Updates will primarily be made in osso-rb and osso-react, libraries that provide the core functionality, so be sure to stay on top of updates.

#### Consume OAuth

When a user wants to sign in to your application with SAML, send them to Osso with their email domain as part of an OAuth 2.0 authorization flow. Osso routes the user to their SAML provider, normalizes the payload, and sends them back to your application to complete the OAuth flow.

Use [omniauth-osso](https://github.com/enterprise-oss/omniauth-osso) or [passport-osso](https://github.com/enterprise-oss/passport-osso) for more convenience.

<!-- <a href="#"><img align="right" src="https://placekitten.com/40/40" width="40px" /></a> -->
## Documentation

Osso's primary documentation is at [ossoapp.com](https://ossoapp.com). Key sections include:
* [Overview](https://ossoapp.com/docs/overview) - Learn about Single Sign-On and SAML, why your customers want it and how to integrate it using Osso.
* [Quick start](https://ossoapp.com/docs/quick-start) - A brief overview of a typical timeline for integrating Osso.
 * [Deployment](https://ossoapp.com/docs/deploy/overview) - Guides for deploying Osso to Heroku, via git or Docker, plus how to keep your instance up to date.
 * [OAuth Setup](https://ossoapp.com/docs/consume/overview) - Authenticating SAML users to your application via OAuth.  
 * [Using Osso](https://ossoapp.com/docs/user-guide/overview) - A walk-through of the main functionality in our [Admin UI](https://demo.ossoapp.com/admin/enterprise).
 

<!-- <a href="#"><img align="right" src="https://placekitten.com/40/40" width="40px" /></a> -->
##  Community
We'd be thrilled to receive community contributions, but please note that Osso is owned and managed by a for-profit company, EnterpriseOSS, and you will not be compensated for your contributions. The goal of the project is to provide boilerplate code that you can evaluate to be certain you're confident running it in production, lowering the cost of adding better security for your customers while staying off of the [SSO Wall of Shame](https://sso.tax/).

<!-- <a href="#"><img align="right" src="https://placekitten.com/40/40" width="40px" /></a> -->
## Open Source

Osso is developed and maintained by EntepriseOSS with a Business Source License. BSL is used by companies like [Sentry](https://sentry.io/_/open-source/) and [MariaDB](https://mariadb.com/bsl-faq-mariadb/). While not _technically_ an open source license according to OSI, you are only prohibited from using Osso to compete with hosted Osso plans offered by EnterpriseOSS. See the [full license text](LICENSE).
