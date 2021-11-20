import React, {useCallback, useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../components/Button';
import {useStore} from '../store';
import Color from '../styles/colors';
import fonts from '../styles/fonts';
import {thousandFormatter} from '../common/funcs/thousandFormatter';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {COUNTRIES_SCREEN, POPUP_ADD_NEW_CASE} from '../navigation/constants';
import {StackedAreaChart, YAxis} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import {
  useSummaryPerCountryQuery,
  useWorldSummaryChartQuery,
  getCountries,
} from '../api/covidApi';
import {Global, SummaryCountry} from '../api/model/CovidAPI';
import StatRow from '../components/StatRow';

type covidDailyData = {
  pointInTime: Date;
  confirmed: number;
  deathes: number;
};

type covidDailyDataKey = keyof covidDailyData;

type SectionProps = {
  title: string;
  style?: any;
};

const Section: React.FC<SectionProps> = ({children, title, style}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={{...styles.sectionContainer, ...style}}>
      <Text
        style={{
          ...styles.sectionTitle,
          color: isDarkMode ? Color.white : Color.black,
        }}>
        {title}
      </Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );
};

const Main: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const isDarkMode = useColorScheme() === 'dark';
  const setCountryList = useStore(state => state.setCountryList);

  const onAddNewCase = useCallback(() => {
    navigation.push(POPUP_ADD_NEW_CASE);
  }, [navigation]);

  const backgroundStyle: ViewStyle = {
    backgroundColor: isDarkMode ? Color.darker : Color.white,
    flex: 1,
  };
  const textStyle: TextStyle = {
    color: isDarkMode ? Color.white : Color.dark,
  };

  // set country list once and save to state
  useEffect(() => {
    getCountries().then(countryList => {
      countryList = countryList.sort((a, b) =>
        a.Country < b.Country ? -1 : 1,
      );
      setCountryList(countryList);
    });
  }, [setCountryList]);

  const {
    isLoading: loadingSummaryPerCountry,
    isError: errorSummaryPerCountry,
    data: summaryPerCountry,
  } = useSummaryPerCountryQuery();

  const to = new Date();
  const from = new Date();
  from.setMonth(from.getMonth() - 12);
  const {
    isLoading: loadingWorldSummaryChart,
    isError: errorWorldSummaryChart,
    data: worldSummaryChart,
  } = useWorldSummaryChartQuery(from, to);

  const _renderCountry = ({item: country}: {item: SummaryCountry}) => (
    <View style={styles.countryContainer}>
      <Text style={{...styles.countryName, ...textStyle}}>
        {country.Country}
      </Text>
      <Text style={{...styles.countryCases, ...styles.right, ...textStyle}}>
        {thousandFormatter(country.TotalConfirmed.toString())}
      </Text>
    </View>
  );

  const _renderTopCovidCountries = () => {
    if (loadingSummaryPerCountry) {
      return (
        <View>
          <Text style={textStyle}>Loading top cases...</Text>
        </View>
      );
    }

    if (errorSummaryPerCountry) {
      return (
        <View>
          <Text style={textStyle}>Error loading countries</Text>
        </View>
      );
    }

    let top5Countries: SummaryCountry[] = [];
    if (summaryPerCountry) {
      top5Countries = summaryPerCountry
        .sort((a, b) => (a.TotalConfirmed < b.TotalConfirmed ? 1 : -1))
        .slice(0, 5);
    }

    return (
      <Section title="TOP COUNTRIES BY COVID CASES" style={{height: 300}}>
        <FlatList
          style={styles.countryList}
          data={top5Countries}
          renderItem={_renderCountry}
          keyExtractor={country => country.CountryCode}
        />
        <View style={styles.horizontalFlex}>
          <View style={styles.buttonContainer}>
            <Button
              title={'see more'}
              onPress={() => {
                navigation.push(COUNTRIES_SCREEN);
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button title={'report case'} onPress={onAddNewCase} />
          </View>
        </View>
      </Section>
    );
  };

  const _renderChartStatistics = () => {
    if (loadingWorldSummaryChart) {
      return (
        <View>
          <Text style={textStyle}>Loading chart statistics...</Text>
        </View>
      );
    }

    if (errorWorldSummaryChart) {
      return (
        <View>
          <Text style={textStyle}>Error loading statistics</Text>
        </View>
      );
    }
    let dailyData: covidDailyData[] = [];
    let totalData: covidDailyData[] = [];
    let latest: Global | undefined;
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
      latest = worldSummaryChartSorted[worldSummaryChartSorted.length - 1];
    }

    const colors = ['#333333', '#8800cc'];
    const keys: covidDailyDataKey[] = ['deathes', 'confirmed'];

    const contentInset = {top: 20, bottom: 20};

    if (!latest) {
      return (
        <View>
          <Text style={textStyle}>Error determining latest covid data</Text>
        </View>
      );
    }

    return (
      <Section title="GLOBAL STATS" style={{flex: 1}}>
        <StatRow label={'New confirmed:'} value={latest.NewConfirmed} />
        <StatRow label={'New deathes:'} value={latest.NewDeaths} />
        <StatRow label={'Total confirmed:'} value={latest.TotalConfirmed} />
        <StatRow label={'Total deathes:'} value={latest.TotalDeaths} />
        <View style={styles.chartView}>
          <YAxis
            data={dailyData.map(obj => obj.confirmed + obj.deathes)}
            svg={{
              fill: isDarkMode ? Color.white : Color.dark,
              fontSize: 10,
            }}
            numberOfTicks={3}
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
            xAccessor={({item}) => item.pointInTime.getTime()}
          />
        </View>
        <View style={styles.chartDesc}>
          <Text style={{...styles.chartDescText, ...textStyle}}>per day</Text>
        </View>
        <View style={styles.chartView}>
          <YAxis
            data={totalData.map(obj => obj.confirmed + obj.deathes)}
            contentInset={contentInset}
            svg={{
              fill: isDarkMode ? Color.white : Color.dark,
              fontSize: 10,
            }}
            numberOfTicks={2}
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
          />
        </View>
        <View style={styles.chartDesc}>
          <Text style={{...styles.chartDescText, ...textStyle}}>total</Text>
        </View>
      </Section>
    );
  };

  return (
    <SafeAreaView style={{...backgroundStyle, ...styles.mainContainer}}>
      <StatusBar
        translucent
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? Color.black : Color.white}
      />
      <View
        style={{
          backgroundColor: isDarkMode ? Color.black : Color.white,
          ...styles.screenContainer,
        }}>
        {_renderTopCovidCountries()}
        {_renderChartStatistics()}
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
  horizontalFlex: {
    paddingTop: 20,
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  sectionContainer: {
    marginTop: 15,
    paddingHorizontal: 24,
    paddingBottom: 10,
  },
  sectionContent: {
    flex: 1,
  },
  sectionTitle: {
    ...fonts.bold,
    textAlign: 'center',
    paddingBottom: 10,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  countryList: {},
  countryContainer: {
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 0,
    flexDirection: 'row',
  },
  countryName: {
    fontSize: 16,
    flex: 2,
  },
  countryCases: {
    fontSize: 16,
    flex: 1,
    fontVariant: ['tabular-nums'],
  },
  chartView: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 20,
    marginBottom: 10,
  },
  chart: {
    flex: 1,
    marginLeft: 16,
  },
  chartYAxis: {
    width: 40,
  },
  chartDesc: {},
  chartDescText: {
    ...fonts.regular,
    fontSize: 10,
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
});

export default Main;
