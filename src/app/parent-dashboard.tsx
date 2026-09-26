import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function ParentDashboardScreen() {
  const router = useRouter();
  const [isAbsent, setIsAbsent] = useState(false);
  const [childrenList, setChildrenList] = useState<any[]>([]);
  const [driverInfo, setDriverInfo] = useState<any>(null);
  const [activeTrip, setActiveTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const assignedDriverId = "94771234567"; // Current assigned driver ID

  useEffect(() => {
    // 1. Fetch Real-time Active Trip Data from 'trips' collection
    const unsubTrip = onSnapshot(
      doc(db, "trips", assignedDriverId),
      (docSnap) => {
        if (docSnap.exists()) {
          setActiveTrip(docSnap.data());
        }
      },
      (error) => console.error("Error fetching trip:", error)
    );

    // 2. Fetch Assigned Driver Details from 'drivers' collection
    const unsubDriver = onSnapshot(
      doc(db, "drivers", assignedDriverId),
      (docSnap) => {
        if (docSnap.exists()) {
          setDriverInfo(docSnap.data());
        }
      },
      (error) => console.error("Error fetching driver:", error)
    );

    // 3. Fetch Children list from 'students' collection
    const q = query(collection(db, "students"));
    const unsubStudents = onSnapshot(
      q,
      (snapshot) => {
        const docs: any[] = [];
        snapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
        });
        setChildrenList(docs);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching children:", error);
        setLoading(false);
      }
    );

    return () => {
      unsubTrip();
      unsubDriver();
      unsubStudents();
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F39C12" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Header Section */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greetingText}>Good morning 👋</Text>
            <Text style={styles.parentName}>Fatima Rahman</Text>
          </View>

          <View style={styles.headerRightControls}>
            {/* Bell Icon -> Click to navigate to /parent-alerts */}
            <TouchableOpacity
              style={styles.bellBtn}
              activeOpacity={0.8}
              onPress={() => router.push("/parent-alerts" as any)}
            >
              <Text style={{ fontSize: 18 }}>🔔</Text>
              {activeTrip?.isOverSpeed && <View style={styles.bellBadgeDot} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.avatarCircle}
              activeOpacity={0.8}
              onPress={() => router.push("/parent-profile-view" as any)}
            >
              <Text style={styles.avatarText}>FR</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Live Tracking Map Card */}
        <View style={styles.mapCardContainer}>
          <View style={styles.mapGraphicCard}>
            <View style={styles.gridLineVertical} />
            <View style={styles.gridLineHorizontal} />

            <View style={styles.liveBadge}>
              <View
                style={[
                  styles.liveGreenDot,
                  {
                    backgroundColor:
                      activeTrip?.status === "ONGOING" ? "#2ECC71" : "#95A5A6",
                  },
                ]}
              />
              <Text style={styles.liveBadgeText}>
                {activeTrip?.status === "ONGOING" ? "LIVE" : "OFFLINE"}
              </Text>
            </View>

            <View style={styles.speedBadge}>
              <Text style={styles.speedBadgeText}>
                {activeTrip?.currentSpeed || 0} km/h
              </Text>
            </View>

            <View style={styles.routePathContainer}>
              <Text style={styles.dashedRoutePath}>〰️〰️〰️〰️〰️</Text>
              <View style={styles.startLocationPin}>
                <Text style={{ fontSize: 16 }}>📍</Text>
              </View>
              <View style={styles.vanMarkerBox}>
                <Text style={{ fontSize: 20 }}>🚐</Text>
              </View>
            </View>
          </View>

          <View style={styles.etaInfoCard}>
            <View style={styles.etaBadge}>
              <Text style={styles.etaNumber}>2</Text>
              <Text style={styles.etaUnit}>min</Text>
            </View>

            <View style={styles.etaDetailsBox}>
              <Text style={styles.etaTitle}>
                Van {driverInfo?.vehicleNumber || "GV-204"}{" "}
                {activeTrip?.status === "ONGOING" ? "arriving" : "idle"}
              </Text>
              <Text style={styles.etaSubtitle}>800m • Jl. Maplewood Dr</Text>
              <View style={styles.etaProgressTrack}>
                <View style={styles.etaProgressFill} />
              </View>
            </View>
          </View>
        </View>

        {/* My Children Section */}
        <Text style={styles.sectionTitle}>My Children</Text>

        {childrenList.length > 0 ? (
          childrenList.map((child, index) => (
            <View key={child.id || index} style={styles.childCard}>
              <View
                style={[
                  styles.childAvatarBox,
                  {
                    backgroundColor: child.avatarColor
                      ? `${child.avatarColor}20`
                      : "#FFF3D6",
                    borderColor: child.avatarColor || "#F39C12",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.childAvatarText,
                    { color: child.avatarColor || "#F39C12" },
                  ]}
                >
                  {child.fullName ? child.fullName.charAt(0).toUpperCase() : "C"}
                </Text>
              </View>
              <View style={styles.childInfoBox}>
                <Text style={styles.childName}>
                  {child.fullName || "Aisha Rahman"}
                </Text>
                <Text style={styles.childSubInfo}>
                  Grade {child.grade || "4"} • Van{" "}
                  {child.vanNumber || driverInfo?.vehicleNumber || "GV-204"}
                </Text>
                <View style={styles.boardedBadge}>
                  <Text style={styles.boardedBadgeText}>✓ Boarded 6:45 AM</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.childCard}>
            <View
              style={[
                styles.childAvatarBox,
                { backgroundColor: "#FFF3D6", borderColor: "#F39C12" },
              ]}
            >
              <Text style={[styles.childAvatarText, { color: "#F39C12" }]}>
                A
              </Text>
            </View>
            <View style={styles.childInfoBox}>
              <Text style={styles.childName}>Aisha Rahman</Text>
              <Text style={styles.childSubInfo}>Grade 4 • Van GV-204</Text>
              <View style={styles.boardedBadge}>
                <Text style={styles.boardedBadgeText}>✓ Boarded 6:45 AM</Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.absentToggleCard}>
          <View style={styles.absentToggleLeft}>
            <Text style={styles.absentToggleTitle}>🏚️ Mark Absent Today</Text>
            <Text style={styles.absentToggleSubText}>
              Notify driver before 6:00 AM
            </Text>
          </View>
          <Switch
            value={isAbsent}
            onValueChange={setIsAbsent}
            trackColor={{ false: "#E0E0E0", true: "#F39C12" }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* Your Driver Section */}
        <Text style={styles.sectionTitle}>Your Driver</Text>

        <TouchableOpacity
          style={styles.driverCard}
          activeOpacity={0.8}
          onPress={() => router.push("/driver-profile-view" as any)}
        >
          <View style={styles.driverAvatarCircle}>
            <Text style={{ fontSize: 26 }}>👮</Text>
          </View>

          <View style={styles.driverInfoBox}>
            <Text style={styles.driverName}>
              {driverInfo?.fullName || "Budi Santoso"}
            </Text>
            <Text style={styles.driverLicenseText}>
              Van {driverInfo?.vehicleNumber || "GV-204"} • License{" "}
              {driverInfo?.licenseNumber || "B1234ABC"}
            </Text>
            <View style={styles.driverBadgesRow}>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>⭐ 4.9</Text>
              </View>
              <View style={styles.onDutyBadge}>
                <Text style={styles.onDutyText}>
                  {activeTrip?.status === "ONGOING" ? "On Duty" : "Off Duty"}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.driverActionsRow}>
            <View style={styles.callDriverBtn}>
              <Text style={{ fontSize: 18 }}>📞</Text>
            </View>
            <View style={styles.messageDriverBtn}>
              <Text style={{ fontSize: 16 }}>💬</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Parent Bottom Navigation Tab Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.8}>
          <View style={styles.activeTabHighlight}>
            <Text style={{ fontSize: 18 }}>📍</Text>
          </View>
          <Text style={[styles.tabLabel, styles.activeTabLabel]}>Track</Text>
        </TouchableOpacity>

        {/* Pay Button -> Navigates to /parent-fees */}
        <TouchableOpacity
          style={styles.tabItem}
          activeOpacity={0.8}
          onPress={() => router.push("/parent-fees" as any)}
        >
          <Text style={styles.tabIcon}>💳</Text>
          <Text style={styles.tabLabel}>Pay</Text>
        </TouchableOpacity>

        {/* Alerts Tab Button -> Click to navigate to /parent-alerts */}
        <TouchableOpacity
          style={styles.tabItem}
          activeOpacity={0.8}
          onPress={() => router.push("/parent-alerts" as any)}
        >
          <Text style={styles.tabIcon}>⚠️</Text>
          <Text style={styles.tabLabel}>Alerts</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAF7F2",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 110,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 13,
    color: "#7F8C8D",
    fontWeight: "600",
  },
  parentName: {
    fontSize: 24,
    fontWeight: "900",
    color: "#1A252C",
    marginTop: 2,
  },
  headerRightControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  bellBtn: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#FFF8ED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    position: "relative",
  },
  bellBadgeDot: {
    position: "absolute",
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF3B30",
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#F39C12",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 15,
    fontWeight: "900",
    color: "#1A252C",
  },
  mapCardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#EAEAEA",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    marginBottom: 24,
  },
  mapGraphicCard: {
    height: 180,
    backgroundColor: "#E8F0E6",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  gridLineVertical: {
    position: "absolute",
    left: "50%",
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: "#FFFFFF",
  },
  gridLineHorizontal: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#FFFFFF",
  },
  liveBadge: {
    position: "absolute",
    top: 14,
    left: 14,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  liveGreenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2ECC71",
    marginRight: 6,
  },
  liveBadgeText: {
    fontSize: 11,
    fontWeight: "900",
    color: "#1A252C",
    letterSpacing: 0.5,
  },
  speedBadge: {
    position: "absolute",
    top: 14,
    right: 14,
    backgroundColor: "#1A252C",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  speedBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#F39C12",
    fontFamily: "monospace",
  },
  routePathContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  dashedRoutePath: {
    fontSize: 20,
    color: "#F39C12",
    letterSpacing: -2,
  },
  startLocationPin: {
    position: "absolute",
    left: -20,
  },
  vanMarkerBox: {
    position: "absolute",
    right: -10,
    backgroundColor: "#FFF8ED",
    padding: 8,
    borderRadius: 16,
    elevation: 4,
  },
  etaInfoCard: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  etaBadge: {
    backgroundColor: "#F39C12",
    width: 54,
    height: 54,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  etaNumber: {
    fontSize: 20,
    fontWeight: "900",
    color: "#1A252C",
  },
  etaUnit: {
    fontSize: 10,
    fontWeight: "800",
    color: "#1A252C",
    marginTop: -4,
  },
  etaDetailsBox: {
    flex: 1,
  },
  etaTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1A252C",
  },
  etaSubtitle: {
    fontSize: 12,
    color: "#7F8C8D",
    marginVertical: 3,
  },
  etaProgressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "#EAEAEA",
    overflow: "hidden",
    marginTop: 2,
  },
  etaProgressFill: {
    height: "100%",
    width: "65%",
    backgroundColor: "#F39C12",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#1A252C",
    marginBottom: 14,
  },
  childCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  childAvatarBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  childAvatarText: {
    fontSize: 20,
    fontWeight: "900",
  },
  childInfoBox: {
    flex: 1,
  },
  childName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1A252C",
  },
  childSubInfo: {
    fontSize: 12,
    color: "#7F8C8D",
    marginVertical: 2,
  },
  boardedBadge: {
    backgroundColor: "#E6F9F0",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 2,
  },
  boardedBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#10B981",
    fontFamily: "monospace",
  },
  enRouteBadge: {
    backgroundColor: "#FFF8ED",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 2,
  },
  enRouteBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#F39C12",
    fontFamily: "monospace",
  },
  absentToggleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  absentToggleLeft: {
    flex: 1,
  },
  absentToggleTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1A252C",
  },
  absentToggleSubText: {
    fontSize: 11,
    color: "#7F8C8D",
    marginTop: 2,
  },
  driverCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  driverAvatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#E8F0FE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  driverInfoBox: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1A252C",
  },
  driverLicenseText: {
    fontSize: 11,
    color: "#7F8C8D",
    marginVertical: 2,
  },
  driverBadgesRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  ratingBadge: {
    backgroundColor: "#E6F9F0",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginRight: 6,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#10B981",
  },
  onDutyBadge: {
    backgroundColor: "#FFF8ED",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  onDutyText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#F39C12",
    fontFamily: "monospace",
  },
  driverActionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
  messageDriverBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#F2ECE4",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomTabBar: {
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