import { Skeleton } from '@chakra-ui/react';
import React from 'react';

import type { ShibariumDepositsItem } from 'types/api/shibarium';

import config from 'configs/app';
import dayjs from 'lib/date/dayjs';
import AddressStringOrParam from 'ui/shared/entities/address/AddressStringOrParam';
import BlockEntityL1 from 'ui/shared/entities/block/BlockEntityL1';
import TxEntity from 'ui/shared/entities/tx/TxEntity';
import TxEntityL1 from 'ui/shared/entities/tx/TxEntityL1';
import ListItemMobileGrid from 'ui/shared/ListItemMobile/ListItemMobileGrid';
import { getRelativeTime } from 'lib/date/getRelativeTime';

const feature = config.features.rollup;

type Props = { item: ShibariumDepositsItem; isLoading?: boolean };

const DepositsListItem = ({ item, isLoading }: Props) => {
  const timeAgo = getRelativeTime(item.timestamp);

  if (!(feature.isEnabled && feature.type === 'shibarium')) {
    return null;
  }

  return (
    <ListItemMobileGrid.Container>

      <ListItemMobileGrid.Label isLoading={isLoading}>L1 block No</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <BlockEntityL1
          number={item.l1_block_number}
          isLoading={isLoading}
          fontSize="sm"
          lineHeight={5}
          fontWeight={600}
        />
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={isLoading}>L1 txn hash</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <TxEntityL1
          isLoading={isLoading}
          hash={item.l1_transaction_hash}
          fontSize="sm"
          lineHeight={5}
          truncation="constant_long"
        />
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={isLoading}>L2 txn hash</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <TxEntity
          isLoading={isLoading}
          hash={item.l2_transaction_hash}
          fontSize="sm"
          lineHeight={5}
          truncation="constant_long"
        />
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={isLoading}>User</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <AddressStringOrParam
          address={item.user}
          isLoading={isLoading}
          noCopy
          truncation="constant"
        />
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={isLoading}>Age</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <Skeleton isLoaded={!isLoading} display="inline-block">{timeAgo}</Skeleton>
      </ListItemMobileGrid.Value>

    </ListItemMobileGrid.Container>
  );
};

export default DepositsListItem;
