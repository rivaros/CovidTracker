import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Button,
} from 'react-native';
import {StackedAreaChart, YAxis, Grid} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import {useQuery} from 'react-query';
import {getSummary, getStats, getWorldSummary} from '../api/covidApi';
import {Stats, Summary, Global, SummaryCountry} from '../api/model/CovidAPI';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';
import {COUNTRIES_SCREEN} from '../navigation/constants';
import StatRow from '../components/StatRow';

const getTopCovidCountries = () => {
  return getSummary().then((summary: Summary) => {
    const countries = summary.Countries;
    const countriesSorted = countries
      .sort((a, b) => (a.TotalConfirmed < b.TotalConfirmed ? 1 : -1))
      .slice(0, 5);
    __DEV__ &&
      countriesSorted.forEach(country => {
        console.log(country.Country, ' has ', country.TotalConfirmed);
      });
    return countriesSorted;
  });
};

const getWorldSummaryInfo = () => {
  const to = new Date();
  const from = new Date();
  from.setMonth(from.getMonth() - 1);
  return getWorldSummary(from, to).then((listOfStats: Global[]) => {
    const sortedTimeSeries = listOfStats.sort((a, b) =>
      a.Date > b.Date ? 1 : -1,
    );
    __DEV__ &&
      sortedTimeSeries.forEach(stat => {
        console.log(stat.NewConfirmed, ' at ', stat.Date);
      });
    return sortedTimeSeries;
  });
};

interface covidDailyData {
  pointInTime: Date;
  confirmed: number;
  deathes: number;
}

const Section: React.FC<{
  title: string;
  style?: any;
}> = ({children, title, style}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={{...styles.sectionContainer, ...style}}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );
};

const renderItem = ({item: country}: {item: SummaryCountry}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{country.Country}</Text>
  </View>
);

const Main: React.FC = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };
  const {data: topCovidCountries} = useQuery(
    'top-covid-countries',
    getTopCovidCountries,
  );
  const {data: worldSummary} = useQuery(
    'world-summary-info',
    getWorldSummaryInfo,
  );

  let dailyData: covidDailyData[] = [];
  let totalData: covidDailyData[] = [];
  if (worldSummary) {
    worldSummary.map(data => {
      dailyData.push({
        pointInTime: data.Date,
        confirmed: data.NewConfirmed,
        deathes: data.NewDeaths,
      });
      totalData.push({
        pointInTime: data.Date,
        confirmed: data.TotalConfirmed,
        deathes: data.TotalDeaths,
      });
      console.log('WOW', dailyData[0].pointInTime);
    });
  }

  const colors = ['#333333', '#8800cc'];
  const keys = ['deathes', 'confirmed'];
  const svgs = [
    {onPress: () => console.log('confirmed')},
    {onPress: () => console.log('deathes')},
  ];

  const contentInset = {top: 20, bottom: 20};

  return (
    <SafeAreaView style={{...backgroundStyle, ...styles.mainContainer}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
          ...styles.screenContainer,
        }}>
        <Section title="TOP COVID COUNTRIES">
          <FlatList
            style={styles.countryList}
            data={topCovidCountries}
            renderItem={renderItem}
            keyExtractor={country => country.ID}
          />
          <Button
            title={'See more'}
            onPress={() => {
              navigation.push(COUNTRIES_SCREEN);
            }}
          />
        </Section>
        {worldSummary?.length && (
          <Section title="GLOBAL CASES" style={{flex: 2}}>
            <StatRow
              label={'New confirmed cases:'}
              value={worldSummary[worldSummary.length - 1].NewConfirmed}
            />
            <StatRow
              label={'New deathes:'}
              value={worldSummary[worldSummary.length - 1].NewDeaths}
            />
            <StatRow
              label={'New recovered:'}
              value={worldSummary[worldSummary.length - 1].NewRecovered}
            />
            <StatRow
              label={'Total confirmed:'}
              value={worldSummary[worldSummary.length - 1].TotalConfirmed}
            />
            <StatRow
              label={'Total deathes:'}
              value={worldSummary[worldSummary.length - 1].TotalDeaths}
            />
            <StatRow
              label={'Total recovered:'}
              value={worldSummary[worldSummary.length - 1].TotalRecovered}
            />
            <View style={styles.chartView}>
              <YAxis
                data={dailyData.map(obj => obj.confirmed + obj.deathes)}
                svg={{
                  fill: 'white',
                  fontSize: 10,
                }}
                numberOfTicks={5}
                formatLabel={value => {
                  const valueInMln = value / 1000;
                  return `${valueInMln} k`;
                }}
              />
              <StackedAreaChart
                style={{flex: 1, marginLeft: 16}}
                data={dailyData}
                keys={keys}
                colors={colors}
                curve={shape.curveNatural}
                showGrid={false}
                svgs={svgs}
                // xAccessor={({item}) => item.pointInTime.getTime()}
              />
            </View>
            <View style={styles.chartView}>
              <YAxis
                data={totalData.map(obj => obj.confirmed + obj.deathes)}
                contentInset={contentInset}
                svg={{
                  fill: 'grey',
                  fontSize: 10,
                }}
                numberOfTicks={5}
                formatLabel={value => {
                  const valueInMln = value / 1000000;
                  return `${valueInMln} mln`;
                }}
              />
              <StackedAreaChart
                style={{flex: 1, marginLeft: 16}}
                data={totalData}
                keys={keys}
                colors={colors}
                curve={shape.curveNatural}
                showGrid={false}
                svgs={svgs}
              />
            </View>
          </Section>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flex: 1,
  },
  sectionContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
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
  chartView: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Main;
