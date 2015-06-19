---
layout: docs.hbs
title: Create Timestamp
categories:
  - action
---

## CreateTimestampAction
*A Testify Action to take a current timestamp and store it as a Testify property*

### Usage
*Creates a timestamp for a given timezone*

Timestamps are created in the following format: `yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`

#### Parameters
* timezone - _Takes in a string value for the timezone to use for the timestamp_

#### Example
`CreateTimeStampAction::GMT`
