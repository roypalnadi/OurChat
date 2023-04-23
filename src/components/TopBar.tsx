import React, {ReactNode} from 'react';
import {StyleProp, TextStyle, View} from 'react-native';

type ComponentProps = {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
};

const TopBar: React.FC<ComponentProps> = ({children, style}) => {
  return (
    <View
      style={[
        {
          backgroundColor: '#FFFFFF',
          borderBottomWidth: 1,
          justifyContent: 'center',
          height: 50,
        },
        style,
      ]}>
      {children}
    </View>
  );
};

export default TopBar;
