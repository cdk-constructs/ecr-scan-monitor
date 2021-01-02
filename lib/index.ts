import { Construct } from '@aws-cdk/core';
import { Rule, IRuleTarget } from '@aws-cdk/aws-events';

export interface ECRScanMonitorProps {
  target: IRuleTarget;
}

export class ECRScanMonitor extends Construct {

  public rule: Rule;

  constructor(scope: Construct, id: string, props: ECRScanMonitorProps) {
    super(scope, id);

    this.rule = new Rule(this, 'ecr-image-vulnerability-notification-rule', {
      ruleName: 'ecr-image-vulnerability-notification-rule',
      description: 'ECR scan monitor that triggers when a vulnerability is detected.',
      enabled: true,
      eventBus: undefined, // uses account default event bus
      targets: [props.target],
      eventPattern: {
        detailType: ['ECR Image Scan'],
        source: ['aws.ecr'],
        detail: {
          'finding-severity-counts': [{'exists': true}]
        }
      }
    });
  }

}
