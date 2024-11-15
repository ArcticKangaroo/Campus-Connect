import { AuthProvider } from "../contexts/AuthContext";
import { Provider as PaperProvider } from "react-native-paper";
import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const lightTheme = {
  colors: {
    primary: "rgb(16, 109, 32)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(157, 248, 152)",
    onPrimaryContainer: "rgb(0, 34, 4)",
    secondary: "rgb(56, 107, 1)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(183, 244, 129)",
    onSecondaryContainer: "rgb(13, 32, 0)",
    tertiary: "rgb(0, 107, 94)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(118, 248, 226)",
    onTertiaryContainer: "rgb(0, 32, 27)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(252, 253, 246)",
    onBackground: "rgb(26, 28, 25)",
    surface: "rgb(252, 253, 246)",
    onSurface: "rgb(26, 28, 25)",
    surfaceVariant: "rgb(222, 229, 216)",
    onSurfaceVariant: "rgb(66, 73, 64)",
    outline: "rgb(114, 121, 111)",
    outlineVariant: "rgb(194, 201, 189)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(47, 49, 45)",
    inverseOnSurface: "rgb(240, 241, 235)",
    inversePrimary: "rgb(130, 219, 126)",
    elevation: {
      level0: "transparent",
      level1: "rgb(240, 246, 235)",
      level2: "rgb(233, 242, 229)",
      level3: "rgb(226, 237, 223)",
      level4: "rgb(224, 236, 220)",
      level5: "rgb(219, 233, 216)"
    },
    surfaceDisabled: "rgba(26, 28, 25, 0.12)",
    onSurfaceDisabled: "rgba(26, 28, 25, 0.38)",
    backdrop: "rgba(44, 50, 42, 0.4)"
  }
};

const darkTheme = {
  colors: {
    primary: "rgb(130, 219, 126)",
    onPrimary: "rgb(0, 57, 10)",
    primaryContainer: "rgb(0, 83, 18)",
    onPrimaryContainer: "rgb(157, 248, 152)",
    secondary: "rgb(156, 215, 105)",
    onSecondary: "rgb(26, 55, 0)",
    secondaryContainer: "rgb(40, 80, 0)",
    onSecondaryContainer: "rgb(183, 244, 129)",
    tertiary: "rgb(85, 219, 198)",
    onTertiary: "rgb(0, 55, 48)",
    tertiaryContainer: "rgb(0, 80, 71)",
    onTertiaryContainer: "rgb(118, 248, 226)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(26, 28, 25)",
    onBackground: "rgb(226, 227, 221)",
    surface: "rgb(26, 28, 25)",
    onSurface: "rgb(226, 227, 221)",
    surfaceVariant: "rgb(66, 73, 64)",
    onSurfaceVariant: "rgb(194, 201, 189)",
    outline: "rgb(140, 147, 136)",
    outlineVariant: "rgb(66, 73, 64)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(226, 227, 221)",
    inverseOnSurface: "rgb(47, 49, 45)",
    inversePrimary: "rgb(16, 109, 32)",
    elevation: {
      level0: "transparent",
      level1: "rgb(31, 38, 30)",
      level2: "rgb(34, 43, 33)",
      level3: "rgb(37, 49, 36)",
      level4: "rgb(39, 51, 37)",
      level5: "rgb(41, 55, 39)"
    },
    surfaceDisabled: "rgba(226, 227, 221, 0.12)",
    onSurfaceDisabled: "rgba(226, 227, 221, 0.38)",
    backdrop: "rgba(44, 50, 42, 0.4)"
  }
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <PaperProvider theme={lightTheme}>
        <SafeAreaProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaProvider>
      </PaperProvider>
    </AuthProvider>
  );
}