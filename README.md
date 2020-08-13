<table><tr><td><img width="200" src="https://github.com/enterprise-oss/osso/blob/main/public/favicon/android-chrome-512x512.png?raw=true"/></td><td>**Osso** is an open source microservice for adding SAML based SSO to your app. Deploy Osso to your infrastructure of choice, use the Admin UI or osso-react to configure SAML for your customers that demand it, and sign them in to your application using OAuth.<br/>[![Build status](https://badge.buildkite.com/7e933f15ee68031e7bd2da5f0f5fcff77c7a2898911507de2a.svg?branch=main)](https://buildkite.com/enterpriseoss/osso)</td></tr></table>
<br><br>
<p align="center">
  <img width="600px" src="https://raw.githubusercontent.com/ksensehq/eventnative/master/artwork/en-video.gif" />
</p>
   
<a href="#">
  <img align="right" src="https://raw.githubusercontent.com/ksensehq/eventnative/master/artwork/quick-n.png" width="40px" />
</a>

## Quick Start

The fastest way to get started is to [deploy to Heroku](https://docs.eventnative.dev/deployment/deploy-on-heroku):

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

We also offer paid hosted plans that can reduce the integration workload on your development team.


For production deployment we suggest Docker:
 * [Official ksense/eventnative](https://hub.docker.com/r/ksense/eventnative) image
 * [Docker deployment guide](https://docs.eventnative.dev/deployment/deploy-with-docker)
 * Also, you can [build EventNative from sources](https://docs.eventnative.dev/deployment/build-from-sources) and use configuration management of your choice


<a href="#"><img align="right" src="https://raw.githubusercontent.com/ksensehq/eventnative/master/artwork/feat-n.png" width="40px" /></a>

## Features
 * **Treat SAML like OAuth**: SAML is clunky, and you're probably already using OAuth. Osso provides an OAuth server, an Admin UI for managing OAuth clients, and OAuth client libraries for Ruby and NodeJS. Let Osso worry about the ugly SAML bits, while your team can focus on making your application great.
 
 * **SAML Config in our UI or yours**: Got a deal on fire that requires SAML? Get started quickly by configuring your customers' SAML providers in the Osso Admin UI. Down the road, allow your customers to configure their SAML provider themselves in your setting page with our React library.
 
 * **Capture Events stopped by AdBlock**: Since EventNative is hosted on your domain, you get events for all users; not just those without AdBlock.



<a href="#"><img align="right" src="https://raw.githubusercontent.com/ksensehq/eventnative/master/artwork/demo-n.png" width="40px" /></a>
## Demo

We host a [simple page that demonstrates how EventNative works](https://track-demo.ksense.co/). Once your instance is deployed, visit this page to see how tracking works.

<a href="#"><img align="right" src="https://raw.githubusercontent.com/ksensehq/eventnative/master/artwork/doc-n.png" width="40px" /></a>

## Documentation

Please see our extensive documentation [here](https://eventnative-docs.ksense.io). Key sections include:
 * [Deployment](https://docs.eventnative.dev/deployment) - Getting EventNative running on Heroku, Docker, and building from source.
 * [Configuration](https://docs.eventnative.dev/configuration) - How to modify EventNative's `yaml` file. 
 * [Geo Data](https://docs.eventnative.dev/geo-data-resolution) - Configuring data enrichment with [MaxMind](https://www.maxmind.com/en/home).
 * [Scaling](https://docs.eventnative.dev/scaling-eventnative) - How to setup a distributed deployment of EventNative. 
 

<a href="#"><img align="right" src="https://raw.githubusercontent.com/ksensehq/eventnative/master/artwork/com-n.png" width="40px" /></a>
##  Community
We are made for developers, by developers and would love to have you join our community.
 * [Wiki](https://github.com/ksensehq/eventnative/wiki) - Check out our development wiki.
 * [Slack](https://join.slack.com/t/eventnative/shared_invite/zt-gincgy2s-ZYwXXBjw_GIN1PhVzgaUNA) - Join our slack.
 * [Email](mailto:team@eventnative.org) - Send us an email.
 * Submit a pull request!


<a href="#"><img align="right" src="https://raw.githubusercontent.com/ksensehq/eventnative/bb6a40cc5f0a84d29b270f510ea4f632f3314e71/artwork/ksense-logo.svg" width="40px" /></a>
## Open Source

EventNative is developed and maintained by [kSense](https://ksense.io/) under the MIT license. We charge for ETL from other datasources and let you connect your EventNative destination to kSense for analysis if you choose.