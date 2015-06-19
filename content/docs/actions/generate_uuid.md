---
layout: docs.hbs
title: Generate UUID
categories:
  - action
---

## GenerateUUIDAction
*Testify Action to generate a uuid value*

## Usage
Generates a uuid value

### Parameters
* Property - Name of property to store the uuid in (Defaults to testify.uuid if none is provided)

## Example
*With Property Name*

    GenerateUUIDAction::some.property.name

*Without Property Name*

    GenerateUUIDAction
