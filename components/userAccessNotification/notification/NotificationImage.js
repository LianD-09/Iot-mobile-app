import React from 'react';
import {Image, View} from 'react-native';

const NotificationImage = ({url}) => {
  const Image_URL = {uri: `${url}`};
  return (
    <View>
      <Image
        source={Image_URL}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{height: 200, resizeMode: 'stretch', margin: 5}}
      />
    </View>
  );
};

export default NotificationImage;
