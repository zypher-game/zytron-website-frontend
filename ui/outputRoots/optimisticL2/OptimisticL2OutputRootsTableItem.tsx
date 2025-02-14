import { Flex, Td, Tr, Skeleton } from '@chakra-ui/react';
import React from 'react';
import { getRelativeTime } from 'lib/date/getRelativeTime';

import type { OptimisticL2OutputRootsItem } from 'types/api/optimisticL2';

import config from 'configs/app';
import dayjs from 'lib/date/dayjs';
import CopyToClipboard from 'ui/shared/CopyToClipboard';
import BlockEntityL2 from 'ui/shared/entities/block/BlockEntityL2';
import TxEntityL1 from 'ui/shared/entities/tx/TxEntityL1';
import HashStringShorten from 'ui/shared/HashStringShorten';

const rollupFeature = config.features.rollup;

type Props = { item: OptimisticL2OutputRootsItem; isLoading?: boolean };

const OptimisticL2OutputRootsTableItem = ({ item, isLoading }: Props) => {
  const timeAgo = getRelativeTime(item.l1_timestamp);

  if (!rollupFeature.isEnabled || rollupFeature.type !== 'optimistic') {
    return null;
  }

  return (
    <Tr>
      <Td verticalAlign="middle">
        <Skeleton isLoaded={!isLoading} display="inline-block">{item.l2_output_index}</Skeleton>
      </Td>
      <Td verticalAlign="middle">
        <Skeleton isLoaded={!isLoading} color="text_secondary" display="inline-block"><span>{timeAgo}</span></Skeleton>
      </Td>
      <Td verticalAlign="middle">
        <BlockEntityL2
          isLoading={isLoading}
          number={item.l2_block_number}
          fontSize="sm"
          lineHeight={5}
          fontWeight={600}
          noIcon
        />
      </Td>
      <Td verticalAlign="middle" pr={12}>
        <TxEntityL1
          isLoading={isLoading}
          hash={item.l1_tx_hash}
          fontSize="sm"
          lineHeight={5}
          noIcon
          truncation="constant_long"
        />
      </Td>
      <Td verticalAlign="middle">
        <Flex overflow="hidden" w="100%" alignItems="center">
          <Skeleton isLoaded={!isLoading}>
            <HashStringShorten hash={item.output_root} type="long" />
          </Skeleton>
          <CopyToClipboard text={item.output_root} ml={2} isLoading={isLoading} />
        </Flex>
      </Td>
    </Tr>
  );
};

export default OptimisticL2OutputRootsTableItem;
