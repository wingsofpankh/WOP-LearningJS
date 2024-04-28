import {R} from '@root/res';
import {U} from '@root/utility';
import React from 'react';
import {Image, Platform} from 'react-native';
import {createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import {S} from '../screens';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const AuthStack = createStackNavigator(
  {
    Introduction: {screen: S.Auth.Introduction},
    Login: {screen: S.Auth.Login},
    SignUp: {screen: S.Auth.SignUp},
    ForgotPin: {screen: S.Auth.ForgotPin},
    FingerprintPin: {screen: S.Auth.FingerprintPin},
    WebBrowser: {screen: S.Auth.WebBrowser},
    CancelScreen: {screen: S.Auth.CancelScreen},
    CounterScreen: {screen: S.Auth.CounterScreen},
    SingpassLogin: {screen: S.Auth.SingpassLogin},
    // AuthScreen: { screen: S.Auth.AuthScreen }
  },
  {
    headerMode: 'none',
    initialRouteName: 'Introduction',
  },
);

const AppStack = createBottomTabNavigator(
  {
    Home: {
      screen: S.App.Home.HomeDashBoard,

      navigationOptions: {
        title: 'Home',
        tabBarOptions: {
          showLabel: true,
          activeTintColor: R.colors.themeColor.primaryColor,
          inactiveTintColor: R.colors.themeColor.secondaryColor,
        },

        tabBarIcon: ({focused}) => {
          let navImg = focused
            ? R.images.bottomTab.homeSelected
            : R.images.bottomTab.homedisselected;
          return <Image source={navImg} style={{height: 24, width: 24}} />;
        },
      },
    },
    Support: {
      screen: S.App.Support.SupportScreen,

      navigationOptions: {
        title: 'Support',
        tabBarOptions: {
          showLabel: true,
          activeTintColor: R.colors.themeColor.primaryColor,
          inactiveTintColor: R.colors.themeColor.secondaryColor,
        },

        tabBarIcon: ({focused}) => {
          let navImg = focused
            ? R.images.bottomTab.supportselected
            : R.images.bottomTab.supportDisselected;
          return <Image source={navImg} style={{height: 24, width: 24}} />;
        },
      },
    },
    Account: {
      screen: S.App.Account.UserAccount,

      navigationOptions: {
        title: 'Profile',
        tabBarOptions: {
          showLabel: true,
          activeTintColor: R.colors.themeColor.primaryColor,
          inactiveTintColor: R.colors.themeColor.secondaryColor,
        },

        tabBarIcon: ({focused, tintColor}) => {
          let navImg = focused
            ? R.images.bottomTab.profileselected
            : R.images.bottomTab.profiledisselected;
          return <Image source={navImg} style={{height: 24, width: 24}} />;
        },
      },
    },
  },

  {
    initialRouteName: 'Home',
    index: '0',
    activeColor: R.colors.themeColor.primaryColor,
    inactiveColor: R.colors.themeColor.primaryColor,
    barStyle: {backgroundColor: '#ffffff'},
    labeled: true,
  },
);
// const MainAppStackNavigator = createStackNavigator(
//   {
//     AppStack: {screen: AppStack}
//   }
// )
const TopTabNavigator = createMaterialTopTabNavigator(
  {
    FAQ: {
      screen: S.App.Support.FAQ,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-home'} />
          </View>
        ),
        initialRouteName: 'FAQ',
        activeColor: '#C71585',
        inactiveColor: '#226557',
        barStyle: {backgroundColor: '#FFC0CB'},
      },
    },
    Contact: {
      screen: S.App.Support.Contact,
      navigationOptions: {
        tabBarLabel: 'Contact',
        activeColor: '#4B0082',
        inactiveColor: '#226557',
        barStyle: {backgroundColor: '#B0C4DE'},
      },
    },
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      pressColor: R.colors.blue,
      style: {
        backgroundColor: R.colors.white,
      },
      indicatorStyle: {
        backgroundColor: R.colors.blue,
      },
      activeTintColor: R.colors.blue,
      inactiveTintColor: R.colors.darkGrey,
      showLabel: false,
      showIcon: true,
    },
  },
);
// const MyTabNavigator = createMaterialTopTabNavigator({
//   FAQ:  {screen: S.App.Support.SupportScreen },
//   Contact:  {screen: S.App.Support.Contact},
// });
// const Tab = createMaterialTopTabNavigator();
// const SupportTabs = () => {
//   return (
//     <Tab.Navigator initialRouteName="FAQ">
//       <Tab.Screen name="FAQ" component={S.App.Support.FAQ} />
//       <Tab.Screen name="Contact" component={S.App.Support.Contact} />
//     </Tab.Navigator>
//   );
// }
// const SupportStack = createStackNavigator({
//   SupportTab:SupportTabs
// })
const MainAppStackNavigator = createStackNavigator(
  {
    AppStack: {screen: AppStack},
    GetLoan: {screen: S.App.Home.GetLoan},
    MyInfo: {screen: S.App.Home.MyInfo},
    ApplicationForm: {screen: S.App.Home.ApplicationForm},
    ApplyLoan: {screen: S.App.Home.ApplyLoan},
    ApplyLoanStepOne: {screen: S.App.Home.ApplyLoanStepOne},
    MyLoan: {screen: S.App.Home.MyLoan},
    Chat: {screen: S.App.Home.Chat},
    BlogSpotCardsList: {screen: S.App.Home.BlogSpotCardsList},
    TransactionHistory: {screen: S.App.Home.TransactionHistory},
    Payment: {screen: S.App.Home.Payment},
    PaymentDetails: {screen: S.App.Home.PaymentDetails},
    LoanStatus: {screen: S.App.Home.LoanStatus},
    PersonalInfo: {screen: S.App.Home.Forms.PersonalInfo},
    BusinessLoanForm: {screen: S.App.Home.Forms.BusinessLoanForm},
    PurposeLoan: {screen: S.App.Home.Forms.PurposeLoan},
    Financial: {screen: S.App.Home.Forms.Financial},
    EmployeeInfo: {screen: S.App.Home.Forms.EmployeeInfo},
    Requirements: {screen: S.App.Home.Forms.Requirements},
    Declaration: {screen: S.App.Home.Forms.Declaration},
    Notification: {screen: S.App.Home.Notification},
    SupportScreen: {screen: S.App.Support.SupportScreen},
    FAQ: {screen: S.App.Support.FAQ},
    Contact: {screen: S.App.Support.Contact},
    About: {screen: S.App.Account.About},
    EditAccount: {screen: S.App.Account.EditAccount},
    Settings: {screen: S.App.Account.Settings},
    WebBrowser: {screen: S.Auth.WebBrowser},
    ResetPin: {screen: S.App.Account.ResetPin},
    ResetPassword: {screen: S.App.Account.ResetPassword},
    ConfirmResetPassword: {screen: S.App.Account.ConfirmResetPassword},
    ConfirmResetPin: {screen: S.App.Account.ConfirmResetPin},
    ChangeMobileNo: {screen: S.App.Account.ChangeMobileNo},
    SupportThanks: {screen: S.App.Support.SupportThanks},
    SupportMain: {screen: S.App.Support.SupportScreen},
    BlogSpot: {screen: S.App.Home.BlogSpot},
    StaticNullScreen: {screen: S.App.Home.StaticNullScreen},
    PersonalMyinfo: {screen: S.App.Home.Forms.PersonalMyinfo},
    ContactDetails: {screen: S.App.Home.Forms.ContactDetails},
    EducationProperty: {screen: S.App.Home.Forms.EducationProperty},
    NoticeAssessment: {screen: S.App.Home.Forms.NoticeAssessment},
    CPFDetails: {screen: S.App.Home.Forms.CPFDetails},
    EmployeeScreen: {screen: S.App.Home.Forms.EmployeeScreen},
    FinancialScreen: {screen: S.App.Home.Forms.FinancialScreen},
    RequirementScreen: {screen: S.App.Home.Forms.RequirementScreen},
    ViewmoreScreen: {screen: S.App.Home.Forms.ViewmoreScreen},
    SingPassAuth: {screen: S.App.Home.SingPassAuth},
    SuccessPage: {screen: S.App.Home.Forms.SuccessPage},
    EmptyNotification: {screen: S.App.Home.EmptyNotification},
    DeclarationScreen: {screen: S.App.Home.Forms.DeclarationScreen},
    CompanyRepresentativeInfo: {
      screen: S.App.Home.Forms.CompanyRepresentativeInfo,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'AppStack',
  },
);

export const AppNavigator = createSwitchNavigator(
  {
    Splash: S.Auth.Splash,
    Auth: AuthStack,
    App: MainAppStackNavigator,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Splash',
  },
);

const defaultGetStateForActionApp = AppNavigator.router.getStateForAction;
AppNavigator.router.getStateForAction = (action, state) => {
  if (action.type === 'Navigation/NAVIGATE') {
    console.log('Navigation SS', action.type, action, state);
    let screenName = R.globals.screenTagging[action.routeName] ?? '';
    console.log('Screen Name SS', screenName);
    if (screenName.length > 0) {
      trackScreenView(
        screenName + '_' + Platform.OS.toUpperCase(),
        action.routeName,
      );
    }
  }
  return defaultGetStateForActionApp(action, state);
};

async function trackScreenView(screen, routeName) {
  U.utility.logEvent(screen, {routeName: routeName});
}

export default AppNavigator;
