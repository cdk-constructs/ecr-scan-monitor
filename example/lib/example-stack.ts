import { Stack, StackProps, Construct } from '@aws-cdk/core';
import { Topic } from '@aws-cdk/aws-sns';
import { SnsTopic } from '@aws-cdk/aws-events-targets';

import { ECRScanMonitor } from '@simple-cdk-constructs/ecr-scan-monitor';

export class ExampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    let snsTopic = new Topic(this, 'sns-topic', {
      topicName: 'test-sns-topic'
    });

    let scanMonitor = new ECRScanMonitor(this, 'ecr-scan-monitor', {
      target: new SnsTopic(snsTopic)
    });
  }
}
