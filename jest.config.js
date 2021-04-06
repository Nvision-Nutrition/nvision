module.exports = {
  'collectCoverage': true,
  'coverageDirectory': 'coverage',
  'verbose': true,
  'roots': [
    './_tests_',
  ],
  'transform': {
    '\\.[jt]sx?$': 'babel-jest',
  },
  // tests should reach 60 percent code coverage
  'coverageThreshold': {
    'global': {
      'branches': 60,
      'functions': 60,
      'lines': 60,
      'statements': 60,
    },
  },
  /*
  this block allows for easier enzyme configuration & is
  currently commented out due to the prioritzation of
  react-testing-library tests
  'setupFiles': [
    './setupTests',
  ],
  */
  'moduleNameMapper': {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
};
