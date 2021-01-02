import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import { App } from '@aws-cdk/core';
import * as Example from '../lib/example-stack';

test('Empty Stack', () => {
    const app = new App();
    const stack = new Example.ExampleStack(app, 'MyTestStack');

});
