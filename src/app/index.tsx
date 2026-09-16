import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4A261" />

      {/* Top Yellow Card */}
      <View style={styles.topCard}>
        {/* App Logo & Title Row */}
        <View style={styles.headerRow}>
          <View style={styles.logoIcon}>
            <Text style={{ fontSize: 24 }}>🚌</Text>
          </View>
          <View>
            <Text style={styles.appName}>SafeRide</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>SCHOOL VAN SYSTEM</Text>
            </View>
          </View>
        </View>

        {/* Van Graphic Placeholder */}
        <View style={styles.illustrationContainer}>
          <View style={styles.greenDot} />
          <View style={styles.vanGraphic}>
            <View style={styles.vanWindow} />
          </View>
        </View>

        {/* Main Heading */}
        <Text style={styles.headingText}>
          Your kids,{"\n"}
          <Text style={styles.boldHeading}>tracked{"\n"}</Text>
          <Text style={styles.italicHeading}>every stop.</Text>
        </Text>
      </View>

      {/* Bottom Action Area */}
      <View style={styles.bottomContainer}>
        {/* Parent Button */}
        <TouchableOpacity style={styles.parentButton} activeOpacity={0.8}>
          <Text style={styles.buttonText}>👨‍👩‍👧‍👦 I'm a Parent</Text>
        </TouchableOpacity>

        {/* Driver Button */}
        <TouchableOpacity style={styles.driverButton} activeOpacity={0.8}>
          <Text style={styles.driverButtonText}>🚐 I'm a Driver</Text>
        </TouchableOpacity>

        {/* Footer Text */}
        <Text style={styles.footerText}>
          School-verified • Encrypted • Trusted by 1,200+ families
        </Text>
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
    paddingTop: 40,
    paddingBottom: 40,
    position: "relative",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  logoIcon: {
    width: 52,
    height: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  appName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1A252C",
  },
  badge: {
    backgroundColor: "rgba(0,0,0,0.12)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginTop: 2,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1A252C",
    letterSpacing: 0.8,
  },
  illustrationContainer: {
    marginVertical: 15,
    position: "relative",
  },
  greenDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#2ECC71",
    position: "absolute",
    top: -8,
    left: 70,
    zIndex: 2,
  },
  vanGraphic: {
    width: 90,
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 10,
  },
  vanWindow: {
    width: 20,
    height: 24,
    backgroundColor: "#F39C12",
    borderRadius: 6,
    opacity: 0.4,
  },
  headingText: {
    fontSize: 34,
    color: "#1B2A38",
    lineHeight: 40,
    marginTop: 15,
  },
  boldHeading: {
    fontWeight: "900",
  },
  italicHeading: {
    fontStyle: "italic",
    fontWeight: "400",
    opacity: 0.85,
  },
  bottomContainer: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "flex-end",
    paddingBottom: 30,
  },
  parentButton: {
    backgroundColor: "#F39C12",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#F39C12",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1A252C",
  },
  driverButton: {
    backgroundColor: "#FAF7F2",
    borderWidth: 2,
    borderColor: "#1A252C",
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 25,
  },
  driverButtonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1A252C",
  },
  footerText: {
    fontSize: 12,
    color: "#8E9A9D",
    textAlign: "center",
    fontWeight: "500",
  },
});
