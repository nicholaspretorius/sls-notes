// AWS Amplify Config
export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "eu-west-1",
    BUCKET: "sls-notes-uploads-bucket-dev"
  },
  apiGateway: {
    REGION: "eu-west-1",
    URL: "https://lz2ymosryl.execute-api.eu-west-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_iqrXNOPhZ",
    APP_CLIENT_ID: "4kmdbsn7s9va7lvslk1ntv48u9",
    IDENTITY_POOL_ID: "eu-west-1:51eb39a2-6a02-47e6-8784-313ba2c7a288"
  }
};
