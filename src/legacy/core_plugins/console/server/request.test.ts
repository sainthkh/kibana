/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import http from 'http';
import * as sinon from 'sinon';
import { sendRequest } from './request';
import { URL } from 'url';
import { fail } from 'assert';

describe(`Console's send request`, () => {
  let sandbox: sinon.SinonSandbox;
  let stub: sinon.SinonStub;
  let fakeRequest: http.ClientRequest;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    stub = sandbox.stub(http, 'request').callsFake(() => {
      fakeRequest = {
        abort: sinon.stub(),
        on() {},
        once() {},
      } as any;
      return fakeRequest;
    });
  });

  afterEach(() => {
    stub.restore();
    fakeRequest = null as any;
  });

  it('correctly implements timeout and abort mechanism', async () => {
    try {
      await sendRequest({
        agent: null as any,
        headers: {},
        method: 'get',
        payload: null as any,
        timeout: 0, // immediately timeout
        uri: new URL('http://noone.nowhere.com'),
      });
      fail('Should not reach here!');
    } catch (e) {
      expect(e.message).toEqual('Client request timeout');
      expect((fakeRequest.abort as sinon.SinonStub).calledOnce).toBe(true);
    }
  });
});
