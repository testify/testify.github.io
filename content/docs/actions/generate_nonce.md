---
layout: docs.hbs
title: Generate Nonce
categories:
  - action
---

## GenerateNonceAction
*Testify Action to generate a nonce value*

### Usage
Generates a nonce value from the current time in milliseconds

#### Parameters
* Property - Name of property to store the nonce in (Defaults to testify.nonce if none is provided)

### Example
*With Property Name*

    GenerateNonceAction::some.property.name

*Without Property Name*

    GenerateNonceAction
