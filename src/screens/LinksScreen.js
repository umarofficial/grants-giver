import React from 'react';
import {
  Platform,
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Picker,
  DatePickerIOS,
  DatePickerAndroid
} from 'react-native';
import { ImagePicker } from 'expo';
import { Ionicons } from '@expo/vector-icons';

const trades = {
  Communications: ['Recharge Card', 'Phone Accessories', 'Phones Charging'],
  b: ['b1', 'b2', 'b3'],
  c: ['c1', 'c2', 'c3'],
  other: []
};

const defaultState = {
  firstName: { value: '', error: '' },
  middleName: { value: '', error: '' },
  lastName: { value: '', error: '' },
  phone: { value: '', error: '' },
  address: { value: '', error: '' },
  dob: new Date(2000, 0, 1),
  trade: 'Communications',
  subTrade: '',
  otherTrade: { value: '', error: '' },
  market: { value: '', error: '' },
  grantCode: { value: '', error: '' },
  acctNumber: '',
  bvn: '',
  tradeImage: { value: null, error: false },
  beneficiaryImage: { value: null, error: false }
};

const greyColor = '#D8D8D8';

const randomNumber = max => Math.floor(Math.random() * Math.floor(max));

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Register'
  };

  state = {};

  componentWillMount() {
    this.resetState();
    this.resetSaveButton();
  }

  resetState = () => this.setState({ ...defaultState });

  resetSaveButton = () => {
    this.setState({
      saveButtonText: 'Save',
      saveButtonBackgroundColor: '#FF3366',
      saveButtonColor: '#FFF',
      disableSaveButton: false,
      saving: false
    });
  };

  renderTradeTypes = () =>
    Object.keys(trades).map((trade, index) => (
      <Picker.Item key={index} label={trade} value={trade} />
    ));

  renderTradeSubTypes = () =>
    trades[this.state.trade].map((trade, index) => (
      <Picker.Item key={index} label={trade} value={trade} />
    ));

  handleDate = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: this.state.dob,
        mode: 'spinner'
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        console.log('Date: ', action, year, month, day);
        this.setState({ dob: new Date(year, month, day) });
      }
    } catch ({ code, message }) {
      //
    }
  };

  handlePickImage = async type => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4]
    });

    if (!result.cancelled) {
      this.setState({ [type]: { value: result.uri, error: false } });
    }
  };

  handleChange = (name, value) => {
    let error = '';
    const optional = ['middleName', 'acctNumber', 'bvn'];
    if (value) {
      switch (name) {
        case 'phone':
          if (this.invalidNumber(value, 11)) error = 'Invalid phone';
          break;
        case 'acctNumber':
          if (this.invalidNumber(value, 10)) error = 'Invalid Account';
          break;
        case 'bvn':
          if (this.invalidNumber(value, 11)) error = 'Invalid BVN';
          break;
        default:
      }
    } else if (!optional.includes(name)) {
      error = 'This field is required';
    }
    this.setState({ [name]: { value, error } });
  };

  invalidNumber = (value, length) => {
    const invalidLength = value.length < length || value.length > length;
    return isNaN(value) || invalidLength;
  };

  invalidOptionals = (acctNumber, bvn) =>
    [acctNumber, bvn].some(({ error }) => Boolean(error));

  invalidInputs = () => {
    const {
      firstName,
      lastName,
      phone,
      address,
      trade,
      otherTrade,
      market,
      grantCode,
      acctNumber,
      bvn,
      tradeImage,
      beneficiaryImage
    } = this.state;
    let fields = [
      firstName,
      lastName,
      phone,
      address,
      market,
      grantCode,
      tradeImage,
      beneficiaryImage
    ];
    if (trade === 'other') fields = [...fields, otherTrade];
    if (!tradeImage.value || !beneficiaryImage.value) {
      this.setState({
        tradeImage: { ...tradeImage, error: !tradeImage.value },
        beneficiaryImage: {
          ...beneficiaryImage,
          error: !beneficiaryImage.value
        }
      });
    }
    return (
      this.invalidOptionals(acctNumber, bvn) ||
      fields.some(({ value, error }) => !value || Boolean(error))
    );
  };

  handleSave = () => {
    const invalidInputs = this.invalidInputs();
    if (invalidInputs) {
      const { acctNumber, bvn } = this.state;
      const invalidOptionals = this.invalidOptionals(acctNumber, bvn);
      this.setState(
        {
          saveButtonText: `${
            invalidOptionals ? 'Some fields' : 'Fields with *'
          } required valid values`,
          saveButtonBackgroundColor: 'transparent',
          saveButtonColor: 'red',
          disableSaveButton: true
        },
        () => setTimeout(() => this.resetSaveButton(), 5000)
      );
    } else {
      this.setState(
        {
          saveButtonText: 'Saving...',
          disableSaveButton: true
        },
        () =>
          setTimeout(() => {
            this.setState(
              {
                saveButtonText: 'Saved!',
                saveButtonBackgroundColor: 'green',
                disableSaveButton: true
              },
              () =>
                setTimeout(() => {
                  this.resetSaveButton();
                  this.resetState();
                }, 2000)
            );
          }, randomNumber(3000))
      );
    }
  };

  render() {
    const {
      firstName,
      middleName,
      lastName,
      phone,
      address,
      dob,
      trade,
      subTrade,
      otherTrade,
      market,
      grantCode,
      acctNumber,
      bvn,
      tradeImage,
      beneficiaryImage,
      saveButtonText,
      saveButtonBackgroundColor,
      saveButtonColor,
      disableSaveButton,
      saving
    } = this.state;
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <ScrollView style={styles.container}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <View style={styles.headerTitleView}>
                <Text style={styles.titleViewText}>Add Beneficiary</Text>
              </View>
            </View>

            <View style={styles.inputsContainer}>
              <View
                style={[styles.inputContainer, firstName.error && styles.error]}
              >
                <TextInput
                  style={styles.input}
                  placeholder="*First Name"
                  placeholderTextColor={greyColor}
                  value={firstName.value}
                  onChangeText={val => this.handleChange('firstName', val)}
                />
                <Text style={styles.errorText}>{firstName.error || ''}</Text>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder=" Middle Name"
                  placeholderTextColor={greyColor}
                  value={middleName.value}
                  onChangeText={val => this.handleChange('middleName', val)}
                />
              </View>

              <View
                style={[styles.inputContainer, lastName.error && styles.error]}
              >
                <TextInput
                  style={styles.input}
                  placeholder="*Last Name"
                  placeholderTextColor={greyColor}
                  value={lastName.value}
                  onChangeText={val => this.handleChange('lastName', val)}
                />
                <Text style={styles.errorText}>{lastName.error || ''}</Text>
              </View>

              <View
                style={[styles.inputContainer, phone.error && styles.error]}
              >
                <TextInput
                  style={styles.input}
                  placeholder="*Phone"
                  placeholderTextColor={greyColor}
                  value={phone.value}
                  onChangeText={val => this.handleChange('phone', val)}
                />
                <Text style={styles.errorText}>{phone.error || ''}</Text>
              </View>

              <View
                style={[styles.inputContainer, address.error && styles.error]}
              >
                <TextInput
                  style={styles.input}
                  placeholder="*Address"
                  placeholderTextColor={greyColor}
                  value={address.value}
                  onChangeText={val => this.handleChange('address', val)}
                />
                <Text style={styles.errorText}>{address.error || ''}</Text>
              </View>

              <View>
                <Text style={styles.dropdownLabel}>
                  Date of Birth: {dob.toDateString()}
                </Text>
                {Platform.OS === 'ios' ? (
                  <DatePickerIOS
                    date={dob}
                    onDateChange={dob => this.setState({ dob })}
                    mode="date"
                  />
                ) : (
                  <TouchableOpacity
                    onPress={this.handleDate}
                    activeOpacity={0.5}
                  >
                    <View style={styles.button}>
                      <Text style={styles.buttonText}>Select Date</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>

              <View>
                <Text style={styles.dropdownLabel}>*Trade Type:</Text>
                <Picker
                  selectedValue={trade}
                  onValueChange={trade => this.setState({ trade })}
                  mode="dropdown"
                >
                  {this.renderTradeTypes()}
                </Picker>
              </View>

              <View>
                {trade === 'other' ? (
                  <View
                    style={[
                      styles.inputContainer,
                      otherTrade.error && styles.error
                    ]}
                  >
                    <TextInput
                      style={styles.input}
                      placeholder="*Trade Type"
                      placeholderTextColor={greyColor}
                      value={otherTrade.value}
                      onChangeText={val => this.handleChange('otherTrade', val)}
                    />
                    <Text style={styles.errorText}>
                      {otherTrade.error || ''}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text style={styles.dropdownLabel}>Sub-Trade Type:</Text>
                    <Picker
                      selectedValue={subTrade}
                      onValueChange={subTrade => this.setState({ subTrade })}
                      mode="dropdown"
                    >
                      {this.renderTradeSubTypes()}
                    </Picker>
                  </View>
                )}
              </View>

              <View
                style={[styles.inputContainer, market.error && styles.error]}
              >
                <TextInput
                  style={styles.input}
                  placeholder="*Cluster Market"
                  placeholderTextColor={greyColor}
                  value={market.value}
                  onChangeText={val => this.handleChange('market', val)}
                />
                <Text style={styles.errorText}>{market.error || ''}</Text>
              </View>

              <View
                style={[styles.inputContainer, grantCode.error && styles.error]}
              >
                <TextInput
                  style={styles.input}
                  placeholder="*Grant Code"
                  placeholderTextColor={greyColor}
                  value={grantCode.value}
                  onChangeText={val => this.handleChange('grantCode', val)}
                />
                <Text style={styles.errorText}>{grantCode.error || ''}</Text>
              </View>

              <View
                style={[
                  styles.inputContainer,
                  acctNumber.error && styles.error
                ]}
              >
                <TextInput
                  style={styles.input}
                  placeholder=" Acct Number"
                  placeholderTextColor={greyColor}
                  value={acctNumber.value}
                  onChangeText={val => this.handleChange('acctNumber', val)}
                />
                <Text style={styles.errorText}>{acctNumber.error || ''}</Text>
              </View>

              <View style={[styles.inputContainer, bvn.error && styles.error]}>
                <TextInput
                  style={styles.input}
                  placeholder=" BVN"
                  placeholderTextColor={greyColor}
                  value={bvn}
                  onChangeText={val => this.handleChange('bvn', val)}
                />
                <Text style={styles.errorText}>{bvn.error || ''}</Text>
              </View>

              <View
                style={[styles.pickImage, tradeImage.error && styles.error]}
              >
                <Text style={styles.dropdownLabel}>
                  *Face of trade:{' '}
                  {tradeImage.value && (
                    <Image
                      source={{ uri: tradeImage.value }}
                      style={{ width: 100, height: 100 }}
                    />
                  )}
                </Text>
                <TouchableOpacity
                  onPress={() => this.handlePickImage('tradeImage')}
                  activeOpacity={0.5}
                >
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>
                      {tradeImage.value ? 'Change' : 'Select'} Picture
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={[
                  styles.pickImage,
                  beneficiaryImage.error && styles.error
                ]}
              >
                <Text style={styles.dropdownLabel}>
                  *Face of beneficiary:{' '}
                  {beneficiaryImage.value && (
                    <Image
                      source={{ uri: beneficiaryImage.value }}
                      style={{ width: 100, height: 100 }}
                    />
                  )}
                </Text>
                <TouchableOpacity
                  onPress={() => this.handlePickImage('beneficiaryImage')}
                  activeOpacity={0.5}
                >
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>
                      {beneficiaryImage.value ? 'Change' : 'Select'} Picture
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.footerContainer}>
              <TouchableOpacity
                onPress={this.handleSave}
                disabled={disableSaveButton}
              >
                <View
                  style={[
                    styles.saveButton,
                    {
                      backgroundColor: saveButtonBackgroundColor,
                      color: saveButtonColor
                    }
                  ]}
                >
                  <Text
                    style={[styles.saveButtonFont, { color: saveButtonColor }]}
                  >
                    {saving ? 'Saving...' : saveButtonText}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  bg: {
    paddingTop: 20,
    width: null,
    height: null
  },
  headerContainer: {
    flex: 1,
    marginTop: 10
  },
  inputsContainer: {
    margin: 20
  },
  footerContainer: {
    flex: 1,
    margin: 20
  },
  headerTitleView: {
    backgroundColor: 'transparent',
    marginTop: 20,
    marginLeft: 20
  },
  titleViewText: {
    fontSize: 40
  },
  inputs: {
    paddingVertical: 20
  },
  inputContainer: {
    borderWidth: 1,
    borderBottomColor: '#CCC',
    borderColor: 'transparent',
    flexDirection: 'row',
    height: 50,
    marginBottom: 20
  },
  iconContainer: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    fontSize: 16
  },
  saveButton: {
    paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15
  },
  greyFont: {
    color: '#D8D8D8'
  },
  saveButtonFont: {
    fontSize: 18
  },
  dropdownLabel: {
    marginTop: 10,
    fontSize: 18
  },
  button: {
    backgroundColor: 'grey',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#FFF'
  },
  pickImage: {
    flex: 1,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  error: {
    borderBottomColor: 'red'
  },
  errorText: {
    color: 'red',
    marginTop: 17
  }
});
