---
layout: docs.hbs
title: Bayeux Client
categories:
  - action
---

## AddBayeuxSubscription Action
*Testify Action for adding subscriptions to a bayeux client*

### Usage
#### AddBayeuxSubscription
  *Takes in a name which is used as a unique identifier for the client to add the subscription to as well as a channel to subscribe to*

    AddBayeuxClientSubscription::{client-name}=={channel}
### Example

    <testcase>
      ..
      ..
      <preTestProcessorAction>
        StartBayeuxClient::{client-name}=={client-endpoint}
        AddBayeuxSubscription::{client-name}==${channel}
      </preTestProcessorAction>
      ..
      ..
      <postTestProcessorAction>
        StopBayeuxClient::{client-name}
      </postTestProcessorAction>
      ..
    </testcase>

__________

## StartBayeuxClient Action
*Testify Action for starting bayeux client instances*

### Usage
#### StartBayeuxClient
  *Takes in a name which is used as a unique identifier for a client instance and an endpoint to connect to as its parameters*

    StartBayeuxClient::{client-name}=={client-endpoint}

### Example

    <testcase>
      ..
      ..
      <preTestProcessorAction>
        StartBayeuxClient::{client-name}=={client-endpoint}
        StartBayeuxSubscription::{client-name}==${channel}
      </preTestProcessorAction>
      ..
      ..
      <postTestProcessorAction>
        StopBayeuxClient::{client-name}
      </postTestProcessorAction>
      ..
    </testcase>

___________

## StopBayeuxClient Action
*Testify Action for stopping bayeux client instances*

### Usage
#### StopBayeuxClient
  *Takes in a name which is used as a unique identifier for the client instance to destroy*

    StopBayeuxClient::{client-name}

### Example

    <testcase>
      ..
      ..
      <preTestProcessorAction>
        StartBayeuxClient::{client-name}=={client-endpoint}
        StartBayeuxSubscription::{client-name}==${channel}
      </preTestProcessorAction>
      ..
      ..
      <postTestProcessorAction>
        StopBayeuxClient::{client-name}
      </postTestProcessorAction>
      ..
    </testcase>
