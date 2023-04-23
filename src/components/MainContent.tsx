import React, {ReactNode} from 'react';
import {StatusBar, StyleProp, TextStyle, View} from 'react-native';

type ComponentProps = {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
};

const MainContent: React.FC<ComponentProps> = ({children, style}) => {
  return (
    <View
      style={[
        {
          flex: 1,
          paddingTop: StatusBar.currentHeight,
          backgroundColor: '#FFFFFF',
        },
        style,
      ]}>
      {children}
    </View>
  );
};

export default MainContent;
