import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SecureStore from 'expo-secure-store';
import AuthContext from '../Screens/helpers/AuthContext';
import { AntDesign } from '@expo/vector-icons';
import {theme} from '../constants/theme';

import Home from '../Screens/HomeScreen';
import SignUp from '../Screens/auth/SignUpScreen';
import LogIn from '../Screens/auth/SignInScreen';
import OnBoarding from '../Screens/OnboardingScreens';
import ForgotPassword from '../Screens/auth/ForgotPassword';
import MyProfile from '../Screens/MyProfie/MyProfileScreen';
import WelcomeScreen from '../Screens/WelcomeScreen';
import EditProfile from '../Screens/MyProfie/EditProfileScreen';
import ChangePassword from '../Screens/MyProfie/ChangePasswordScreen';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();


function TabsNavigator() {
  return (
      <Tab.Navigator 
      screenOptions={
        {
          headerShown:false,
          tabBarStyle:  { height: 60,paddingBottom:15,backgroundColor:'#fff'},
          tabBarActiveTintColor: theme.colors.bottomtabActiveColor,
          tabBarInactiveTintColor: theme.colors.bottomTabColor,
           
        } 
      }
      >
            <Tab.Screen name="Home"  component={Home}  options={{ headerShown: false,
               tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color}   /> }}/>
               
               <Tab.Screen name="Search"  component={MyProfile}  options={{ title:'Search',
              tabBarIcon: ({ color }) => <TabBarIcon name="search1" color={color} />  }} />

            <Tab.Screen name="Add"  component={MyProfile}  options={{ title:'Add',
              tabBarIcon: ({ color }) => <TabBarIcon name="pluscircleo" color={color} />  }} />
              <Tab.Screen name="Explore"  component={MyProfile}  options={{ title:'Explore',
              tabBarIcon: ({ color }) => <TabBarIcon name="retweet" color={color} />  }} />

            <Tab.Screen name="MyProfileScreen"  component={MyProfile}  options={{ title:'My Profile',
              tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />  }} /> 
        </Tab.Navigator>

  );
}

export default function Navigation() {

  const [User_visit, SetUser_visit] = React.useState(null);


  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
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
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {

      
  async function usrvisit() {
    let result = await SecureStore.getItemAsync('User_visit');
    SetUser_visit(result);
    console.log(result);
  }
  usrvisit();

    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await SecureStore.getItemAsync('userToken');
       
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
      let token = data.data.data.token;
      let UserID = data.data.data.id;

    
        SecureStore.setItemAsync('userID', UserID );
       SecureStore.setItemAsync('userToken', token );
       
        dispatch({ type: 'SIGN_IN', token: token });
      },
      signOut: () => { 
        SecureStore.deleteItemAsync('userToken');
        SecureStore.deleteItemAsync('userID');
        dispatch({ type: 'SIGN_OUT' });
    
    },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
       
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );
// console.log(User_visit);
  return (
    <NavigationContainer>
        <AuthContext.Provider value={authContext}>
          <Stack.Navigator>
          <>
          {state.userToken == null ? (
          <>
          {User_visit === null ? (
          <Stack.Screen name="Root"  component={OnBoarding}  options={{ headerShown: false }}  />
        ) : (
          <Stack.Screen name="Root"  component={WelcomeScreen}  options={{ headerShown: false }}  />

        )}
         <Stack.Screen name="WelcomeScreen"  component={WelcomeScreen}  options={{ headerShown: false }}  />
          <Stack.Screen name="LogIn"  component={LogIn}  options={{ headerShown: false }}  />
          <Stack.Screen name="SignUp"  component={SignUp}  options={{ headerShown: false }}  />
          <Stack.Screen name="ForgotPassword"  component={ForgotPassword}  options={{ headerShown: false }}  />
          
          </>
  ) : (
    <>
          <Stack.Screen name="Root" component={TabsNavigator} options={{headerShown:false}} />
          <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown:true, title:'Edit Profile'}} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} options={{headerShown:true, title:'Change Password'}} />
          
          
          </>
        )}
        </>
        </Stack.Navigator>
    </AuthContext.Provider>
    </NavigationContainer>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof AntDesign>['name'];
  color: '#000';
}) {
  return <AntDesign size={20} style={{ marginBottom: -3 }} {...props} />;
}