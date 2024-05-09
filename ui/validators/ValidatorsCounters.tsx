import { Box } from "@chakra-ui/react";
import React from "react";

import { getFeaturePayload } from "configs/app/features/types";

import config from "configs/app";
import useApiQuery from "lib/api/useApiQuery";
import { VALIDATORS_COUNTERS } from "stubs/validators";
import StatsWidget from "ui/shared/stats/StatsWidget";

const ValidatorsCounters = () => {
  const countersQuery = useApiQuery("validators_counters", {
    pathParams: {
      chainType: getFeaturePayload(config.features.validators)?.chainType,
    },
    queryOptions: {
      enabled: config.features.validators.isEnabled,
      placeholderData: VALIDATORS_COUNTERS,
    },
  });

  if (!countersQuery.data) {
    return null;
  }

  return (
    <Box
      columnGap={3}
      rowGap={3}
      mb={6}
      display="grid"
      gridTemplateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
    >
      <StatsWidget
        label="Total validators"
        value={Number(countersQuery.data.validators_counter).toLocaleString()}
        diff={Number(
          countersQuery.data.new_validators_counter_24h
        ).toLocaleString()}
        isLoading={countersQuery.isPlaceholderData}
      />
      <StatsWidget
        label="Active validators"
        value={`${Number(
          countersQuery.data.active_validators_percentage
        ).toLocaleString()}%`}
        isLoading={countersQuery.isPlaceholderData}
      />
    </Box>
  );
};

export default React.memo(ValidatorsCounters);
