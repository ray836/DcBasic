import { Stack, StackProps } from "aws-cdk-lib";
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
import { ManagedPolicy, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { CfnParametersCode, Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class ServiceStack extends Stack {
	public readonly serviceCode: CfnParametersCode;
	constructor(scope: Construct, id: string, props?: StackProps) {
		super(scope, id, props);

		this.serviceCode = Code.fromCfnParameters()


		// const providerTable = new Table(this, 'ProviderTable', {
		// 	partitionKey: {name: 'id', type: AttributeType.STRING},
		// 	billingMode: BillingMode.PAY_PER_REQUEST,
		// 	tableName: 'Provider'
		// });

		// const lambdaARole = new Role(this, 'LambdaRole', {
		// 	assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
		//   });

		//   lambdaARole.addManagedPolicy(
		// 	ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess')
		//   );

		const expressLambda = new Function(this, 'ServiceLambda', {
			runtime: Runtime.NODEJS_18_X,
			handler: 'src/lambda.handler',
			code: this.serviceCode,
			functionName: 'ServiceLambda',
			// role: lambdaARole,
		})

		const api = new LambdaRestApi(this, 'DcBasicApi', {
			handler: expressLambda,
			restApiName: `DcBasicApi-ok`
		})


	}
}