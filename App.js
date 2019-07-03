import React, { Component } from 'react';
import {
  Platform,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  StackActions,
  NavigationActions,
} from 'react-navigation';
// import {
//   Header,
// } from 'react-component';
// import 
//   HHeader
//  rom './HHeader.js'

type props = {};

class loginform extends React.Component {
  constructor(props) {
    super(props);
    this.state = { password: '', email: '' };
  }
  async checkUser(data) {
    try {
      let response = await fetch('http://172.17.75.121:3000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
    
      <View style={styles.container}>
        <Text style={styles.header}>Login</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Your email"
          underlineColorAndroid={'transparent'}
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          style={styles.textinput}
          placeholder="Your Password"
          secureTextEntry={true}
          underlineColorAndroid={'transparent'}
          onChangeText={password => this.setState({ password })}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            try {
              let isadmin = await this.checkUser(this.state);
              if (isadmin.val == 'admin') {
                this.props.navigation.navigate('admin');
              } else if (isadmin.val == 'user') {
                alert('Successfully Logged In');
                this.props.navigation.navigate('login');
              } else if (isadmin.val == 'nouser') {
                alert('Login failed');
                this.props.navigation.navigate('login');
              }
            } catch (err) {
              console.log(err);
            }
          }}>
          <Text style={styles.btntext}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate('signup');
          }}>
          <Text style={styles.btntext}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      // </View>
    );
  }
}
class adminpage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Admin</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
           this.props.navigation.navigate('viewprojectrequest');
                }}
        >
          <Text style={styles.btntext}>Project Upload Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate('viewmoneyrequest');
          }}
        >
          <Text style={styles.btntext}>Money Pull Requests</Text>
        </TouchableOpacity>
      </View>
    );
  }
}



class viewprojectrequestpage extends React.Component {
  constructor(props) {
    super(props);
    const takeData = async () => {
            try {
              let projectdata = await this.uploadProjectRequest();
              }catch (err) {
              console.log(err);
            }
       };
  }
  async uploadProjectRequest() {
    try {
      let response = await fetch('http://172.17.75.121:3000/adminProjectRequest', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Project Upload Requests</Text>
        <Text>Display Project Reuests Here  </Text>
   </View>
    );
  }
}


class viewmoneyrequestpage extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Money Pull Requests</Text>
      </View>
    );
  }
}


class signupform extends React.Component {
  constructor(props) {
    super(props);
    this.state = { phoneno: '', password: '', email: '' };
  }
  async newUser(data) {
    try {
      let response = await fetch('http://172.17.75.121:3000/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Sign Up</Text>

        <TextInput
          style={styles.textinput}
          placeholder="Your Phone No."
          underlineColorAndroid={'transparent'}
          onChangeText={phoneno => this.setState({ phoneno })}
        />
        <TextInput
          style={styles.textinput}
          placeholder="Your email"
          underlineColorAndroid={'transparent'}
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          style={styles.textinput}
          placeholder="Your Password"
          secureTextEntry={true}
          underlineColorAndroid={'transparent'}
          onChangeText={password => this.setState({ password })}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            try {
              let status = await this.newUser(this.state);
              if (status.val == 'emailsent') {
                alert('A link has been sent to your mail please verify');
                this.props.navigation.navigate('login');
              } else if (status.val == 'alreadyemail') {
                alert('Email already exists.');
              } else if (status.val == 'dataincomplete') {
                alert('Please fill all fields correct.');
              } 
            } catch (err) {
              console.log(err);
            }
          }}>
          <Text style={styles.btntext}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#36485f',
    paddingLeft: 60,
    paddingRight: 60,
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#59cbbd',
    marginTop: 30,
  },
  btntext: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    color: '#fff',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
  },
  textinput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1,
  },
});

const AppNavigator = createStackNavigator(
  {
    login: {
      screen: loginform,
    },
    signup: {
      screen: signupform,
    },
    admin: {
      screen: adminpage,
    },
     viewmoneyrequest: {
      screen: viewmoneyrequestpage,
    },
    viewprojectrequest: {
      screen: viewprojectrequestpage,
    },
  },

  {
    initialRouteName: 'login',
  }
);
export default createAppContainer(AppNavigator);
