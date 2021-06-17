import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from '../screens/App/home';
import Products from '../screens/App/Products/products';
import Portfolio from '../screens/App/Portfolio/portfolio';
import Settings from '../screens/App/Settings/settings';
import PortfolioDetails from '../screens/App/Portfolio/portfolio-details';
import Investment from '../screens/App/Products/Investment/investment';
import Loans from '../screens/App/Products/Loans/loans';
import TrustFund from '../screens/App/Products/Trust/trust-fund';
import InvestmentRequest from '../screens/App/Products/Investment/investment-request';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case 'Home':
      iconName = 'home';
      break;
    case 'Products':
      iconName = 'grid';
      break;
    case 'Portfolio':
      iconName = 'analytics';
      break;
    case 'Settings':
      iconName = 'settings';
      break;
    default:
      break;
  }

  return <Ionicons name={iconName} color={color} size={24} />;
};

const InvestmentStack = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Investment">
      <Stack.Screen name="Investment" component={Investment} />
      <Stack.Screen name="InvestmentRequest" component={InvestmentRequest} />
    </Stack.Navigator>
  );
};

const LoanStack = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Loans">
      <Stack.Screen name="Loans" component={Loans} />
    </Stack.Navigator>
  );
};

const ProductStack = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Products">
      <Stack.Screen name="Products" component={Products} />
    </Stack.Navigator>
  );
};

const SettingsStack = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Settings">
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

const PortfolioStack = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Portfolio">
      <Stack.Screen name="Portfolio" component={Portfolio} />
    </Stack.Navigator>
  );
};

const HomeTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#005E1E',
        inactiveTintColor: '#B5B5B5',
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions(route, color),
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Products" component={ProductStack} />
      <Tab.Screen name="Portfolio" component={PortfolioStack} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeTabs} />
      <Stack.Screen name="PortfolioDetails" component={PortfolioDetails} />
      <Stack.Screen name="Investment" component={InvestmentStack} />
      <Stack.Screen name="Loans" component={LoanStack} />
      <Stack.Screen name="TrustFund" component={TrustFund} />
    </Stack.Navigator>
  );
};

export default AppStack;
