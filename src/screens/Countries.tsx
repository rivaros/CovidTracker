import React, {useCallback} from 'react';
import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  FlatList,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSummaryPerCountryQuery} from '../api/covidApi';
import Color from '../styles/colors';
import {SummaryCountry} from '../api/model/CovidAPI';
import NavBar from '../components/NavBar';
import {useStore} from '../store';
import {countrySortModes} from '../common/constants/countrySortModes';
import {thousandFormatter} from '../common/funcs/thousandFormatter';

const Countries: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const countrySortMode = useStore(state => state.countrySortMode);
  const countrySearchString = useStore(state => state.countrySearchString);
  const setCountrySortMode = useStore(state => state.setCountrySortMode);
  const setCountrySearchString = useStore(
    state => state.setCountrySearchString,
  );

  const backgroundStyle: ViewStyle = {
    backgroundColor: isDarkMode ? Color.darker : Color.white,
    flex: 1,
  };
  const countryContainerStyle: ViewStyle = {
    backgroundColor: isDarkMode ? Color.lightBlack : Color.white,
    flex: 1,
  };
  const textStyle: TextStyle = {
    color: isDarkMode ? Color.white : Color.black,
  };

  const updateCountrySortMode = useCallback(
    (index: string) => {
      return setCountrySortMode(index as unknown as number);
    },
    [setCountrySortMode],
  );

  const updateSearchString = useCallback(
    (searchString: string) => {
      setCountrySearchString(searchString);
    },
    [setCountrySearchString],
  );

  const {
    isLoading,
    isError,
    data: summaryPerCountry,
  } = useSummaryPerCountryQuery();

  const _renderContryList = () => {
    if (isLoading) {
      return (
        <View>
          <Text style={textStyle}>Loading country list...</Text>
        </View>
      );
    }

    if (isError) {
      return (
        <View>
          <Text style={textStyle}>Error loading country list</Text>
        </View>
      );
    }

    let countryList;
    if (summaryPerCountry?.length) {
      countryList = summaryPerCountry;
      if (countrySearchString) {
        countryList = countryList.filter(
          country =>
            country.Country.toLowerCase().indexOf(
              countrySearchString.toLowerCase(),
            ) === 0,
        );
      } else {
        countryList = summaryPerCountry;
      }

      switch (countrySortMode) {
        case countrySortModes.indexOf('By New Cases'):
          countryList = countryList.sort((a, b) =>
            a.NewConfirmed < b.NewConfirmed ? 1 : -1,
          );
          break;
        case countrySortModes.indexOf('By New Deathes'):
          countryList = countryList.sort((a, b) =>
            a.NewDeaths < b.NewDeaths ? 1 : -1,
          );
          break;
        case countrySortModes.indexOf('By Total Cases'):
          countryList = countryList.sort((a, b) =>
            a.TotalConfirmed < b.TotalConfirmed ? 1 : -1,
          );
          break;
        case countrySortModes.indexOf('By Total Deathes'):
          countryList = countryList.sort((a, b) =>
            a.TotalDeaths < b.TotalDeaths ? 1 : -1,
          );
          break;
      }
    }

    const _renderItem = ({item: country}: {item: SummaryCountry}) => (
      <View style={{...styles.countryContainer, ...countryContainerStyle}}>
        <View style={styles.countryBox}>
          <Text style={{...styles.title, ...textStyle}}>{country.Country}</Text>
        </View>
        <View style={styles.casesBox}>
          <Text style={{...styles.cases, ...textStyle}}>
            {thousandFormatter(country.NewConfirmed.toString())}
          </Text>
          <Text style={{...styles.cases, ...textStyle}}>
            {thousandFormatter(country.NewDeaths.toString())}
          </Text>
          <Text style={{...styles.cases, ...textStyle}}>
            {thousandFormatter(country.TotalConfirmed.toString())}
          </Text>
          <Text style={{...styles.cases, ...textStyle}}>
            {thousandFormatter(country.TotalDeaths.toString())}
          </Text>
        </View>
      </View>
    );

    return (
      <FlatList
        style={styles.countryList}
        data={countryList}
        renderItem={_renderItem}
        keyExtractor={country => country.ID}
      />
    );
  };

  return (
    <SafeAreaView style={{...backgroundStyle, ...styles.mainContainer}}>
      <NavBar
        hideBottomBorder={false}
        title={'Countries'}
        updateSortMode={updateCountrySortMode}
        updateSearchString={updateSearchString}
      />
      {_renderContryList()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  closeContainer: {
    height: 30,
    width: 30,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginRight: 15,
    padding: 0,
    position: 'absolute',
    left: 15,
    top: 15,
  },
  countryList: {
    flex: 1,
  },
  countryContainer: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  countryBox: {
    flex: 3,
  },
  casesBox: {
    flex: 1,
  },
  title: {
    fontSize: 16,
  },
  cases: {
    fontSize: 10,
    textAlign: 'right',
    fontVariant: ['tabular-nums'],
  },
  textRight: {
    textAlign: 'right',
  },
});

export default Countries;
