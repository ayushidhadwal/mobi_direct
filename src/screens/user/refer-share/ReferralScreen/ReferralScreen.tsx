import React, {FC, useCallback, useEffect, useState} from 'react';
import {Box} from 'native-base';
import {Share} from 'react-native';
import {useTranslation} from 'react-i18next';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import {ReferralSocialShare} from './components/ReferralSocialShare';
import {ReferralQRCode} from './components/ReferralQRCode';
import {useUserReferral} from '../../../../hooks/user/useUserReferral';
import {Loader} from '../../../../components/Loader';
import {ReferScreenProps} from '../../../../navigation';
import {useMessage} from '../../../../hooks/useMessage';

export const ReferralScreen: FC<ReferScreenProps> = () => {
  const {referral, isLoading} = useUserReferral();

  const [shareLink, setShareLink] = useState<string>('');

  const {t} = useTranslation('ReferLang');

  const setMessage = useMessage();

  const onShare = async () => {
    try {
      await Share.share({
        message: `${t('referMsg')} "${referral?.referralId}" ${t(
          'benefits',
        )} \n${shareLink}`,
      });
    } catch (e: any) {
      setMessage(e.message);
    }
  };

  const buildLink = useCallback(async () => {
    return await dynamicLinks().buildLink({
      link: `https://mobidirect.net?invitedby=${referral?.referralId}`,
      domainUriPrefix: 'https://mobidirect.page.link',
      android: {
        packageName: 'com.mobi.d',
      },
      ios: {
        appStoreId: '1667773162',
        bundleId: 'com.mobi.d',
      },
    });
  }, [referral?.referralId]);

  useEffect(() => {
    buildLink().then(result => {
      setShareLink(result);
    });
  }, [buildLink]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Box flex={1} p={4}>
      <ReferralQRCode link={shareLink} />
      <ReferralSocialShare onShare={onShare} />
    </Box>
  );
};
