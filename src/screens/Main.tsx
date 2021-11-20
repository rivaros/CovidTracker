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
import {StackedAreaChart, YAxis} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import {
  useSummaryPerCountryQuery,
  useWorldSummaryChartQuery,
} from '../api/covidApi';
import {Global, SummaryCountry} from '../api/model/CovidAPI';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';
import {COUNTRIES_SCREEN} from '../navigation/constants';
import StatRow from '../components/StatRow';
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
  const {data: summaryPerCountry} = useSummaryPerCountryQuery();
  const to = new Date();
  const from = new Date();
  from.setMonth(from.getMonth() - 1);
  const {data: worldSummaryChart} = useWorldSummaryChartQuery(from, to);

  let top5Countries: SummaryCountry[] = [];
  if (summaryPerCountry) {
    top5Countries = summaryPerCountry
      .sort((a, b) => (a.TotalConfirmed < b.TotalConfirmed ? 1 : -1))
      .slice(0, 5);
  }

  let dailyData: covidDailyData[] = [];
  let totalData: covidDailyData[] = [];
  let latestWorldSummary: Global;
  if (worldSummaryChart) {
    const worldSummaryChartSorted = worldSummaryChart.sort((a, b) =>
      a.Date > b.Date ? 1 : -1,
    );
    worldSummaryChartSorted.map(data => {
      dailyData.push({
        pointInTime: new Date(data.Date),
        confirmed: data.NewConfirmed,
        deathes: data.NewDeaths,
      });
      totalData.push({
        pointInTime: new Date(data.Date),
        confirmed: data.TotalConfirmed,
        deathes: data.TotalDeaths,
      });
    });
    latestWorldSummary =
      worldSummaryChartSorted[worldSummaryChartSorted.length - 1];
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
            data={top5Countries}
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
        {latestWorldSummary && (
          <Section title="GLOBAL CASES" style={{flex: 2}}>
            <StatRow
              label={'New confirmed cases:'}
              value={latestWorldSummary.NewConfirmed}
            />
            <StatRow
              label={'New deathes:'}
              value={latestWorldSummary.NewDeaths}
            />
            <StatRow
              label={'New recovered:'}
              value={latestWorldSummary.NewRecovered}
            />
            <StatRow
              label={'Total confirmed:'}
              value={latestWorldSummary.TotalConfirmed}
            />
            <StatRow
              label={'Total deathes:'}
              value={latestWorldSummary.TotalDeaths}
            />
            <StatRow
              label={'Total recovered:'}
              value={latestWorldSummary.TotalRecovered}
            />
            {/* <View style={styles.chartView}>
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
                style={styles.chartYAxis}
              />
              <StackedAreaChart
                style={styles.chart}
                data={dailyData}
                keys={keys}
                colors={colors}
                curve={shape.curveNatural}
                showGrid={false}
                svgs={svgs}
                xAccessor={({item}) => item.pointInTime.getTime()}
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
                style={styles.chartYAxis}
              />
              <StackedAreaChart
                style={styles.chart}
                data={totalData}
                keys={keys}
                colors={colors}
                curve={shape.curveNatural}
                showGrid={false}
                svgs={svgs}
              />
            </View> */}
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
    // backgroundColor: '#f9c2ff',
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
  chart: {
    flex: 1,
    marginLeft: 16,
  },
  chartYAxis: {
    width: 40,
  },
});

export default Main;
