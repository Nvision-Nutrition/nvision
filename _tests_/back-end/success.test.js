import {createMocks} from 'node-mocks-http';
import success from '../pages/api/success';

describe('/api/success', () => {
  it('return a success quote', async () => {
    const {req, res} = createMocks({
      method: 'GET',
    });

    await success(req, res);
    expect(res._getStatusCode()).toBe(200);
    // need to find a way around randomized results
    // expect(JSON.parse(res._getData())).toEqual(
    //     expect.objectContaining({
    //       success_quote: 'Keep up the great work!',
    //     }),
    // );
  });
});
