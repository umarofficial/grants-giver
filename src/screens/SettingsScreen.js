import React from 'react';
import {
  Platform,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import firebase from 'firebase';
import TabBarIcon from '../components/TabBarIcon';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings'
  };

  handleSignout = () => {
    Alert.alert('Sign Out', 'Do you want to proceed signing out?', [
      {
        text: 'Cancel'
      },
      {
        text: 'Yes',
        onPress: () => this.signOut()
      }
    ]);
  };

  signOut = () => {
    const { navigate } = this.props.navigation;
    firebase.auth().signOut();
    navigate('Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={[styles.profileContainer, styles.space]}>
          <View>
            <TabBarIcon
              focused
              iconSize={50}
              name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
            />
          </View>
          <Text style={styles.text}>My Profile</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <View style={[styles.signoutContainer, styles.space]}>
          <TouchableOpacity
            onPress={this.handleSignout}
            style={[styles.icon, styles.space]}
          >
            <TabBarIcon
              focused
              name={Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out'}
            />
            <Text style={styles.text}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  profileContainer: {
    backgroundColor: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  signoutContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  icon: {
    flexDirection: 'row'
  },
  text: {
    fontSize: 20,
    marginLeft: 10
  },
  space: {
    margin: 10
  },
  line: {
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: '#f3f3f3',
    borderBottomWidth: 1
  }
});
