import { Link, useRouter } from "expo-router";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F39C12" />

      {/* Top Yellow Card */}
      <View style={styles.topCard}>
        <View style={styles.appNameContainer}>
          <Text style={styles.appNameText}>🚐 SafeRide</Text>
        </View>
        <Text style={styles.titleText}>School Van Transport & Safety</Text>
        <Text style={styles.subTitleText}>
          Real-time tracking, student attendance, and seamless communication for
          safe journeys.
        </Text>
      </View>

      {/* Center Image / Illustration Placeholder */}
      <View style={styles.imageContainer}>
        <View style={styles.iconCircle}>
          <Text style={{ fontSize: 70 }}>🚌</Text>
        </View>
      </View>

      {/* Bottom Action Buttons */}
      <View style={styles.bottomContainer}>
        {/* Direct Link Component to ensure Expo Router navigation */}
        <Link href="/login" asChild>
          <TouchableOpacity style={styles.driverButton} activeOpacity={0.8}>
            <Text style={styles.driverButtonText}>🚐 I'm a Driver</Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity style={styles.parentButton} activeOpacity={0.8}>
          <Text style={styles.parentButtonText}>👨‍👩‍👧 I'm a Parent</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF7F2",
  },
  topCard: {
    backgroundColor: "#F39C12",
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 30,
    paddingBottom: 40,
  },
  appNameContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 15,
  },
  appNameText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1A252C",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "900",
    color: "#1A252C",
    lineHeight: 36,
    marginBottom: 10,
  },
  subTitleText: {
    fontSize: 14,
    color: "#2C3E50",
    opacity: 0.9,
    lineHeight: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  bottomContainer: {
    paddingHorizontal: 28,
    paddingBottom: 35,
  },
  driverButton: {
    backgroundColor: "#1A252C",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 14,
    elevation: 2,
  },
  driverButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  parentButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#EAEAEA",
  },
  parentButtonText: {
    color: "#1A252C",
    fontSize: 16,
    fontWeight: "bold",
  },
});
