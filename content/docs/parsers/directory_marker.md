---
layout: docs.hbs
title: Directory Marker
categories:
  - parser
---
# Directory Marker Test Parser
*Making it easy to find your way in the woods*

## Description
The Directory Marker Test Parser allows one or more directories within a test bundle to be found via a property based on the folder name

## Usage
Place a .marker file in any directory that you need to find easily from within a test

Refer to this directory by name as a property: `${directory.name}`, this will provide the test with the full path to the location that was marked
