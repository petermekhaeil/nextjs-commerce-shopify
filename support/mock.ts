import fetch from 'jest-fetch-mock';

const mock = (fixture: any) =>
  fetch.mockResponseOnce(JSON.stringify(fixture), {
    status: 200,
    headers: { 'content-type': 'application/json' }
  });

export default mock;
