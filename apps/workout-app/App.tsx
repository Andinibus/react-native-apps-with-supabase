import { SafeAreaView, StyleSheet, View } from 'react-native';

import { useState } from 'react';

import { BottomNav } from './components/BottomNav';
import type { AppRoute } from './components/BottomNav';
import { CommunityScreen } from './screens/CommunityScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { ErnaehrungScreen } from './screens/ErnaehrungScreen';
import { FotoKIScreen } from './screens/FotoKIScreen';
import { HistorieScreen } from './screens/HistorieScreen';
import { KICoachScreen } from './screens/KICoachScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { ProfilScreen } from './screens/ProfilScreen';
import { WorkoutTrackingScreen } from './screens/WorkoutTrackingScreen';

type Route = AppRoute | '/onboarding' | '/workout' | '/historie' | '/community' | '/foto-ki';

const TAB_ROUTES: AppRoute[] = ['/dashboard', '/workout', '/ki-coach', '/ernaehrung', '/profil'];

function isTabRoute(route: string): route is AppRoute {
  return TAB_ROUTES.includes(route as AppRoute);
}

export default function App() {
  const [route, setRoute] = useState<Route>('/onboarding');

  function navigate(next: string) {
    setRoute(next as Route);
  }

  const showBottomNav = isTabRoute(route);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.screen}>
        {route === '/onboarding' && (
          <OnboardingScreen onFinish={() => navigate('/dashboard')} />
        )}
        {route === '/dashboard' && (
          <DashboardScreen onNavigate={navigate} />
        )}
        {route === '/workout' && (
          <WorkoutTrackingScreen onNavigate={navigate} />
        )}
        {route === '/ki-coach' && (
          <KICoachScreen />
        )}
        {route === '/ernaehrung' && (
          <ErnaehrungScreen />
        )}
        {route === '/profil' && (
          <ProfilScreen onNavigate={navigate} />
        )}
        {route === '/historie' && (
          <View style={styles.subScreen}>
            <HistorieScreen />
          </View>
        )}
        {route === '/community' && (
          <View style={styles.subScreen}>
            <CommunityScreen />
          </View>
        )}
        {route === '/foto-ki' && (
          <View style={styles.subScreen}>
            <FotoKIScreen />
          </View>
        )}
      </View>

      {showBottomNav && (
        <BottomNav
          current={route}
          onNavigate={(r) => navigate(r)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#141408'
  },
  screen: {
    flex: 1
  },
  subScreen: {
    flex: 1,
    backgroundColor: '#141408'
  }
});
