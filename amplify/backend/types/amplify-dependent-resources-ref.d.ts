export type AmplifyDependentResourcesAttributes = {
  api: {
    bogeybuddiesAPI: {
      ApiId: 'string';
      ApiName: 'string';
      RootUrl: 'string';
    };
  };
  auth: {
    bogeybuddies0545ad9e: {
      AppClientID: 'string';
      AppClientIDWeb: 'string';
      IdentityPoolId: 'string';
      IdentityPoolName: 'string';
      UserPoolArn: 'string';
      UserPoolId: 'string';
      UserPoolName: 'string';
    };
  };
  function: {
    roundsLambda: {
      Arn: 'string';
      LambdaExecutionRole: 'string';
      LambdaExecutionRoleArn: 'string';
      Name: 'string';
      Region: 'string';
    };
  };
  storage: {
    roundsTable: {
      Arn: 'string';
      Name: 'string';
      PartitionKeyName: 'string';
      PartitionKeyType: 'string';
      Region: 'string';
      StreamArn: 'string';
    };
  };
};
