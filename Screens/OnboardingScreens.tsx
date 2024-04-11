import {
    FlatList,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
    ViewToken,
    Image,
    TouchableOpacity
  } from 'react-native';
  import Onboarding from 'react-native-onboarding-swiper';
  export default function OnBoarding({navigation}) {

    const Done = ({...props}) => (
        <TouchableOpacity
        {...props}
        >
        <Text style={{fontSize:16, marginHorizontal:20}}>Done</Text>
        </TouchableOpacity>
    )

    
    return (
        <Onboarding
        onSkip={() => navigation.replace("WelcomeScreen")}
        onDone={() => navigation.replace("WelcomeScreen")}
        DoneButtonComponent={Done}
        pages={[
           
                {
                    backgroundColor: '#a6e4d0',
                    image: <Image source={require('../assets/onboarding-3.png')}style={styles.onboardImage}/>,
                    title: 'Welcome',
                    subtitle: 'Welcome to the first slide of the Onboarding Swiper.',
                },
                {
                    backgroundColor: '#fdeb93',
                    image: <Image source={require('../assets/onboarding-2.png')}style={styles.onboardImage} />,
                    title: 'Explore',
                    subtitle: 'This is the second slide of the Onboarding Swiper.',
                },
                {
                    backgroundColor: '#e9bcbe',
                    image: <Image source={require('../assets/onboarding-1.png')} style={styles.onboardImage}/>,
                    title: 'All Done',
                    subtitle: 'This is the Third slide of the Onboarding Swiper.',
                },
        ]}
    />
    );
  }
  
  const styles = StyleSheet.create({
    onboardImage:{width:250,height:169 }
  });