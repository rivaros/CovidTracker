import React, {useEffect} from 'react';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
import Color from '../styles/colors';
import {View, StyleSheet, StatusBar} from 'react-native';
import {useQueryClient} from 'react-query';
import {getSummaryPerCountry, getWorldSummary} from '../api/covidApi';
import {useStore} from '../store';

export const AppLoader: React.FC = () => {
  const _renderGradientBackground = () => {
    return (
      <Svg height="100%" width="100%" style={styles.gradientBackground}>
        <Defs>
          <LinearGradient
            id="Gradient"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="100%"
            y2="100%">
            <Stop offset="0" stopColor={Color.darkGrey} stopOpacity="1" />
            <Stop offset="1" stopColor={Color.black} stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient)" />
      </Svg>
    );
  };

  const _renderScreenContent = () => {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={Color.primaryColor}
          barStyle="light-content"
          translucent
          hidden
        />
        <View style={styles.fill} />
        <View style={styles.splashContainer} />
        {/* <Text style={styles.versionInfo}>{getVersion()}</Text>
        <View style={{height: getBottomSpace()}} /> */}
      </View>
    );
  };

  const queryClient = useQueryClient();
  const setReady = useStore(state => state.setReady);

  useEffect(() => {
    const to = new Date();
    const from = new Date();
    from.setMonth(from.getMonth() - 12);
    Promise.all([
      queryClient.prefetchQuery(['summaryPerCountry'], getSummaryPerCountry),
      queryClient.prefetchQuery(['worldSummaryChart'], () =>
        getWorldSummary(from, to),
      ),
    ]).then(() => {
      setReady(true);
    });
  }, [queryClient, setReady]);

  return (
    <>
      {_renderGradientBackground()}
      {_renderScreenContent()}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientBackground: {
    position: 'absolute',
    justifyContent: 'center',
  },
  errorContainer: {
    padding: 50,
    backgroundColor: Color.white,
    flex: 0,
    minHeight: '100%',
  },
  versionInfo: {
    marginBottom: 10,
    marginRight: 10,
    alignSelf: 'flex-end',
    color: '#fff6',
  },
  jobIndicator: {
    height: 3,
    flex: 1,
    backgroundColor: '#0003',
    marginBottom: 8,
  },
  jobDoneIndicator: {
    backgroundColor: '#fffa',
  },
  jobsIndicatorWrapper: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    flex: 0,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    width: 30,
    height: 30,
    alignItems: 'center',
  },
  fill: {
    flex: 1,
  },
  splashContainer: {
    flex: 2,
  },
  logo: {
    height: '100%',
    width: '60%',
  },
});
