# @simple-cdk-constructs/ecr-scan-monitor

![CI Tests](https://github.com/cdk-constructs/ecr-scan-monitor/workflows/CI%20Tests/badge.svg)
![Package Audit](https://github.com/cdk-constructs/ecr-scan-monitor/workflows/Package%20Audit/badge.svg)

CDK Construct to handle any ECR image scans which detect a vulnerability. Any ITarget can be provided so events can be sent to
multiple sources including SNS Topics or Lambda Functions.

## Use Case

Anywhere that it is important to monitor vulnerabilities in stored ECR images.

## Installation

```shell
npm i @simple-cdk-constructs/ecr-scan-monitor
```

## Usage

```typescript
import { Topic } from '@aws-cdk/aws-sns';
import { SnsTopic } from '@aws-cdk/aws-events-targets';
import { ECRScanMonitor } from '@simple-cdk-constructs/ecr-scan-monitor';

// ...

    let snsTopic = new Topic(this, 'notiification-topic', {
        topicName: 'ecr-image-vulnerability'
    });
    
    new ECRScanMonitor(this, 'scan-monitor', {
        target: new SnsTopic(snsTopic)
    });
  
// ...

```