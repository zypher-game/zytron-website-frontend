import { Td, Tr, Skeleton } from '@chakra-ui/react';
import React from 'react';

import type { OptimisticL2WithdrawalsItem } from 'types/api/optimisticL2';

import { getRelativeTime } from 'lib/date/getRelativeTime';
import config from 'configs/app';
import dayjs from 'lib/date/dayjs';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import TxEntity from 'ui/shared/entities/tx/TxEntity';
import TxEntityL1 from 'ui/shared/entities/tx/TxEntityL1';
import LinkExternal from 'ui/shared/LinkExternal';

const rollupFeature = config.features.rollup;

type Props = { item: OptimisticL2WithdrawalsItem; isLoading?: boolean };

const OptimisticL2WithdrawalsTableItem = ({ item, isLoading }: Props) => {
  const timeAgo = item.l2_timestamp ? getRelativeTime(item.l2_timestamp) : 'N/A';
  const timeToEnd = item.challenge_period_end ? dayjs(item.challenge_period_end).fromNow(true) + ' left' : '';

  if (!rollupFeature.isEnabled || rollupFeature.type !== 'optimistic') {
    return null;
  }

  return (
    <Tr>
      <Td verticalAlign="middle" fontWeight={600}>
        <Skeleton isLoaded={!isLoading} display="inline-block">{item.msg_nonce_version + '-' + item.msg_nonce}</Skeleton>
      </Td>
      <Td verticalAlign="middle">
        {item.from ? (
          <AddressEntity
            address={item.from}
            isLoading={isLoading}
            truncation="constant"
          />
        ) : 'N/A'}
      </Td>
      <Td verticalAlign="middle">
        <TxEntity
          isLoading={isLoading}
          hash={item.l2_tx_hash}
          fontSize="sm"
          lineHeight={5}
          truncation="constant_long"
          noIcon
        />
      </Td>
      <Td verticalAlign="middle" pr={12}>
        <Skeleton isLoaded={!isLoading} color="text_secondary" display="inline-block">
          <span> {timeAgo}</span>
        </Skeleton>
      </Td>
      <Td verticalAlign="middle">
        {item.status === 'Ready for relay' && rollupFeature.L2WithdrawalUrl ?
          <LinkExternal href={rollupFeature.L2WithdrawalUrl}>{item.status}</LinkExternal> :
          <Skeleton isLoaded={!isLoading} display="inline-block">{item.status}</Skeleton>
        }
      </Td>
      <Td verticalAlign="middle">
        {item.l1_tx_hash ? (
          <TxEntityL1
            isLoading={isLoading}
            hash={item.l1_tx_hash}
            truncation="constant_long"
            noIcon
            fontSize="sm"
            lineHeight={5}
          />
        ) :
          'N/A'
        }
      </Td>
      <Td verticalAlign="middle">
        <Skeleton isLoaded={!isLoading} color="text_secondary" minW="50px" minH="20px" display="inline-block">{timeToEnd}</Skeleton>
      </Td>
    </Tr>
  );
};

export default OptimisticL2WithdrawalsTableItem;
