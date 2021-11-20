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
      fontFamily: 'Montserrat_regular',
    },
  }),

  light: <TextStyle>Platform.select<TextStyle>({
    ios: {
      fontFamily: 'Montserrat',
      fontWeight: '300',
    },
    android: {
      fontFamily: 'Montserrat_light',
    },
  }),

  italic: <TextStyle>Platform.select<TextStyle>({
    ios: {
      fontFamily: 'Montserrat',
      fontStyle: 'italic',
    },
    android: {
      fontFamily: 'Montserrat_italic',
    },
  }),

  bold: <TextStyle>Platform.select<TextStyle>({
    ios: {
      fontFamily: 'Montserrat',
      fontWeight: '700',
    },
    android: {
      fontFamily: 'Montserrat_bold',
    },
  }),
});

export default styles;
