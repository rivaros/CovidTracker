import React from 'react';
import {
  View,
  Text,
  Button,
  useColorScheme,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getSummary, getStats, getWorldSummary} from '../api/covidApi';
import {Stats, Summary, Global} from '../api/model/CovidAPI';
import {useNavigation} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useQuery} from 'react-query';
import {SummaryCountry} from '../api/model/CovidAPI';

const getAllCountries = () => {
  return getSummary().then((summary: Summary) => {
    const countries = summary.Countries;
    const countriesSorted = countries.sort((a, b) =>
      a.TotalConfirmed < b.TotalConfirmed ? 1 : -1,
    );
    __DEV__ &&
      countriesSorted.forEach(country => {
        console.log(country.Country, ' has ', country.TotalConfirmed);
      });
    return countriesSorted;
  });
};

const renderItem = ({item: country}: {item: SummaryCountry}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{country.Country}</Text>
  </View>
);

const Countries: React.FC = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const {data: allCountries} = useQuery('all-countries', getAllCountries);

  return (
    <SafeAreaView style={{...backgroundStyle, ...styles.mainContainer}}>
      <Button title={'Go Back'} onPress={navigation.goBack} />
      <FlatList
        style={styles.countryList}
        data={allCountries}
        renderItem={renderItem}
        keyExtractor={country => country.ID}
      />
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
    //backgroundColor: 'red',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    flex: 1,
  },
  title: {
    fontSize: 16,
  },
});

export default Countries;
