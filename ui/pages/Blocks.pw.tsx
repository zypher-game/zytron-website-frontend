import type { BrowserContext } from '@playwright/test';
import React from 'react';

import * as blockMock from 'mocks/blocks/block';
import * as statsMock from 'mocks/stats/index';
import contextWithEnvs from 'playwright/fixtures/contextWithEnvs';
import * as socketServer from 'playwright/fixtures/socketServer';
import { test, expect, devices } from 'playwright/lib';
import * as configs from 'playwright/utils/configs';

import Blocks from './Blocks';

const hooksConfig = {
  router: {
    query: { tab: 'blocks' },
    isReady: true,
  },
};

// FIXME
// test cases which use socket cannot run in parallel since the socket server always run on the same port
test.describe.configure({ mode: 'serial' });

test('base view +@dark-mode', async({ render, mockApiResponse }) => {
  await mockApiResponse('blocks', blockMock.baseListResponse, { queryParams: { type: 'block' } });
  await mockApiResponse('stats', statsMock.base);

  const component = await render(<Blocks/>, { hooksConfig });

  await expect(component).toHaveScreenshot();
});

const hiddenFieldsTest = test.extend<{ context: BrowserContext }>({
  context: contextWithEnvs(configs.viewsEnvs.block.hiddenFields),
});

hiddenFieldsTest('hidden fields', async({ render, mockApiResponse }) => {
  await mockApiResponse('blocks', blockMock.baseListResponse, { queryParams: { type: 'block' } });
  await mockApiResponse('stats', statsMock.base);

  const component = await render(<Blocks/>, { hooksConfig });

  await expect(component).toHaveScreenshot();
});

test.describe('mobile', () => {
  test.use({ viewport: devices['iPhone 13 Pro'].viewport });

  test(' base view', async({ render, mockApiResponse }) => {
    await mockApiResponse('blocks', blockMock.baseListResponse, { queryParams: { type: 'block' } });
    await mockApiResponse('stats', statsMock.base);

    const component = await render(<Blocks/>, { hooksConfig });

    await expect(component).toHaveScreenshot();
  });

  const hiddenFieldsTest = test.extend<{ context: BrowserContext }>({
    context: contextWithEnvs(configs.viewsEnvs.block.hiddenFields),
  });

  hiddenFieldsTest('hidden fields', async({ render, mockApiResponse }) => {
    await mockApiResponse('blocks', blockMock.baseListResponse, { queryParams: { type: 'block' } });
    await mockApiResponse('stats', statsMock.base);

    const component = await render(<Blocks/>, { hooksConfig });

    await expect(component).toHaveScreenshot();
  });
});

test('new item from socket', async({ render, mockApiResponse, createSocket }) => {
  await mockApiResponse('blocks', blockMock.baseListResponse, { queryParams: { type: 'block' } });

  const component = await render(<Blocks/>, { hooksConfig }, { withSocket: true });

  const socket = await createSocket();
  const channel = await socketServer.joinChannel(socket, 'blocks:new_block');
  socketServer.sendMessage(socket, channel, 'new_block', {
    average_block_time: '6212.0',
    block: {
      ...blockMock.base,
      height: blockMock.base.height + 1,
      timestamp: '2022-11-11T11:59:58Z',
    },
  });

  await expect(component).toHaveScreenshot();
});

test('socket error', async({ render, mockApiResponse, createSocket }) => {
  await mockApiResponse('blocks', blockMock.baseListResponse, { queryParams: { type: 'block' } });

  const component = await render(<Blocks/>, { hooksConfig }, { withSocket: true });

  const socket = await createSocket();
  await socketServer.joinChannel(socket, 'blocks:new_block');
  socket.close();

  await expect(component).toHaveScreenshot();
});
