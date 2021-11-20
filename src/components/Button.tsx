import React from 'react';
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TextStyle,
  ViewStyle,
} from 'react-native';
import Color from '../styles/colors';
import fonts from '../styles/fonts';

type Props = {
  title: string;
  onPress: () => void;
};

const Button: React.FC<Props> = ({title, onPress}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle: ViewStyle = {
    backgroundColor: isDarkMode ? Color.darkerGrey : Color.white,
  };
  const textStyle: TextStyle = {
    color: isDarkMode ? Color.white : Color.dark,
  };

  return (
    <Pressable
      style={({pressed}) => [
        {opacity: pressed ? 0.5 : 1.0},
        styles.button,
        backgroundStyle,
      ]}
      onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 7,
    elevation: 3,
    width: 150,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    ...fonts.regular,
  },
});
