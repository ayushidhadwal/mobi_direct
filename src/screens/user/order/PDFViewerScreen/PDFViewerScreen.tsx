import React, {FC, useState} from 'react';
import WebView from 'react-native-webview';
import {Box} from 'native-base';

import {PDFViewerScreenProps} from '../../../../navigation';
import {Loader} from '../../../../components/Loader';

export const PDFViewerScreen: FC<PDFViewerScreenProps> = ({route}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <Box flex={1}>
      {isLoading ? <Loader /> : null}
      <WebView
        onLoad={() => setIsLoading(false)}
        style={{flex: 1}}
        source={{
          uri: `https://docs.google.com/gview?embedded=true&url=${route.params.uri}`,
        }}
      />
    </Box>
  );
};
