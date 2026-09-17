import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="otp" />
      <Stack.Screen name="driver-setup" />
      <Stack.Screen name="vehicle-setup" />
      <Stack.Screen name="driver-dashboard" />
      <Stack.Screen name="driver-profile" />
    </Stack>
  );
}
