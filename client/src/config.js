const dev = {
  STRIPE_KEY: "pk_test_BV8mIlA2bgaja47OFh0nb5eN007eCzJEbN",
  s3: {
    REGION: "eu-west-1",
    BUCKET: "sls-notes-uploads-bucket-dev"
  },
  apiGateway: {
    REGION: "eu-west-1",
    URL: "https://1eqsqxr7bj.execute-api.eu-west-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_42dKV66ZZ", // "eu-west-1_iqrXNOPhZ",
    APP_CLIENT_ID: "3qu4uneoimio7155vf2mqjvf43", // "4kmdbsn7s9va7lvslk1ntv48u9",
    IDENTITY_POOL_ID: "eu-west-1:f9b775c2-88ee-4349-aab1-635cb5864230" // "eu-west-1:51eb39a2-6a02-47e6-8784-313ba2c7a288"
  }
};

const prod = {
  // TODO
  STRIPE_KEY: "pk_test_BV8mIlA2bgaja47OFh0nb5eN007eCzJEbN",
  s3: {
    REGION: "eu-west-1",
    BUCKET: "sls-notes-uploads-bucket-dev"
  },
  apiGateway: {
    REGION: "eu-west-1",
    URL: "https://1eqsqxr7bj.execute-api.eu-west-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_42dKV66ZZ", // "eu-west-1_iqrXNOPhZ",
    APP_CLIENT_ID: "3qu4uneoimio7155vf2mqjvf43", // "4kmdbsn7s9va7lvslk1ntv48u9",
    IDENTITY_POOL_ID: "eu-west-1:f9b775c2-88ee-4349-aab1-635cb5864230" // "eu-west-1:51eb39a2-6a02-47e6-8784-313ba2c7a288"
  }
};

const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
