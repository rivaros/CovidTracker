import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const StatRow: React.FC<{
  label: string;
  value: number;
}> = ({label, value}) => (
  <View style={styles.rowView}>
    <Text style={styles.rowText}>{label}</Text>
    <Text style={styles.rowText}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    padding: 2,
  },
  rowText: {
    flex: 1,
    color: 'white',
  },
});

export default StatRow;
