import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Student {
  id: string;
  name: string;
  grade: string;
  address: string;
  distance: string;
  status: "pending" | "picked" | "dropped" | "absent";
  absentNote?: string;
  avatarBg: string;
  avatarColor: string;
}

const INITIAL_STUDENTS: Student[] = [
  {
    id: "1",
    name: "Aisha Rahman",
    grade: "Gr 4",
    address: "12 Maplewood Dr",
    distance: "1.2 km",
    status: "pending",
    avatarBg: "#FFF3D6",
    avatarColor: "#F39C12",
  },
  {
    id: "2",
    name: "Omar Hassan",
    grade: "Gr 6",
    address: "8 Sunflower Ave",
    distance: "2.1 km",
    status: "pending",
    avatarBg: "#E8F0FE",
    avatarColor: "#3B82F6",
  },
  {
    id: "3",
    name: "Priya Mehta",
    grade: "Gr 3",
    address: "33 Cedar Lane",
    distance: "0.8 km",
    status: "absent",
    absentNote: "Marked absent by parent • Skipping this stop",
    avatarBg: "#EAEAEA",
    avatarColor: "#7F8C8D",
  },
  {
    id: "4",
    name: "Lucas Silva",
    grade: "Gr 5",
    address: "90 Oak Street",
    distance: "3.4 km",
    status: "pending",
    avatarBg: "#E6F9F0",
    avatarColor: "#10B981",
  },
  {
    id: "5",
    name: "Zoe Kim",
    grade: "Gr 2",
    address: "17 Birch Blvd",
    distance: "1.9 km",
    status: "pending",
    avatarBg: "#FEE2E2",
    avatarColor: "#EF4444",
  },
];

export default function StudentChecklistScreen() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);

  const toggleStatus = (id: string, newStatus: "picked" | "dropped") => {
    setStudents((prev) =>
      prev.map((student) => {
        if (student.id === id) {
          return {
            ...student,
            status: student.status === newStatus ? "pending" : newStatus,
          };
        }
        return student;
      })
    );
  };

  const pickedCount = students.filter((s) => s.status === "picked").length;
  const droppedCount = students.filter((s) => s.status === "dropped").length;
  const absentCount = students.filter((s) => s.status === "absent").length;
  const markedCount = pickedCount + droppedCount;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A252C" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Header Card */}
        <View style={styles.topCard}>
          <View style={styles.headerTitleRow}>
            <View>
              <Text style={styles.subHeaderTitle}>ATTENDANCE</Text>
              <Text style={styles.mainTitle}>Student Checklist</Text>
            </View>
            <View style={styles.counterBox}>
              <Text style={styles.counterText}>
                <Text style={styles.highlightCount}>{markedCount}</Text>/
                {students.length}
              </Text>
              <Text style={styles.markedSubText}>marked</Text>
            </View>
          </View>

          {/* Quick Filter Status Badges */}
          <View style={styles.filterBadgesRow}>
            <View style={styles.filterBadge}>
              <Text style={[styles.filterBadgeText, { color: "#2ECC71" }]}>
                {pickedCount} Picked Up
              </Text>
            </View>
            <View style={styles.filterBadge}>
              <Text style={[styles.filterBadgeText, { color: "#3498DB" }]}>
                {droppedCount} Dropped
              </Text>
            </View>
            <View style={styles.filterBadge}>
              <Text style={[styles.filterBadgeText, { color: "#95A5A6" }]}>
                {absentCount} Absent
              </Text>
            </View>
          </View>
        </View>

        {/* Student List */}
        <View style={styles.listContainer}>
          {students.map((student) => {
            const isPicked = student.status === "picked";
            const isDropped = student.status === "dropped";
            const isAbsent = student.status === "absent";

            return (
              <View key={student.id} style={styles.studentCard}>
                <View style={styles.studentHeaderRow}>
                  <View
                    style={[
                      styles.avatarBox,
                      {
                        backgroundColor: student.avatarBg,
                        borderColor: student.avatarColor,
                      },
                    ]}
                  >
                    <Text
                      style={[styles.avatarText, { color: student.avatarColor }]}
                    >
                      {student.name.charAt(0)}
                    </Text>
                  </View>

                  <View style={styles.studentInfo}>
                    <View style={styles.nameRow}>
                      <Text style={styles.studentName}>{student.name}</Text>
                      {isAbsent && (
                        <View style={styles.absentBadge}>
                          <Text style={styles.absentBadgeText}>✕ Absent</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.studentSubInfo}>
                      {student.grade} • {student.address} • {student.distance}
                    </Text>
                  </View>
                </View>

                {/* Conditional Actions or Absent Banner */}
                {isAbsent ? (
                  <View style={styles.absentNoticeBox}>
                    <Text style={styles.absentNoticeText}>
                      {student.absentNote}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.actionButtonsRow}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={[
                        styles.actionBtn,
                        styles.pickedBtn,
                        isPicked && styles.pickedBtnActive,
                      ]}
                      onPress={() => toggleStatus(student.id, "picked")}
                    >
                      <Text
                        style={[
                          styles.actionBtnText,
                          { color: "#2ECC71" },
                          isPicked && styles.activeBtnText,
                        ]}
                      >
                        ✓ Picked Up
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={[
                        styles.actionBtn,
                        styles.droppedBtn,
                        isDropped && styles.droppedBtnActive,
                      ]}
                      onPress={() => toggleStatus(student.id, "dropped")}
                    >
                      <Text
                        style={[
                          styles.actionBtnText,
                          { color: "#2980B9" },
                          isDropped && styles.activeBtnText,
                        ]}
                      >
                        ↓ Dropped
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/driver-dashboard" as any)}
        >
          <Text style={styles.tabIcon}>🏠</Text>
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/active-drive" as any)}
        >
          <Text style={styles.tabIcon}>🗺️</Text>
          <Text style={styles.tabLabel}>Drive</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <View style={styles.activeTabHighlight}>
            <Text style={{ fontSize: 18 }}>✅</Text>
          </View>
          <Text style={[styles.tabLabel, styles.activeTabLabel]}>Roster</Text>
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
    paddingBottom: 100,
  },
  topCard: {
    backgroundColor: "#1A252C",
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 28,
  },
  headerTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  subHeaderTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#7F8C8D",
    letterSpacing: 1,
    marginBottom: 4,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  counterBox: {
    alignItems: "flex-end",
  },
  counterText: {
    fontSize: 26,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  highlightCount: {
    color: "#F39C12",
  },
  markedSubText: {
    fontSize: 11,
    color: "#7F8C8D",
    fontWeight: "600",
  },
  filterBadgesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    flex: 0.31,
    alignItems: "center",
  },
  filterBadgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  studentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  studentHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarBox: {
    width: 52,
    height: 52,
    borderRadius: 18,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: "900",
  },
  studentInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  studentName: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1A252C",
  },
  absentBadge: {
    backgroundColor: "#F2F2F2",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  absentBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#7F8C8D",
  },
  studentSubInfo: {
    fontSize: 12,
    color: "#7F8C8D",
    fontWeight: "500",
  },
  actionButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  actionBtn: {
    flex: 0.48,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1.5,
  },
  pickedBtn: {
    backgroundColor: "#E8F8F5",
    borderColor: "#D1F2EB",
  },
  pickedBtnActive: {
    backgroundColor: "#2ECC71",
    borderColor: "#2ECC71",
  },
  droppedBtn: {
    backgroundColor: "#EBF5FB",
    borderColor: "#D4EFDF",
  },
  droppedBtnActive: {
    backgroundColor: "#3498DB",
    borderColor: "#3498DB",
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: "800",
  },
  activeBtnText: {
    color: "#FFFFFF",
  },
  absentNoticeBox: {
    backgroundColor: "#FAF7F2",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginTop: 12,
    alignItems: "center",
  },
  absentNoticeText: {
    fontSize: 12,
    color: "#7F8C8D",
    fontWeight: "600",
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
    paddingHorizontal: 10,
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