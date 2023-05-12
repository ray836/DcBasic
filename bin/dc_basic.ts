#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DcBasicStack } from '../lib/dc_basic-stack';
import { ServiceStack } from '../lib/service-stack';

const app = new cdk.App();
const pipelineStack = new DcBasicStack(app, 'DcBasicStack', {

});

const serviceStackProd = new ServiceStack(app, 'ServiceStackProd');

pipelineStack.addServiceStage(serviceStackProd, 'Prod');