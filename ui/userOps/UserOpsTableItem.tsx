import { Td, Tr, Skeleton } from '@chakra-ui/react';
import React from 'react';

import type { UserOpsItem } from 'types/api/userOps';

import config from 'configs/app';
import dayjs from 'lib/date/dayjs';
import CurrencyValue from 'ui/shared/CurrencyValue';
import AddressStringOrParam from 'ui/shared/entities/address/AddressStringOrParam';
import BlockEntity from 'ui/shared/entities/block/BlockEntity';
import TxEntity from 'ui/shared/entities/tx/TxEntity';
import UserOpEntity from 'ui/shared/entities/userOp/UserOpEntity';
import UserOpStatus from 'ui/shared/userOps/UserOpStatus';

import { getRelativeTime } from 'lib/date/getRelativeTime';
type Props = {
  item: UserOpsItem;
  isLoading?: boolean;
  showTx: boolean;
  showSender: boolean;
};

const UserOpsTableItem = ({ item, isLoading, showTx, showSender }: Props) => {
  const timeAgo = getRelativeTime(item.timestamp);

  return (
    <Tr>
      <Td verticalAlign="middle">
        <UserOpEntity hash={item.hash} isLoading={isLoading} noIcon fontWeight={700} truncation="constant_long" />
      </Td>
      <Td verticalAlign="middle">
        <Skeleton isLoaded={!isLoading} color="text_secondary" display="inline-block"><span>{timeAgo}</span></Skeleton>
      </Td>
      <Td verticalAlign="middle">
        <UserOpStatus status={item.status} isLoading={isLoading} />
      </Td>
      {showSender && (
        <Td verticalAlign="middle">
          <AddressStringOrParam
            address={item.address}
            isLoading={isLoading}
            truncation="constant"
          />
        </Td>
      )}
      {showTx && (
        <Td verticalAlign="middle">
          <TxEntity
            hash={item.transaction_hash}
            isLoading={isLoading}
            truncation="constant"
            noIcon
          />
        </Td>
      )}
      <Td verticalAlign="middle">
        <BlockEntity
          number={item.block_number}
          isLoading={isLoading}
          fontSize="sm"
          lineHeight={5}
          noIcon
        />
      </Td>
      {!config.UI.views.tx.hiddenFields?.tx_fee && (
        <Td verticalAlign="middle" isNumeric>
          <CurrencyValue value={item.fee} isLoading={isLoading} accuracy={8} />
        </Td>
      )}
    </Tr>
  );
};

export default UserOpsTableItem;
