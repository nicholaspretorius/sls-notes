export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  STRIPE_KEY: "pk_test_BV8mIlA2bgaja47OFh0nb5eN007eCzJEbN",
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
    USER_POOL_ID: "eu-west-1_SNPNfN0QV", // "eu-west-1_iqrXNOPhZ",
    APP_CLIENT_ID: "1j7j70cbcujf5mpt3be1qqgfgc", // "4kmdbsn7s9va7lvslk1ntv48u9",
    IDENTITY_POOL_ID: "eu-west-1:eed9a006-8d76-4fb6-a7cf-4c26bebb2720" // "eu-west-1:51eb39a2-6a02-47e6-8784-313ba2c7a288"
  }
};
