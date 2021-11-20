import React, {useRef, useCallback} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  TextInput,
  useColorScheme,
} from 'react-native';
import Color from '../styles/colors';
import fontStyle from '../styles/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import SortBy from './SortBy';
import {countrySortModes} from '../common/constants/countrySortModes';
import debounce from 'lodash/debounce';
import SearchIcon from '../assets/icons/search.svg';

export type Props = {
  style?: any;
  hideBottomBorder: boolean;
  updateSortMode: (index: string, option: string) => boolean | void;
  updateSearchString: (searchString: string) => void;
};

const NavBar: React.FC<Props> = ({
  hideBottomBorder,
  updateSortMode,
  updateSearchString,
}) => {
  const navigation = useNavigation();
  const inputRef = useRef(null);
  const isDarkMode = useColorScheme() === 'dark';

  const back = useCallback(async () => {
    updateSearchString('');
    navigation.goBack();
  }, [navigation, updateSearchString]);

  const performSearch = useCallback(
    async searchString => {
      return updateSearchString(searchString);
    },
    [updateSearchString],
  );

  const debouncedSearch = useRef(debounce(performSearch, 800)).current;
  const changeTextHandler = useCallback(
    searchString => {
      debouncedSearch(searchString);
    },
    [debouncedSearch],
  );

  // Setting the bar style on Android only works on API level 23+
  // https://github.com/facebook/react-native/blob/8ddf231306e3bd85be718940d04f11d23b570a62/ReactAndroid/src/main/java/com/facebook/react/modules/statusbar/StatusBarModule.java#L193
  // https://developer.android.com/reference/android/os/Build.VERSION_CODES#M
  const shouldUseDarkBar = Platform.OS === 'android' && Platform.Version < 23; // 23 = Marshmallow

  return (
    <SafeAreaView style={[!hideBottomBorder && styles.postsHeaderContainer]}>
      <StatusBar
        backgroundColor={shouldUseDarkBar ? Color.darkGrey : '#0000'}
        barStyle="dark-content"
        translucent
      />
      <View style={styles.postsHeader}>
        <View style={styles.sideContainer}>
          <TouchableOpacity onPress={back}>
            <Entypo
              name={'chevron-thin-left'}
              size={28}
              color={isDarkMode ? Color.white : Color.black}
            />
          </TouchableOpacity>
          <View style={styles.fill} />
        </View>
        <View style={styles.center}>
          <TouchableOpacity style={styles.searchBarView} activeOpacity={0.75}>
            <SearchIcon style={styles.searchIcon} height={17} width={17} />
            <TextInput
              ref={inputRef}
              style={styles.searchTextInput}
              placeholder={'Search countries...'}
              placeholderTextColor={Color.grey}
              onChangeText={changeTextHandler}
              autoCorrect={false}
              autoFocus={true}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.sideContainer}>
          <SortBy sortChoices={countrySortModes} onSelect={updateSortMode} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  postsHeaderContainer: {
    borderBottomWidth: 1,
    borderColor: Color._e3e3e3,
  },
  postsHeader: {
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingHorizontal: 3,
    paddingTop: 12,
    paddingBottom: 12,
    // backgroundColor: 'green',
  },
  sideContainer: {
    flexDirection: 'row',
    width: 40,
    alignItems: 'center',
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  searchBarView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    width: '100%',
    borderRadius: 15,
    backgroundColor: Color.searchBoxGrey,
    alignSelf: 'center',
    flex: 1,
  },
  searchIcon: {
    color: Color.darkGrey,
    marginLeft: 16,
    marginRight: 16,
  },
  fill: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  titleText: {
    color: Color.black,
    ...fontStyle.bold,
    fontSize: 16,
  },
  searchTextInput: {
    flex: 1,
    ...fontStyle.regular,
    fontSize: 15,
    alignSelf: 'stretch',
    padding: 0,
    color: Color.darkGrey,
  },
});

export default NavBar;
