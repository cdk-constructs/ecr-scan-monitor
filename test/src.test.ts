import { expect as expectCDK, countResources, haveResourceLike } from '@aws-cdk/assert';
import { App, Stack } from "@aws-cdk/core";
import { Topic } from '@aws-cdk/aws-sns';
import { SnsTopic } from '@aws-cdk/aws-events-targets';
import { ECRScanMonitor } from '../lib';

// TODO: It would be nice to test the event output is the target input but it's a pain without using logical ID's
test('The event rule is created correctly', () => {
  const app = new App();
  const stack = new Stack(app, "TestStack");

  let testSNSTopic = new Topic(stack, 'test-topic', {
    topicName: 'ecr-image-vulnerability'
  });

  new ECRScanMonitor(stack, 'MyTestConstruct', {
    target: new SnsTopic(testSNSTopic)
  });

  expectCDK(stack).to(countResources("AWS::Events::Rule",1));
  expectCDK(stack).to(haveResourceLike("AWS::Events::Rule",{
    Name: 'ecr-image-vulnerability-notification-rule',
    Description: 'ECR scan monitor that triggers when a vulnerability is detected.',
    State: 'ENABLED',
    EventPattern: {
      source: ['aws.ecr'],
      'detail-type': ['ECR Image Scan'],
      detail: {
        'finding-severity-counts': [ { 'exists': true } ]
      }
    }
  }));
});
