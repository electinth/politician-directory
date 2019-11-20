<h1 align="center">
  They Work For Us
</h1>

[![Netlify Status](https://api.netlify.com/api/v1/badges/1165ad17-98ee-45b6-acb3-f552ed565abf/deploy-status)](https://app.netlify.com/sites/quirky-hodgkin-ae5fd3/deploys)

**They Work For Us** is an open-source politician directory project for listing and tracking activities of members of the Cabinet and National Assembly of Thailand. It's run on [Gatsby](https://www.gatsbyjs.org).

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Development](#development)
  - [Environments](#environments)
- [Getting Started for Contributers](#getting-started-for-contributers)
- [Reference](#reference)
  - [Design & Architecture](#design--architecture)
  - [Data Dictionary](#data-dictionary)
- [Glossary](#glossary)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Development

After installing Node 8+ and `npm install`, you can start in development mode by

```
npm start
```

Your site is running on `http://localhost:8000` and GraphQL tool helper on `http://localhost:8000/___graphql`.

### Environments

|                      Environment                       |                 Description                  |
| :----------------------------------------------------: | :------------------------------------------: |
|                          Dev                           | Each PR will be built and hosted on Netlify. |
| [Staging](https://pedantic-edison-3897de.netlify.com/) |      New features awaiting for release.      |
|    [Production](https://theyworkforus.elect.in.th)     |                Public website                |

## Getting Started for Contributers

For first time contributer, browse for issues with `goodfirstissue` tag. Looking for `hacktoberfest` if you want to join the hack event!

## Reference

### Design & Architecture

- [Prototype design](https://invis.io/7HU7PWOYAQM#387144381_Landing_Page)
- [Technical sketches](https://projects.invisionapp.com/freehand/document/NhJHf12G0)

### Data Dictionary

- [Data-Dictionary](https://github.com/codeforthailand/politician-directory/wiki/Data-Dictionary)

## Glossary

| Thai                        | English                                |
| --------------------------- | -------------------------------------- |
| คณะรัฐมนตรี                 | Cabinet                                |
| พรรคการเมือง                | Party                                  |
| วุฒิสภา                     | The Senate                             |
| รัฐสภา                      | National Assembly of Thailand          |
| สภาผู้แทนราษฏร              | The House of Representatives           |
| สมาชิกวุฒิสภา (ส.ว.)        | Senator                                |
| สมาชิกสภาผู้แทนราษฎร (ส.ส.) | Member of the House of Representatives |
