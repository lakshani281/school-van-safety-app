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

export default function ParentAlertsScreen() {
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(2);

  const handleMarkAllRead = () => {
    setUnreadCount(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.subHeaderTitle}>Activity</Text>
            <View style={styles.titleWithBadge}>
              <Text style={styles.mainTitle}>Notifications</Text>
              {unreadCount > 0 && (
                <View style={styles.countBadge}>
                  <Text style={styles.countBadgeText}>{unreadCount}</Text>
                </View>
              )}
            </View>
          </View>

          <TouchableOpacity
            style={styles.markReadBtn}
            activeOpacity={0.8}
            onPress={handleMarkAllRead}
          >
            <Text style={styles.markReadBtnText}>Mark all read</Text>
          </TouchableOpacity>
        </View>

        {/* TODAY SECTION */}
        <Text style={styles.sectionHeader}>TODAY</Text>

        {/* Alert 1 */}
        <View style={styles.alertCard}>
          <View style={[styles.iconBox, { backgroundColor: "#E6F9F0" }]}>
            <Text style={{ fontSize: 20 }}>🎒</Text>
          </View>
          <View style={styles.alertDetails}>
            <Text style={styles.alertTitle}>Aisha boarded the van 🎒</Text>
            <Text style={styles.alertSubtitle}>Picked up at 6:45 AM • Stop 1</Text>
            <Text style={styles.timeText}>6:45 AM</Text>
          </View>
          {unreadCount > 0 && <View style={styles.greenUnreadDot} />}
        </View>

        {/* Alert 2 (Speed Warning) */}
        <View style={[styles.alertCard, styles.speedWarningCard]}>
          <View style={[styles.iconBox, { backgroundColor: "#FFF3D6" }]}>
            <Text style={{ fontSize: 20 }}>⚡</Text>
          </View>
          <View style={styles.alertDetails}>
            <Text style={styles.alertTitle}>Speed alert on GV-204 ⚠️</Text>
            <Text style={styles.alertSubtitle}>
              Driver reached 62 km/h near school zone
            </Text>
            <Text style={styles.timeText}>7:12 AM</Text>
          </View>
          {unreadCount > 0 && <View style={styles.redUnreadDot} />}
        </View>

        {/* Alert 3 */}
        <View style={styles.alertCard}>
          <View style={[styles.iconBox, { backgroundColor: "#E8F0FE" }]}>
            <Text style={{ fontSize: 20 }}>🏫</Text>
          </View>
          <View style={styles.alertDetails}>
            <Text style={styles.alertTitle}>Aisha arrived at school ✅</Text>
            <Text style={styles.alertSubtitle}>
              Dropped off safely at Greenfield Academy
            </Text>
            <Text style={styles.timeText}>7:38 AM</Text>
          </View>
        </View>

        {/* Alert 4 */}
        <View style={styles.alertCard}>
          <View style={[styles.iconBox, { backgroundColor: "#E6F9F0" }]}>
            <Text style={{ fontSize: 20 }}>🎒</Text>
          </View>
          <View style={styles.alertDetails}>
            <Text style={styles.alertTitle}>Tariq boarded the van 🎒</Text>
            <Text style={styles.alertSubtitle}>Picked up at 6:52 AM • Stop 3</Text>
            <Text style={styles.timeText}>6:52 AM</Text>
          </View>
        </View>

        {/* YESTERDAY SECTION */}
        <Text style={styles.sectionHeader}>YESTERDAY</Text>

        {/* Alert 5 (SOS Triggered) */}
        <View style={styles.alertCard}>
          <View style={[styles.iconBox, { backgroundColor: "#FFE5E5" }]}>
            <Text style={{ fontSize: 16, fontWeight: "900", color: "#FF3B30" }}>
              SOS
            </Text>
          </View>
          <View style={styles.alertDetails}>
            <Text style={styles.alertTitle}>SOS alert triggered 🆘</Text>
            <Text style={styles.alertSubtitle}>
              Driver pressed emergency button • Resolved
            </Text>
            <Text style={styles.timeText}>Yesterday</Text>
          </View>
        </View>

        {/* Alert 6 */}
        <View style={styles.alertCard}>
          <View style={[styles.iconBox, { backgroundColor: "#E8F0FE" }]}>
            <Text style={{ fontSize: 20 }}>🏫</Text>
          </View>
          <View style={styles.alertDetails}>
            <Text style={styles.alertTitle}>Tariq arrived at school ✅</Text>
            <Text style={styles.alertSubtitle}>
              Dropped off safely at Greenfield Academy
            </Text>
            <Text style={styles.timeText}>Yesterday</Text>
          </View>
        </View>
      </ScrollView>

      {/* Parent Bottom Navigation Tab Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          activeOpacity={0.8}
          onPress={() => router.push("/parent-dashboard" as any)}
        >
          <Text style={styles.tabIcon}>📍</Text>
          <Text style={styles.tabLabel}>Track</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          activeOpacity={0.8}
          onPress={() => router.push("/fees" as any)}
        >
          <Text style={styles.tabIcon}>💳</Text>
          <Text style={styles.tabLabel}>Pay</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} activeOpacity={0.8}>
          <View style={styles.activeTabHighlight}>
            <Text style={{ fontSize: 18 }}>⚠️</Text>
          </View>
          <Text style={[styles.tabLabel, styles.activeTabLabel]}>Alerts</Text>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 110,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  subHeaderTitle: {
    fontSize: 13,
    color: "#7F8C8D",
    fontWeight: "600",
  },
  titleWithBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: "#1A252C",
    marginRight: 8,
  },
  countBadge: {
    backgroundColor: "#FF3B30",
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  countBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
  },
  markReadBtn: {
    borderWidth: 1.5,
    borderColor: "#F39C12",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  markReadBtnText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#F39C12",
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: "800",
    color: "#7F8C8D",
    letterSpacing: 0.8,
    marginTop: 10,
    marginBottom: 12,
  },
  alertCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    position: "relative",
  },
  speedWarningCard: {
    borderColor: "#FCA5A5",
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  alertDetails: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1A252C",
  },
  alertSubtitle: {
    fontSize: 12,
    color: "#7F8C8D",
    marginTop: 3,
  },
  timeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#A0AAB0",
    marginTop: 6,
    fontFamily: "monospace",
  },
  greenUnreadDot: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
  },
  redUnreadDot: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF3B30",
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