import React from 'react';
import {StyleSheet, Text, View, TextStyle, useColorScheme} from 'react-native';
import Color from '../styles/colors';
import {thousandFormatter} from '../common/funcs/thousandFormatter';

type Props = {
  label: string;
  value: number;
};

const StatRow: React.FC<Props> = ({label, value}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const textStyle: TextStyle = {
    color: isDarkMode ? Color.white : Color.black,
  };

  return (
    <View style={styles.rowView}>
      <Text style={{...styles.rowText, ...textStyle}}>{label}</Text>
      <Text style={{...styles.rowText, ...styles.right, ...textStyle}}>
        {thousandFormatter(value.toString())}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    padding: 2,
  },
  rowText: {
    flex: 1,
    color: 'white',
  },
  right: {
    textAlign: 'right',
  },
});

export default StatRow;
