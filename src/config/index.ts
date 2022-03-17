import dev from './dev';
import qa from './qa';
import prod from './prod';

// Default to dev if not set
let config = dev;
if (process.env.REACT_APP_STAGE === 'prod') {
  config = prod;
}
if (process.env.REACT_APP_STAGE === 'qa') {
  config = qa;
}

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config,
};
