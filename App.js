import * as React from 'react';
import {
  View,
  Alert,
  TextInput,
  Text,
  Button,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import store from './store'
import HomeScreen from './screens/homeScreen'
import axios from "axios";
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';

const AuthContext = React.createContext();

const Tabs = createBottomTabNavigator();

const createFirstAlert = () =>
    Alert.alert(
    "Ingreso invalido",
    "Por favor corrija sus datos de ingreso",
    [
        { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: false }
    );


function SplashScreen() {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text style={{ fontSize: 20 }}>Cargando...</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default () => {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'AUTH_TOKEN':
          return {
            ...prevState,
            authToken: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            authToken: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      authToken: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let token;
      console.log(state.authToken)
      console.log("trying to recover token")
      token = await AsyncStorage.getItem('userToken');
      axios.post("http://177.71.157.129:4000/tokenAuth", {token})
          .then(res => {
            if (res.status === 200){
              console.log("status is 200")
              dispatch({ type: 'AUTH_TOKEN', token: token });
              dispatch({ type: 'RESTORE_TOKEN', token: token });
              console.log(state.authToken,state.isLoading)
            }
          })
          .catch( err => {
            console.log(err)
            dispatch({ type: 'RESTORE_TOKEN', token: token });
          })


      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
    };

    bootstrapAsync();
  }, [state.userToken]);

  SignInScreen = () => {
    const [usuario, setUsername] = React.useState('');
    const [contraseña, setPassword] = React.useState('');
  
    const { signIn } = React.useContext(AuthContext);
  
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: 'center'}}>
        <Icon name={'users'} color={'#4169e1'} style={styles.iconPrimary} />

        <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center'}}>
          <Icon name={'user'} color={'black'} style={styles.iconLogin} />
          <TextInput
            placeholder="Usuario"
            value={usuario}
            onChangeText={setUsername}
            style={styles.textLogin}
          />
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center'}}>
          <Icon name={'key'} color={'black'} style={styles.iconLogin} />
          <TextInput
            placeholder="Contraseña"
            value={contraseña}
            onChangeText={setPassword}
            style={styles.textLogin}
            secureTextEntry
          />
        </View>
        <Button title="Ingresar" onPress={() => signIn({ usuario, contraseña })} />
      </View>
    );
  }

  const axioser = (usuario, contraseña) => {
    console.log("hi im in axios")
    axios
          .post("http://177.71.157.129:4000/client_auth", {usuario, contraseña})
          .then(response => {
            console.log(response.data)
            var token = response.data 
            axios.post("http://177.71.157.129:4000/tokenAuth", {token})
            .then(res => {
              if (res.status === 200){
                console.log("status is 200")
                AsyncStorage.setItem('userToken', token)
                dispatch({ type: 'SIGN_IN', token: token });
              }
            })
          })
          .catch(error => {
            console.log(error, "im in catch")
            return createFirstAlert()
          })
  }

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        console.log("im singing in")
        var { usuario, contraseña } = data
        console.log(data, usuario, contraseña, "but i cant HEAR YOU!!")
        axioser(usuario, contraseña)
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
    }),
    []
  );

  return (
    <Provider store={store}>
      <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {/* <CompraStack.Navigator>
          <CompraStack.Screen name="Compra" component={Ingreso} />
          <CompraStack.Screen
            name="BarcodeReader"
            component={CompraScan}
          />
        </CompraStack.Navigator> */}
        <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home1') {
              iconName = 'cart-plus' ;
            } else if (route.name === 'Home2') {
              iconName = 'align-center';
            } else if (route.name === 'SignIn') {
              iconName = 'users';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#000080',
          inactiveTintColor: 'gray',
        }}
        >{state.isLoading ? (
          // We haven't finished checking for the token yet
          <Stack.Screen name="Splash" component={SplashScreen}/>
        ) : state.authToken ? (
          // No token found, user isn't signed in
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              title: 'Ingreso',
              headerStyle: {
                backgroundColor: '#4169e1',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontSize: 23,
                textAlign: 'center',
              },
          // When logging out, a pop animation feels intuitive
              animationTypeForReplace: state.isSignout ? 'pop' : 'push',
            }}
          />
        ) : (
          <>
            <Tabs.Screen name="Home1" component={HomeScreen} initialParams={{ token: state.userToken }}/>
            <Tabs.Screen name="Home2" component={HomeScreen} initialParams={{ token: state.userToken }}/>
          </>
        )}
        </Tabs.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  textLogin: {
    width:200,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderTopWidth:1,
    borderRightWidth:1,
    borderBottomWidth: 1,
    borderColor: '#D3D3D3'
  },
  iconLogin: {
    padding: 22,
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#D3D3D3'
  },
  iconPrimary: {
    fontSize: 100,
    marginBottom: 20,
  },
})
