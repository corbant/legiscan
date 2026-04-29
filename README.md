# LegiScan TypeScript SDK

A TypeScript SDK for interacting with the LegiScan API. The goal this sdk is to provide a normalized typesafe interface for interacting with the LegiScan api. Where possible effort has been made to standardize the returned data see the (irregularities section)[#Irregularities] for more details.

This project was started after finding [prior art](https://github.com/Chalkbeat/legiscan-client) with a GNU GPL license and is based on my [congress-dot-gov](https://github.com/just-buidl-it/congress-dot-gov) client.

[LegiScan API Documentation](https://legiscan.com/gaits/documentation/legiscan)

## Installation

```bash
yarn install @just-buidl-it/legiscan
```

### Rate Limiting

The LegiScan API limits has a rate limit of 30,000 requests per month which resets on the first.

### Irregularities

Lists are returned as objects with the indexes as keys. These "list" objects can also contain other keys. The known "string" keys are pulled off and the object is flattened to an array. The responses are not otherwise modified.

If a person object does not have a bio, it is returned as an empty array. This is changed to simply be undefined instead.

Zod schemas are made available to cast keys from snake case to camel case and to cast values to easier to work with types.

- 0,1 values are cast to booleans
