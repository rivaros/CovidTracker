import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import Color from '../styles/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import ModalDropdown from 'react-native-modal-dropdown';
import fonts from '../styles/fonts';

export type Props = {
  sortChoices: string[];
  onSelect: (index: string, option: string) => boolean | void;
};

const SortBy: React.FC<Props> = ({sortChoices, onSelect}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ModalDropdown
      options={sortChoices}
      defaultIndex={0}
      onSelect={onSelect}
      dropdownStyle={[
        styles.dropDown,
        {backgroundColor: isDarkMode ? Color.darkGrey : Color.white},
      ]}
      dropdownTextStyle={[
        styles.dropDownText,
        {
          color: Color.black,
          backgroundColor: isDarkMode ? Color.darkGrey : Color.darkerWhite,
        },
      ]}
      dropdownTextHighlightStyle={[
        styles.dropDownTextHighlight,
        {
          color: Color.black,
          backgroundColor: isDarkMode ? Color.darkGrey : Color.darkerWhite,
        },
      ]}>
      <MaterialIcon
        name={'sort'}
        size={28}
        color={isDarkMode ? Color.white : Color.black}
      />
    </ModalDropdown>
  );
};

export default SortBy;

const styles = StyleSheet.create({
  dropDown: {
    width: 200,
    height: 160,
    borderWidth: 0,
  },
  dropDownText: {
    height: 40,
    textAlign: 'right',
    paddingTop: 12,
    ...fonts.regular,
  },
  dropDownTextHighlight: {
    ...fonts.bold,
  },
  dropDownLight: {
    color: Color.black,
    backgroundColor: Color.white,
  },
  dropDownDark: {
    color: Color.black,
    backgroundColor: Color.darkGrey,
  },
});
