import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function DriverDashboard() {
  const router = useRouter();

  const [driverData, setDriverData] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Default Test ID for Logged-In Driver
  const currentDriverId = "94771234567";

  useEffect(() => {
    // 1. Fetch Real-time Driver Details from 'drivers' collection
    const unsubDriver = onSnapshot(
      doc(db, "drivers", currentDriverId),
      (docSnap) => {
        if (docSnap.exists()) {
          setDriverData(docSnap.data());
        }
      },
      (error) => console.error("Error fetching driver:", error)
    );

    // 2. Fetch Real-time Students List from 'students' collection
    const q = query(collection(db, "students"));
    const unsubStudents = onSnapshot(
      q,
      (snapshot) => {
        const studentList: any[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          studentList.push({
            id: doc.id,
            name: data.fullName || "Student",
            address: data.pickupAddress || "Address not provided",
            distance: "1.5 km", // Default distance label
            status: "near",
            initial: data.fullName ? data.fullName.charAt(0).toUpperCase() : "S",
            color: data.avatarColor || "#F39C12",
          });
        });

        // Fallback to initial static data if Firestore collection is empty
        if (studentList.length > 0) {
          setStudents(studentList);
        } else {
          setStudents([
            {
              id: "1",
              name: "Aisha Rahman",
              address: "12 Maplewood Dr",
              distance: "1.2 km",
              status: "near",
              initial: "A",
              color: "#F39C12",
            },
            {
              id: "2",
              name: "Omar Hassan",
              address: "8 Sunflower Ave",
              distance: "2.1 km",
              status: "near",
              initial: "O",
              color: "#2980B9",
            },
            {
              id: "3",
              name: "Priya Mehta",
              address: "33 Cedar Lane",
              distance: "Absent",
              status: "absent",
              initial: "P",
              color: "#8E44AD",
            },
          ]);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching students:", error);
        setLoading(false);
      }
    );

    return () => {
      unsubDriver();
      unsubStudents();
    };
  }, []);

  const handleProfilePress = () => {
    router.push("/driver-profile" as any);
  };

  const handleRosterPress = () => {
    router.push("/student-checklist" as any);
  };

  const handleDrivePress = () => {
    router.push("/active-drive" as any);
  };

  const handleFeesPress = () => {
    router.push("/fees" as any);
  };

  // Helper function to extract initials from full name
  const getInitials = (name?: string) => {
    if (!name) return "DR";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F39C12" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A252C" />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Dark Header Card (Clickable to open Driver Profile) */}
        <TouchableOpacity activeOpacity={0.9} onPress={handleProfilePress}>
          <View style={styles.headerCard}>
            <View style={styles.headerTopRow}>
              <View>
                <Text style={styles.welcomeText}>Welcome back 👋</Text>
                <Text style={styles.driverName}>
                  {driverData?.fullName || "Budi Santoso"}
                </Text>
              </View>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>
                  {getInitials(driverData?.fullName)}
                </Text>
              </View>
            </View>

            {/* Van Info & Weather Row */}
            <View style={styles.infoRow}>
              <View style={styles.infoBox}>
                <Text style={{ fontSize: 20, marginRight: 8 }}>🚐</Text>
                <View>
                  <Text style={styles.infoTitle}>
                    {driverData?.vehicleNumber || "GV - 204"}
                  </Text>
                  <Text style={styles.infoSubText}>
                    {driverData?.serviceArea || "Toyota HiAce"}
                  </Text>
                </View>
              </View>

              <View style={styles.infoBox}>
                <Text style={{ fontSize: 20, marginRight: 8 }}>⛅</Text>
                <View>
                  <Text style={styles.infoTitle}>28°C</Text>
                  <Text style={styles.infoSubText}>Partly cloudy</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Morning Route A Summary Card */}
        <View style={styles.routeCard}>
          <View style={styles.routeHeader}>
            <Text style={styles.routeName}>Morning Route A</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>Scheduled</Text>
            </View>
          </View>

          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <Text style={{ fontSize: 18 }}>👨‍🎓</Text>
              <Text style={styles.metricValue}>{students.length}</Text>
              <Text style={styles.metricLabel}>Students</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={{ fontSize: 18 }}>📍</Text>
              <Text style={styles.metricValue}>{students.length}</Text>
              <Text style={styles.metricLabel}>Stops</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={{ fontSize: 18 }}>🗺️</Text>
              <Text style={styles.metricValue}>12km</Text>
              <Text style={styles.metricLabel}>Distance</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={{ fontSize: 18 }}>⏱️</Text>
              <Text style={styles.metricValue}>35min</Text>
              <Text style={styles.metricLabel}>Est.</Text>
            </View>
          </View>
        </View>

        {/* Today's Students List Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Students</Text>
          <TouchableOpacity onPress={handleRosterPress}>
            <Text style={styles.seeAllText}>See all →</Text>
          </TouchableOpacity>
        </View>

        {/* Students List Card */}
        <View style={styles.studentsCard}>
          {students.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.studentRow,
                index !== students.length - 1 && styles.borderBottom,
              ]}
            >
              <View style={[styles.studentAvatar, { borderColor: item.color }]}>
                <Text style={[styles.studentInitial, { color: item.color }]}>
                  {item.initial}
                </Text>
              </View>
              <View style={styles.studentDetails}>
                <Text style={styles.studentName}>{item.name}</Text>
                <Text style={styles.studentAddress}>{item.address}</Text>
              </View>
              <View
                style={[
                  styles.distanceBadge,
                  item.status === "absent" ? styles.absentBg : styles.nearBg,
                ]}
              >
                <Text
                  style={
                    item.status === "absent"
                      ? styles.absentText
                      : styles.nearText
                  }
                >
                  {item.distance}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Start Morning Trip Button */}
        <TouchableOpacity
          style={styles.startTripBtn}
          activeOpacity={0.8}
          onPress={handleDrivePress}
        >
          <Text style={{ fontSize: 18, marginRight: 8 }}>🚐</Text>
          <Text style={styles.startTripText}>Start Morning Trip</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Floating Navigation Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tabItem, styles.activeTab]}>
          <Text style={{ fontSize: 20 }}>🏠</Text>
          <Text style={styles.activeTabText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={handleDrivePress}>
          <Text style={{ fontSize: 20 }}>🗺️</Text>
          <Text style={styles.tabText}>Drive</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={handleRosterPress}>
          <Text style={{ fontSize: 20 }}>📋</Text>
          <Text style={styles.tabText}>Roster</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={handleFeesPress}>
          <Text style={{ fontSize: 20 }}>💰</Text>
          <Text style={styles.tabText}>Fees</Text>
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
  scrollContainer: {
    paddingBottom: 90,
  },
  headerCard: {
    backgroundColor: "#1A252C",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 25,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 13,
    color: "#95A5A6",
    fontWeight: "500",
  },
  driverName: {
    fontSize: 26,
    fontWeight: "900",
    color: "#FFFFFF",
    marginTop: 2,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#F39C12",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A252C",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoBox: {
    flex: 0.48,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#24333C",
    borderRadius: 16,
    padding: 12,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  infoSubText: {
    fontSize: 11,
    color: "#95A5A6",
  },
  routeCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: -15,
    borderRadius: 24,
    padding: 20,
    elevation: 3,
  },
  routeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  routeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A252C",
  },
  statusBadge: {
    backgroundColor: "#FDF2E9",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#E67E22",
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metricItem: {
    alignItems: "center",
    backgroundColor: "#FAF7F2",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 14,
    width: "23%",
  },
  metricValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1A252C",
    marginTop: 4,
  },
  metricLabel: {
    fontSize: 10,
    color: "#7F8C8D",
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 24,
    marginTop: 25,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A252C",
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#F39C12",
  },
  studentsCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 24,
    paddingHorizontal: 16,
    elevation: 2,
  },
  studentRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },
  studentAvatar: {
    width: 42,
    height: 42,
    borderRadius: 14,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  studentInitial: {
    fontSize: 16,
    fontWeight: "bold",
  },
  studentDetails: {
    flex: 1,
  },
  studentName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1A252C",
  },
  studentAddress: {
    fontSize: 12,
    color: "#7F8C8D",
    marginTop: 2,
  },
  distanceBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  nearBg: {
    backgroundColor: "#FEF5E7",
  },
  nearText: {
    color: "#F39C12",
    fontWeight: "bold",
    fontSize: 12,
  },
  absentBg: {
    backgroundColor: "#F2F4F4",
  },
  absentText: {
    color: "#95A5A6",
    fontWeight: "bold",
    fontSize: 12,
  },
  startTripBtn: {
    flexDirection: "row",
    backgroundColor: "#F39C12",
    marginHorizontal: 20,
    marginTop: 25,
    paddingVertical: 18,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  startTripText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1A252C",
  },
  tabBar: {
    position: "absolute",
    bottom: 15,
    left: 20,
    right: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  tabItem: {
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  activeTab: {
    backgroundColor: "#F39C12",
    borderRadius: 18,
    paddingHorizontal: 16,
  },
  activeTabText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1A252C",
    marginTop: 2,
  },
  tabText: {
    fontSize: 11,
    color: "#95A5A6",
    marginTop: 2,
  },
});