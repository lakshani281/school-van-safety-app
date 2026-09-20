import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DriverProfileScreen() {
  const router = useRouter();
  const [speedAlert, setSpeedAlert] = useState(50);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A252C" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Dark Header Card */}
        <View style={styles.topHeaderCard}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          <View style={styles.profileRow}>
            <View style={styles.avatarBorder}>
              <View style={styles.avatarCircle}>
                <Text style={{ fontSize: 36 }}>👮‍♂️</Text>
              </View>
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.driverName}>Budi Santoso</Text>
              <Text style={styles.driverPhone}>+94 77 123 4567</Text>
              <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Active • On duty</Text>
              </View>
            </View>
          </View>

          {/* Stats Bar */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Students</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>312</Text>
              <Text style={styles.statLabel}>Trips</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>4.9★</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </View>

        {/* Main Body Details */}
        <View style={styles.bodyContainer}>
          {/* Vehicle Info Card */}
          <View style={styles.card}>
            <View style={styles.vehicleRow}>
              <View style={styles.vanIconBox}>
                <Text style={{ fontSize: 32 }}>🚌</Text>
              </View>
              <View style={styles.vehicleDetails}>
                <Text style={styles.vanCode}>GV-204</Text>
                <Text style={styles.vanModel}>
                  Toyota HiAce 2022 • 12 seats
                </Text>
                <Text style={styles.plateNumber}>WP NB-4204</Text>
              </View>
            </View>
          </View>

          {/* License Details Section */}
          <Text style={styles.sectionTitle}>License Details</Text>
          <View style={styles.card}>
            <View style={styles.licenseRow}>
              <View style={styles.licenseLabelGroup}>
                <Text style={styles.rowIcon}>🎴</Text>
                <Text style={styles.licenseLabel}>License No.</Text>
              </View>
              <Text style={styles.licenseValue}>B1234ABC</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.licenseRow}>
              <View style={styles.licenseLabelGroup}>
                <Text style={styles.rowIcon}>📋</Text>
                <Text style={styles.licenseLabel}>Class</Text>
              </View>
              <Text style={styles.licenseValue}>B2 Commercial</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.licenseRow}>
              <View style={styles.licenseLabelGroup}>
                <Text style={styles.rowIcon}>📅</Text>
                <Text style={styles.licenseLabel}>Expiry</Text>
              </View>
              <Text style={styles.licenseValue}>March 2028</Text>
            </View>
          </View>

          {/* Speed Alert Threshold Section */}
          <Text style={styles.sectionTitle}>Speed Alert Threshold</Text>
          <Text style={styles.subSectionTitle}>
            Parents notified when you exceed this speed
          </Text>

          <View style={styles.card}>
            <View style={styles.speedHeaderRow}>
              <Text style={styles.alertAtText}>Alert at</Text>
              <View style={styles.speedValueGroup}>
                <Text style={styles.speedNumber}>{speedAlert}</Text>
                <Text style={styles.speedUnit}> km/h</Text>
              </View>
            </View>

            {/* Interactive Slider Track */}
            <View style={styles.sliderTrackContainer}>
              <View style={styles.sliderTrack}>
                <View
                  style={[
                    styles.sliderFill,
                    { width: `${((speedAlert - 30) / 50) * 100}%` },
                  ]}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.9}
                style={[
                  styles.sliderThumb,
                  { left: `${((speedAlert - 30) / 50) * 88}%` },
                ]}
                onPress={() => setSpeedAlert(speedAlert === 50 ? 60 : 50)}
              >
                <View style={styles.innerThumbDot} />
              </TouchableOpacity>
            </View>

            <View style={styles.sliderLabelsRow}>
              <Text style={styles.limitLabel}>30</Text>
              <Text style={styles.recommendedLabel}>Recommended: 50</Text>
              <Text style={styles.limitLabel}>80</Text>
            </View>
          </View>
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
    paddingBottom: 30,
  },
  topHeaderCard: {
    backgroundColor: "#1A252C",
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
  },
  closeButton: {
    alignSelf: "flex-end",
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  avatarBorder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2,
    borderColor: "#F39C12",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: "#2C3E50",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 22,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  driverPhone: {
    fontSize: 13,
    color: "#A0AAB0",
    marginBottom: 6,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2ECC71",
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2ECC71",
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 10,
    justifyContent: "space-around",
    alignItems: "center",
  },
  statBox: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "900",
    color: "#F39C12",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: "#A0AAB0",
    fontWeight: "600",
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  bodyContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  vehicleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  vanIconBox: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: "#FFF8E7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  vehicleDetails: {
    flex: 1,
  },
  vanCode: {
    fontSize: 20,
    fontWeight: "900",
    color: "#1A252C",
    marginBottom: 2,
  },
  vanModel: {
    fontSize: 13,
    color: "#7F8C8D",
    marginBottom: 6,
    fontWeight: "500",
  },
  plateNumber: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1A252C",
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1A252C",
    marginBottom: 12,
  },
  subSectionTitle: {
    fontSize: 12,
    color: "#7F8C8D",
    marginTop: -8,
    marginBottom: 12,
  },
  licenseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  licenseLabelGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  licenseLabel: {
    fontSize: 14,
    color: "#7F8C8D",
    fontWeight: "600",
  },
  licenseValue: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1A252C",
  },
  separator: {
    height: 1,
    backgroundColor: "#F2F2F2",
    marginVertical: 4,
  },
  speedHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 16,
  },
  alertAtText: {
    fontSize: 13,
    color: "#7F8C8D",
    fontWeight: "600",
  },
  speedValueGroup: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  speedNumber: {
    fontSize: 36,
    fontWeight: "900",
    color: "#1A252C",
  },
  speedUnit: {
    fontSize: 16,
    fontWeight: "700",
    color: "#7F8C8D",
  },
  sliderTrackContainer: {
    height: 30,
    justifyContent: "center",
    marginBottom: 10,
    position: "relative",
  },
  sliderTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#F2ECE4",
    overflow: "hidden",
  },
  sliderFill: {
    height: "100%",
    backgroundColor: "#F39C12",
  },
  sliderThumb: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F39C12",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  innerThumbDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  sliderLabelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  limitLabel: {
    fontSize: 12,
    color: "#A0AAB0",
    fontWeight: "600",
  },
  recommendedLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: "#F39C12",
  },
});