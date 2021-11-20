import {StyleSheet, TextStyle, Platform} from 'react-native';

type Style = {
  regular: TextStyle;
  light: TextStyle;
  italic: TextStyle;
  bold: TextStyle;
};

const styles = StyleSheet.create<Style>({
  regular: <TextStyle>Platform.select<TextStyle>({
    ios: {
      fontFamily: 'Montserrat',
      fontWeight: '400',
    },
    android: {
      fontFamily: 'Montserrat-Regular',
    },
  }),

  light: <TextStyle>Platform.select<TextStyle>({
    ios: {
      fontFamily: 'Montserrat',
      fontWeight: '300',
    },
    android: {
      fontFamily: 'Montserrat-Light',
    },
  }),

  italic: <TextStyle>Platform.select<TextStyle>({
    ios: {
      fontFamily: 'Montserrat',
      fontStyle: 'italic',
    },
    android: {
      fontFamily: 'Montserrat-Italic',
    },
  }),

  bold: <TextStyle>Platform.select<TextStyle>({
    ios: {
      fontFamily: 'Montserrat',
      fontWeight: '700',
    },
    android: {
      fontFamily: 'Montserrat-Bold',
    },
  }),
});

export default styles;
