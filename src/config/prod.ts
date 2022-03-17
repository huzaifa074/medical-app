const SENTRY_DNS =
  'https://7e7723d5c0d046ba999ea73dee55dff8@o492623.ingest.sentry.io/5560266';
const REGION = 'us-east-1';

const config = {
  s3: {
    BUCKET: 'staylowkey-qa-media-bucket',
    BUCKET_URL: 'https://staylowkey-qa-media-bucket.s3.amazonaws.com/public/',
  },
  API: {
    URL: 'https://api.staylowkey.healthcare/v1-qa',
  },
  cognito: {
    USER_POOL_ID: 'us-east-1_QTgGLCXeQ',
    APP_CLIENT_ID: '7t8a3n9ul5bar63q6nulfpr2vt',
    IDENTITY_POOL_ID: 'us-east-1:e6979422-18eb-4647-ac9f-9c9dc30cb37b',
  },
};

export default {
  IS_LOCAL: true,
  SENTRY_DNS,
  s3: config.s3,
  Auth: {
    // mandatorySignIn: true,
    region: REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  Storage: {
    region: REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: 'API',
        endpoint: config.API.URL,
        region: REGION,
      },
      {
        name: 'HIPO_LABS',
        endpoint:
          'http://universities.hipolabs.com/search?country=south%20africa',
      },
    ],
  },
};
