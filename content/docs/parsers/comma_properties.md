---
layout: docs.hbs
title: Comma Separated Properties
categories:
  - parser
---
#CommaPropertiesParser
*A properties parser bundle that separates value by comma*

## Usage
*The CommaPropertiesParser reads java style properties files*

It has support for normal key=value style properties as well as multi-valued properties separated by commas.

## Example
*example.properties*

    # Single value property
    some.property=SomeValue
    # Multi-valued property
    many.valued.property=value1,value2
