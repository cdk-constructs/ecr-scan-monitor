#!/usr/bin/env node

import 'source-map-support/register';
import { App } from '@aws-cdk/core';

import { ExampleStack } from '../lib/example-stack';

const app = new App();

new ExampleStack(app, 'ExampleStack');
