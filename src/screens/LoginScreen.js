import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import Toast from 'react-native-easy-toast';
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';
import Spinner from '../components/common/Spinner';
import background from '../../assets/images/signup/signup_bg.png';
import mark from '../../assets/images/icon.png';
import lockIcon from '../../assets/images/login/login1_lock.png';

const { width, height } = Dimensions.get('window');
const emailHost = 'gmail.com';

export default class LoginScreen extends Component {
  static navigationOptions = {
    headerTransparent: true
  };

  state = { hideId: true, id: '', loading: null };

  onLogin = () => {
    Keyboard.dismiss();

    if (!this.props.screenProps.connected) {
      this.refs.toast.show('No Internet Connection', 1000);
      return;
    }

    if (!this.state.id) {
      this.refs.toast.show('Enter your agent ID', 1000);
      return;
    }

    this.setState({ loading: true });
    const { id } = this.state;
    const email = `${id}@${emailHost}`;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, id)
      .then(user => this.onLoginSuccess(user))
      .catch(this.onLoginFail);
  };

  onLoginFail = () => {
    this.refs.toast.show('Incorrect agent ID', 1000);
    this.setState({ error: 'Authentication Failed', loading: false });
  };

  onLoginSuccess = user => {
    this.setState({ id: '', loading: false });
    this.props.navigation.navigate('Main');
  };

  handleId = id => this.setState({ id });

  toggleId = () => this.setState(({ hideId }) => ({ hideId: !hideId }));

  render() {
    const { hideId, loading, id } = this.state;
    return (
      <View>
        <ImageBackground
          source={background}
          style={styles.background}
          resizeMode="cover"
        >
          <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            enabled
          >
            <View style={styles.markWrap}>
              <Image source={mark} style={styles.mark} resizeMode="contain" />
            </View>
            <View style={styles.wrapper}>
              <View style={styles.inputWrap}>
                <View style={styles.iconWrap}>
                  <Image
                    source={lockIcon}
                    style={styles.icon}
                    resizeMode="contain"
                  />
                </View>
                <TextInput
                  placeholderTextColor="#FFF"
                  placeholder="Agent ID"
                  value={id}
                  style={styles.input}
                  secureTextEntry={hideId}
                  onChangeText={this.handleId}
                />
                <TouchableOpacity onPress={this.toggleId}>
                  <Ionicons
                    name={hideId ? 'ios-eye-off' : 'ios-eye'}
                    size={27}
                    style={styles.showHideId}
                    color={'rgba(255, 255, 255, 0.5)'}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => this.props.navigation.navigate('ForgotId')}
              >
                <View>
                  <Text style={styles.forgotPasswordText}>
                    Forgot agent ID?
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={this.onLogin}
                disabled={loading}
              >
                <View style={styles.button}>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <Text style={styles.buttonText}>Sign In</Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.container}>
              <View style={styles.signupWrap}>
                <Text style={styles.accountText}>
                  By signing in, you agree with
                </Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() =>
                    Alert.alert(
                      'Terms of Service',
                      'This is our terms and conditions...',
                      [{ text: 'Cancel' }, { text: 'Agree' }]
                    )
                  }
                >
                  <View>
                    <Text style={styles.signupLinkText}>our ToS</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <Toast ref="toast" opacity={0.6} />
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  markWrap: {
    flex: 1,
    paddingVertical: 30,
    marginTop: 50
  },
  mark: {
    width: null,
    height: null,
    flex: 1
  },
  background: {
    width,
    height
  },
  wrapper: {
    paddingVertical: 50,
    margin: 20
  },
  inputWrap: {
    flexDirection: 'row',
    marginVertical: 10,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC'
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    height: 20,
    width: 20
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: '#FFF',
    fontSize: 16,
    marginTop: 5
  },
  button: {
    backgroundColor: '#FF3366',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18
  },
  forgotPasswordText: {
    color: '#D8D8D8',
    backgroundColor: 'transparent',
    textAlign: 'right',
    paddingRight: 15
  },
  signupWrap: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  accountText: {
    color: '#D8D8D8'
  },
  signupLinkText: {
    color: '#FFF',
    marginLeft: 5
  },
  showHideId: {
    marginTop: 15,
    marginRight: 10
  }
});
