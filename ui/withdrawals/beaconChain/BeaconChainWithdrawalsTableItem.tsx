import { Td, Tr, Skeleton } from '@chakra-ui/react';
import React from 'react';

import type { AddressWithdrawalsItem } from 'types/api/address';
import type { BlockWithdrawalsItem } from 'types/api/block';
import type { WithdrawalsItem } from 'types/api/withdrawals';

import dayjs from 'lib/date/dayjs';
import { getRelativeTime } from 'lib/date/getRelativeTime';
import CurrencyValue from 'ui/shared/CurrencyValue';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import BlockEntity from 'ui/shared/entities/block/BlockEntity';

type Props = ({
  item: WithdrawalsItem;
  view: 'list';
} | {
  item: AddressWithdrawalsItem;
  view: 'address';
} | {
  item: BlockWithdrawalsItem;
  view: 'block';
}) & { isLoading?: boolean };

const BeaconChainWithdrawalsTableItem = ({ item, view, isLoading }: Props) => {
  return (
    <Tr>
      <Td verticalAlign="middle">
        <Skeleton isLoaded={!isLoading} display="inline-block">{item.index}</Skeleton>
      </Td>
      <Td verticalAlign="middle">
        <Skeleton isLoaded={!isLoading} display="inline-block">{item.validator_index}</Skeleton>
      </Td>
      {view !== 'block' && (
        <Td verticalAlign="middle">
          <BlockEntity
            number={item.block_number}
            isLoading={isLoading}
            fontSize="sm"
            lineHeight={5}
            noIcon
          />
        </Td>
      )}
      {view !== 'address' && (
        <Td verticalAlign="middle">
          <AddressEntity
            address={item.receiver}
            isLoading={isLoading}
            truncation="constant"
          />
        </Td>
      )}
      {view !== 'block' && (
        <Td verticalAlign="middle" pr={12}>
          <Skeleton isLoaded={!isLoading} display="inline-block" color="text_secondary">
            <span>{getRelativeTime(item.timestamp)}</span>
          </Skeleton>
        </Td>
      )}
      <Td verticalAlign="middle">
        <CurrencyValue value={item.amount} isLoading={isLoading} />
      </Td>
    </Tr>
  );
};

export default BeaconChainWithdrawalsTableItem;
