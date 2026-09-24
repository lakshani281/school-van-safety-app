import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SpeedAlertScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF3B30" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Red Header Alert Banner */}
        <View style={styles.alertBanner}>
          <View style={styles.warningIconCircle}>
            <Text style={{ fontSize: 28 }}>⚠️</Text>
          </View>
          <Text style={styles.bannerTitle}>Over-Speed Alert!</Text>
          <Text style={styles.bannerSubtitle}>
            Triggered at 7:12 AM • Van GV-204
          </Text>
        </View>

        {/* Current Speed Card */}
        <View style={styles.speedCard}>
          <Text style={styles.speedCardHeader}>CURRENT SPEED</Text>
          <View style={styles.speedRow}>
            <Text style={styles.speedNumberText}>62</Text>
            <Text style={styles.speedUnitText}>km/h</Text>
          </View>

          {/* Speed Limit Progress Track */}
          <View style={styles.progressTrack}>
            <View style={styles.progressFillOrange} />
            <View style={styles.progressFillRed} />
          </View>

          <Text style={styles.limitInfoText}>
            Limit: 50 km/h •{" "}
            <Text style={styles.overLimitText}>+12 km/h over</Text>
          </Text>
        </View>

        {/* Location Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.locationPinCircle}>
            <Text style={{ fontSize: 20 }}>📍</Text>
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoCardTitle}>Near School Zone</Text>
            <Text style={styles.infoCardSubtitle}>
              Galle Road, Bambalapitiya • 300m from Greenfield
            </Text>
          </View>
        </View>

        {/* Driver Card */}
        <View style={styles.driverCard}>
          <View style={styles.driverAvatarCircle}>
            <Text style={{ fontSize: 24 }}>👮</Text>
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.driverName}>Budi Santoso</Text>
            <Text style={styles.driverSubText}>
              License B1234ABC • Van GV-204
            </Text>
          </View>
          <TouchableOpacity
            style={styles.callDriverBtn}
            activeOpacity={0.8}
          >
            <Text style={{ fontSize: 18 }}>📞</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Action Buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.dismissBtn}
            activeOpacity={0.8}
            onPress={() => router.back()}
          >
            <Text style={styles.dismissBtnText}>Dismiss</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.callSchoolBtn}
            activeOpacity={0.8}
          >
            <Text style={styles.callSchoolBtnText}>📞 Call School</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF7F2",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  alertBanner: {
    backgroundColor: "#FF3B30",
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    alignItems: "center",
  },
  warningIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.85)",
    fontWeight: "600",
  },
  speedCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 22,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EAEAEA",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  speedCardHeader: {
    fontSize: 11,
    fontWeight: "900",
    color: "#7F8C8D",
    letterSpacing: 1,
  },
  speedRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginVertical: 8,
  },
  speedNumberText: {
    fontSize: 58,
    fontWeight: "900",
    color: "#FF3B30",
  },
  speedUnitText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1A252C",
    marginLeft: 6,
  },
  progressTrack: {
    height: 10,
    width: "100%",
    backgroundColor: "#EAEAEA",
    borderRadius: 5,
    flexDirection: "row",
    overflow: "hidden",
    marginTop: 8,
    marginBottom: 12,
  },
  progressFillOrange: {
    width: "70%",
    backgroundColor: "#F39C12",
    height: "100%",
  },
  progressFillRed: {
    width: "18%",
    backgroundColor: "#FF3B30",
    height: "100%",
  },
  limitInfoText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#7F8C8D",
  },
  overLimitText: {
    color: "#FF3B30",
    fontWeight: "900",
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  locationPinCircle: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#FFF8ED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoCardTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1A252C",
  },
  infoCardSubtitle: {
    fontSize: 12,
    color: "#7F8C8D",
    marginTop: 2,
  },
  driverCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  driverAvatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#E8F0FE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  driverName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1A252C",
  },
  driverSubText: {
    fontSize: 11,
    color: "#7F8C8D",
    marginTop: 2,
  },
  callDriverBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#E6F9F0",
    borderWidth: 1,
    borderColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 24,
    gap: 12,
  },
  dismissBtn: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#EAEAEA",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },
  dismissBtnText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1A252C",
  },
  callSchoolBtn: {
    flex: 1.3,
    backgroundColor: "#FF3B30",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    elevation: 3,
  },
  callSchoolBtnText: {
    fontSize: 15,
    fontWeight: "900",
    color: "#FFFFFF",
  },
});