import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ActiveDriveScreen() {
  const router = useRouter();
  // Speed Limit is set to 50 km/h
  const speedLimit = 50;
  // Default speed set to 52 km/h to demonstrate the Over Speed Warning UI
  const [currentSpeed, setCurrentSpeed] = useState(52);

  const isOverSpeed = currentSpeed > speedLimit;

  const handleSOSPress = () => {
    Alert.alert(
      "Emergency SOS Triggered",
      "Notifying school admin, parents, and emergency services immediately!",
      [{ text: "OK", style: "destructive" }]
    );
  };

  const handleEndTrip = () => {
    Alert.alert("End Trip", "Are you sure you want to end this morning trip?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "End Trip",
        style: "destructive",
        onPress: () => router.push("/driver-dashboard" as any),
      },
    ]);
  };

  // Helper function to toggle speed for UI testing (46 km/h normal vs 52 km/h overspeed)
  const toggleSpeedTest = () => {
    setCurrentSpeed((prev) => (prev > speedLimit ? 46 : 52));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={isOverSpeed ? "#FF3B30" : "#1A252C"}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Dynamic Speed & Emergency Header (Changes to Red on Over-Speed) */}
        <TouchableOpacity activeOpacity={0.95} onPress={toggleSpeedTest}>
          <View
            style={[
              styles.topHeaderCard,
              isOverSpeed && styles.overSpeedHeaderCard,
            ]}
          >
            <View style={styles.speedRow}>
              <View style={styles.speedDetails}>
                {isOverSpeed ? (
                  <Text style={styles.overSpeedHeaderLabel}>
                    ⚠️ OVER SPEED LIMIT
                  </Text>
                ) : (
                  <Text style={styles.speedHeaderLabel}>CURRENT SPEED</Text>
                )}

                <View style={styles.speedValueRow}>
                  <Text
                    style={[
                      styles.speedNumber,
                      isOverSpeed && styles.overSpeedNumber,
                    ]}
                  >
                    {currentSpeed}
                  </Text>
                  <Text style={styles.speedUnit}> km/h</Text>
                </View>

                <Text
                  style={[
                    styles.speedLimitText,
                    isOverSpeed && styles.overSpeedLimitText,
                  ]}
                >
                  Limit: {speedLimit} km/h
                </Text>
              </View>

              {/* Glowing Red Emergency SOS Button */}
              <TouchableOpacity
                style={styles.sosButtonOuter}
                activeOpacity={0.8}
                onPress={handleSOSPress}
              >
                <View style={styles.sosButtonInner}>
                  <Text style={styles.sosTitle}>SOS</Text>
                  <Text style={styles.sosSubTitle}>EMERGENCY</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Speed Indicator Progress Line */}
            <View style={styles.speedProgressTrack}>
              <View
                style={[
                  styles.speedProgressFill,
                  {
                    width: `${Math.min((currentSpeed / speedLimit) * 100, 100)}%`,
                    backgroundColor: isOverSpeed ? "#FFFFFF" : "#F39C12",
                  },
                ]}
              />
            </View>
          </View>
        </TouchableOpacity>

        {/* Route Tracking Map Graphic */}
        <View style={styles.bodyContent}>
          <View style={styles.mapCard}>
            <View style={styles.mapGridLines}>
              {/* Vertical & Horizontal Grid Mock Lines */}
              <View style={styles.gridVerticalLine} />
              <View style={styles.gridHorizontalLine} />
            </View>

            {/* Dashed Route Path Illustration */}
            <View style={styles.routePathBox}>
              <Text style={styles.dashedPath}>〰️〰️〰️〰️〰️〰️〰️</Text>
              <View style={styles.vanMarker}>
                <Text style={{ fontSize: 20 }}>🚌</Text>
              </View>
              <View style={styles.destinationPin}>
                <Text style={{ fontSize: 18 }}>📍</Text>
              </View>
            </View>

            {/* Stop Indicator Tag */}
            <View style={styles.stopTag}>
              <Text style={styles.stopTagText}>Stop 2/5 • 1.2km</Text>
            </View>
          </View>

          {/* Next Pickup Details Card */}
          <View style={styles.nextPickupCard}>
            <Text style={styles.nextPickupTitle}>NEXT PICKUP</Text>

            <View style={styles.studentInfoRow}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>O</Text>
              </View>

              <View style={styles.studentDetails}>
                <Text style={styles.studentName}>Omar Hassan</Text>
                <Text style={styles.studentAddress}>
                  8 Sunflower Ave • Grade 6
                </Text>
                <View style={styles.distanceBadge}>
                  <Text style={styles.distanceText}>1.2 km • ~3 min</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.callButton} activeOpacity={0.8}>
                <Text style={{ fontSize: 18 }}>📞</Text>
              </TouchableOpacity>
            </View>

            {/* Navigation & Attendance Action Buttons */}
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.navigateBtn} activeOpacity={0.8}>
                <Text style={{ fontSize: 16, marginRight: 6 }}>🧭</Text>
                <Text style={styles.navigateBtnText}>Navigate</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.attendanceBtn}
                activeOpacity={0.8}
                onPress={() => router.push("/student-checklist" as any)}
              >
                <Text style={{ fontSize: 16, marginRight: 6 }}>✅</Text>
                <Text style={styles.attendanceBtnText}>Attendance →</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 5-Step Stop Progress Line */}
          <View style={styles.progressStepsRow}>
            <View style={[styles.stepBar, styles.stepCompleted]} />
            <View style={[styles.stepBar, styles.stepActive]} />
            <View style={styles.stepBar} />
            <View style={styles.stepBar} />
            <View style={styles.stepBar} />
          </View>
          <View style={styles.stepLabelsRow}>
            <Text style={styles.stepLabel}>1</Text>
            <Text style={[styles.stepLabel, { color: "#F39C12" }]}>2</Text>
            <Text style={styles.stepLabel}>3</Text>
            <Text style={styles.stepLabel}>4</Text>
            <Text style={styles.stepLabel}>5</Text>
          </View>

          {/* End Trip Button */}
          <TouchableOpacity
            style={styles.endTripBtn}
            activeOpacity={0.8}
            onPress={handleEndTrip}
          >
            <Text style={styles.endTripSquareIcon}>⏹</Text>
            <Text style={styles.endTripText}>End Trip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Floating Navigation Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/driver-dashboard" as any)}
        >
          <Text style={styles.tabIcon}>🏠</Text>
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <View style={styles.activeTabHighlight}>
            <Text style={{ fontSize: 18 }}>🗺️</Text>
          </View>
          <Text style={[styles.tabLabel, styles.activeTabLabel]}>Drive</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/student-checklist" as any)}
        >
          <Text style={styles.tabIcon}>✅</Text>
          <Text style={styles.tabLabel}>Roster</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>💰</Text>
          <Text style={styles.tabLabel}>Fees</Text>
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
  scrollContent: {
    paddingBottom: 110,
  },
  topHeaderCard: {
    backgroundColor: "#1A252C",
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 28,
  },
  overSpeedHeaderCard: {
    backgroundColor: "#FF3B30",
  },
  speedRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  speedDetails: {
    flex: 1,
  },
  speedHeaderLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#7F8C8D",
    letterSpacing: 1,
  },
  overSpeedHeaderLabel: {
    fontSize: 11,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  speedValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginVertical: 2,
  },
  speedNumber: {
    fontSize: 48,
    fontWeight: "900",
    color: "#F39C12",
  },
  overSpeedNumber: {
    color: "#FFFFFF",
  },
  speedUnit: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  speedLimitText: {
    fontSize: 12,
    color: "#7F8C8D",
    fontWeight: "600",
  },
  overSpeedLimitText: {
    color: "#FFE5E5",
  },
  sosButtonOuter: {
    width: 84,
    height: 84,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  sosButtonInner: {
    width: 68,
    height: 68,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  sosTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: "#FF3B30",
  },
  sosSubTitle: {
    fontSize: 8,
    fontWeight: "800",
    color: "#FF3B30",
  },
  speedProgressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    marginTop: 20,
    overflow: "hidden",
  },
  speedProgressFill: {
    height: "100%",
  },
  bodyContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  mapCard: {
    height: 160,
    backgroundColor: "#E8F0E6",
    borderRadius: 24,
    position: "relative",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D5E5D3",
  },
  mapGridLines: {
    ...StyleSheet.absoluteFill,
  },
  gridVerticalLine: {
    position: "absolute",
    left: "50%",
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: "#FFFFFF",
  },
  gridHorizontalLine: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#FFFFFF",
  },
  routePathBox: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    justifyContent: "center",
    position: "relative",
  },
  dashedPath: {
    color: "#F39C12",
    fontSize: 18,
    letterSpacing: -2,
  },
  vanMarker: {
    position: "absolute",
    left: "40%",
    top: -10,
    backgroundColor: "#FFF8E7",
    padding: 6,
    borderRadius: 14,
    elevation: 4,
  },
  destinationPin: {
    position: "absolute",
    right: 0,
    top: -15,
  },
  stopTag: {
    position: "absolute",
    bottom: 12,
    left: 14,
    backgroundColor: "#FFFFFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  stopTagText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#1A252C",
    fontFamily: "monospace",
  },
  nextPickupCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    marginTop: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  nextPickupTitle: {
    fontSize: 11,
    fontWeight: "900",
    color: "#F39C12",
    letterSpacing: 1,
    marginBottom: 12,
  },
  studentInfoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#3B82F6",
    backgroundColor: "#E8F0FE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#3B82F6",
  },
  studentDetails: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1A252C",
  },
  studentAddress: {
    fontSize: 12,
    color: "#7F8C8D",
    marginVertical: 2,
  },
  distanceBadge: {
    backgroundColor: "#E6F9F0",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 2,
  },
  distanceText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#10B981",
    fontFamily: "monospace",
  },
  callButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#E6F9F0",
    borderWidth: 1,
    borderColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  navigateBtn: {
    flex: 0.47,
    flexDirection: "row",
    backgroundColor: "#F2ECE4",
    paddingVertical: 12,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  navigateBtnText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1A252C",
  },
  attendanceBtn: {
    flex: 0.49,
    flexDirection: "row",
    backgroundColor: "#F39C12",
    paddingVertical: 12,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  attendanceBtnText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1A252C",
  },
  progressStepsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  stepBar: {
    flex: 0.18,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#EAEAEA",
  },
  stepCompleted: {
    backgroundColor: "#2ECC71",
  },
  stepActive: {
    backgroundColor: "#F39C12",
  },
  stepLabelsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 4,
  },
  stepLabel: {
    fontSize: 10,
    color: "#A0AAB0",
    fontWeight: "800",
  },
  endTripBtn: {
    flexDirection: "row",
    backgroundColor: "#FEE2E2",
    borderWidth: 1.5,
    borderColor: "#EF4444",
    paddingVertical: 14,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  endTripSquareIcon: {
    color: "#EF4444",
    fontSize: 16,
    marginRight: 8,
  },
  endTripText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#EF4444",
  },
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#A0AAB0",
  },
  activeTabHighlight: {
    width: 48,
    height: 38,
    borderRadius: 16,
    backgroundColor: "#F39C12",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2,
  },
  activeTabLabel: {
    color: "#1A252C",
    fontWeight: "800",
  },
});