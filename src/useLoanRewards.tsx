import { ImpactProviderContext } from './ImpactProvider';
import { getContracts } from './contracts';
import React, { useState } from 'react';

export const useLoanRewards = () => {
    const { provider, networkId } = React.useContext(ImpactProviderContext);
    const [isReady, setIsReady] = useState(false);
    const [rewards, setRewards] = useState<BigInt | null>(null);

    async function getEstimatedLoanRewards(value: any) {
        const { donationMiner } = getContracts(provider, networkId);
        const estimatedDonationReward = await donationMiner.estimateNewDonationClaimableRewardAdvance(value);
        const result = BigInt(estimatedDonationReward) / BigInt(3);

        setRewards(result);
        setIsReady(true);
    }

    return { getEstimatedLoanRewards, isReady, rewards };
};
