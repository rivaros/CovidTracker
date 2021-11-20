import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  useColorScheme,
} from 'react-native';
import Button from '../components/Button';
import {Picker} from '@react-native-picker/picker';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from '../styles/colors';
import fonts from '../styles/fonts';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useStore} from '../store';
import {caseTypes, CASE_ACTIVE} from '../common/constants/caseTypes';

const ReportCase: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const isDarkMode = useColorScheme() === 'dark';
  const countryList = useStore(state => state.countryList);
  const addCountryCase = useStore(state => state.addCountryCase);
  const [selectedCountry, setSelectedCountry] = useState<string>(
    countryList[0].ISO2,
  );
  const [selectedCaseType, setSelectedCaseType] = useState(CASE_ACTIVE);

  return (
    <View style={styles.wrapper}>
      <View
        style={
          isDarkMode
            ? {
                color: Color.black,
                backgroundColor: Color.darkishGrey,
                ...styles.content,
                ...fonts.regular,
              }
            : {
                color: Color.black,
                backgroundColor: Color.white,
                ...styles.content,
                ...fonts.regular,
              }
        }>
        <TouchableOpacity
          onPress={navigation.goBack}
          style={styles.closeContainer}>
          <MaterialIcon name="close" color={Color.grey} size={25} />
        </TouchableOpacity>
        <Text style={styles.title}>Report new COVID case</Text>
        <View
          style={
            isDarkMode
              ? {...styles.section, backgroundColor: Color.lightGrey}
              : {...styles.section, backgroundColor: Color.white}
          }>
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionHeadingText}>Country</Text>
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              itemStyle={styles.pickerItem}
              selectedValue={selectedCountry}
              onValueChange={setSelectedCountry}>
              {countryList.map(country => (
                <Picker.Item
                  label={country.Country}
                  value={country.ISO2}
                  key={country.ISO2}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View
          style={
            isDarkMode
              ? {...styles.section, backgroundColor: Color.lightGrey}
              : {...styles.section, backgroundColor: Color.white}
          }>
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionHeadingText}>Case</Text>
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              itemStyle={styles.pickerItem}
              selectedValue={selectedCaseType}
              onValueChange={setSelectedCaseType}>
              {Object.keys(caseTypes).map(caseTypeKey => (
                <Picker.Item
                  label={caseTypes[caseTypeKey]}
                  value={caseTypeKey}
                  key={caseTypeKey}
                />
              ))}
            </Picker>
          </View>
        </View>
        {selectedCountry && selectedCaseType && (
          <View style={styles.buttonContainer}>
            <Button
              title={'SUBMIT'}
              onPress={() => {
                addCountryCase(selectedCountry, selectedCaseType);
                const countryReportedCases =
                  useStore.getState().countryReportedCases;
                const countryName = countryList
                  .filter(country => country.ISO2 === selectedCountry)
                  .pop()?.Country;
                Alert.alert(
                  `Country: ${countryName}`,
                  `Total reported cases by this app:\n new ${
                    countryReportedCases[selectedCountry]?.NewConfirmed || 0
                  }\n deaths ${
                    countryReportedCases[selectedCountry]?.NewDeaths || 0
                  }\n recovered ${
                    countryReportedCases[selectedCountry]?.NewRecovered || 0
                  }`,
                  [{text: 'OK', onPress: () => navigation.goBack()}],
                );
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default ReportCase;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  content: {
    height: '80%',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    overflow: 'hidden',
  },

  closeContainer: {
    height: 30,
    width: 30,
    backgroundColor: Color.lightestGrey,
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

  title: {
    ...fonts.bold,
    color: Color.black,
    fontSize: 18,
    marginVertical: 20,
    alignSelf: 'center',
  },

  section: {
    width: '90%',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    alignSelf: 'center',
    backgroundColor: Color.white,
  },

  sectionHeadingText: {
    color: Color.flatBlack,
    ...fonts.bold,
    fontSize: 16,
  },

  sectionHeading: {
    marginBottom: 10,
  },

  pickerContainer: {
    overflow: 'hidden',
  },

  picker: {
    height: 100,
    width: '100%',
  },

  pickerItem: {
    height: 120,
  },

  buttonContainer: {
    alignItems: 'center',
  },
});
