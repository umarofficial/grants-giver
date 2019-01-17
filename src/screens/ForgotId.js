import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import background from '../../assets/images/signup/signup_bg.png';
import backIcon from '../../assets/images/signup/back.png';

const backButton = () => (
  <View style={styles.headerIconView}>
    <Image
      source={backIcon}
      style={styles.backButtonIcon}
      resizeMode="contain"
    />
  </View>
);

export default class ForgotId extends Component {
  static navigationOptions = {
    headerTransparent: true,
    headerBackImage: backButton
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={background}
          style={[styles.container, styles.bg]}
          resizeMode="cover"
        >
          <View style={styles.headerContainer}>
            <View style={styles.headerTitleView}>
              <Text style={styles.titleViewText}>Forgot ID</Text>
            </View>
          </View>

          <View style={styles.inputsContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="ios-mail"
                  size={32}
                  color={'rgba(255, 255, 255, 0.5)'}
                />
              </View>
              <TextInput
                style={[styles.input, styles.whiteFont]}
                placeholder="Email"
                placeholderTextColor="#FFF"
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="ios-call"
                  size={32}
                  color={'rgba(255, 255, 255, 0.5)'}
                />
              </View>
              <TextInput
                style={[styles.input, styles.whiteFont]}
                placeholder="Phone"
                placeholderTextColor="#FFF"
              />
            </View>
          </View>

          <View style={styles.footerContainer}>
            <TouchableOpacity>
              <View style={styles.signup}>
                <Text style={styles.whiteFont}>Resend agent ID</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}
            >
              <View style={styles.signin}>
                <Text style={styles.greyFont}>
                  Remember agent ID?
                  <Text style={styles.whiteFont}> Sign In</Text>
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bg: {
    paddingTop: 20,
    width: null,
    height: null
  },
  headerContainer: {
    flex: 1,
    marginTop: 80
  },
  inputsContainer: {
    margin: 20
  },
  footerContainer: {
    flex: 1,
    margin: 20
  },
  headerIconView: {
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 20,
    backgroundColor: 'transparent'
  },
  headerBackButtonView: {
    width: 25,
    height: 25
  },
  backButtonIcon: {
    width: 25,
    height: 25
  },
  headerTitleView: {
    backgroundColor: 'transparent',
    marginTop: 20,
    marginLeft: 20
  },
  titleViewText: {
    fontSize: 40,
    color: '#fff'
  },
  inputs: {
    paddingVertical: 20
  },
  inputContainer: {
    borderWidth: 1,
    borderBottomColor: '#CCC',
    borderColor: 'transparent',
    flexDirection: 'row',
    height: 60
  },
  iconContainer: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputIcon: {
    width: 30,
    height: 30
  },
  input: {
    flex: 1,
    fontSize: 16
  },
  signup: {
    backgroundColor: '#FF3366',
    paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15
  },
  signin: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  greyFont: {
    color: '#D8D8D8'
  },
  whiteFont: {
    color: '#FFF'
  }
});
