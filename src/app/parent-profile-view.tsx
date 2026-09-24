import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ParentProfileViewScreen() {
  const router = useRouter();
  const [speedAlerts, setSpeedAlerts] = useState(true);
  const [arrivalAlerts, setArrivalAlerts] = useState(true);

  const handleClose = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F39C12" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Amber Rounded Profile Card */}
        <View style={styles.topHeaderCard}>
          <View style={styles.headerDecorationCircle} />

          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={handleClose}
            activeOpacity={0.8}
          >
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>

          {/* Parent Avatar & Name */}
          <View style={styles.parentMainRow}>
            <View style={styles.avatarBox}>
              <Text style={{ fontSize: 36 }}>👩</Text>
            </View>

            <View style={styles.parentMainDetails}>
              <Text style={styles.parentName}>Fatima Rahman</Text>
              <Text style={styles.phoneText}>+94 812-3456-7890</Text>

              <View style={styles.accountBadge}>
                <Text style={styles.accountBadgeText}>PARENT ACCOUNT</Text>
              </View>
            </View>
          </View>

          {/* Stats Bar (Children, Van, Trips) */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Children</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>GV-204</Text>
              <Text style={styles.statLabel}>Van</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>148</Text>
              <Text style={styles.statLabel}>Trips</Text>
            </View>
          </View>
        </View>

        {/* Linked Children Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Linked Children</Text>

          {/* + Add Child Button - Click to navigate to /add-child */}
          <TouchableOpacity
            style={styles.addChildBtn}
            activeOpacity={0.8}
            onPress={() => router.push("/add-child" as any)}
          >
            <Text style={styles.addChildBtnText}>+ Add Child</Text>
          </TouchableOpacity>
        </View>

        {/* Child 1 */}
        <View style={styles.childCard}>
          <View
            style={[
              styles.childAvatarBox,
              { backgroundColor: "#FFF3D6", borderColor: "#F39C12" },
            ]}
          >
            <Text style={[styles.childAvatarText, { color: "#F39C12" }]}>A</Text>
          </View>

          <View style={styles.childInfoBox}>
            <Text style={styles.childName}>Aisha Rahman</Text>
            <Text style={styles.childSubText}>
              Greenfield Academy • Grade 4 • Van GV-204
            </Text>
          </View>

          <TouchableOpacity style={styles.callBtn} activeOpacity={0.8}>
            <Text style={styles.callBtnText}>📞 Call</Text>
          </TouchableOpacity>
        </View>

        {/* Child 2 */}
        <View style={styles.childCard}>
          <View
            style={[
              styles.childAvatarBox,
              { backgroundColor: "#E8F0FE", borderColor: "#3B82F6" },
            ]}
          >
            <Text style={[styles.childAvatarText, { color: "#3B82F6" }]}>T</Text>
          </View>

          <View style={styles.childInfoBox}>
            <Text style={styles.childName}>Tariq Rahman</Text>
            <Text style={styles.childSubText}>
              Greenfield Academy • Grade 7 • Van GV-204
            </Text>
          </View>

          <TouchableOpacity style={styles.callBtn} activeOpacity={0.8}>
            <Text style={styles.callBtnText}>📞 Call</Text>
          </TouchableOpacity>
        </View>

        {/* Pickup Address Section */}
        <Text style={styles.sectionTitleStandalone}>Pickup Address</Text>
        <View style={styles.addressCard}>
          <View style={styles.addressIconBox}>
            <Text style={{ fontSize: 22 }}>🏠</Text>
          </View>

          <View style={styles.addressDetailsBox}>
            <Text style={styles.addressTitle}>12 Maplewood Drive, Block C</Text>
            <Text style={styles.addressSubText}>South Jakarta • 12750</Text>
            <TouchableOpacity activeOpacity={0.7} style={{ marginTop: 4 }}>
              <Text style={styles.editAddressText}>Edit address →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notifications Section */}
        <Text style={styles.sectionTitleStandalone}>Notifications</Text>

        {/* Speed Alerts Toggle */}
        <View style={styles.toggleCard}>
          <View style={styles.toggleIconBox}>
            <Text style={{ fontSize: 20 }}>⚡</Text>
          </View>
          <View style={styles.toggleInfoBox}>
            <Text style={styles.toggleTitle}>Speed Alerts</Text>
            <Text style={styles.toggleSubText}>Notify when van exceeds 50 km/h</Text>
          </View>
          <Switch
            value={speedAlerts}
            onValueChange={setSpeedAlerts}
            trackColor={{ false: "#E0E0E0", true: "#F39C12" }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* Arrival Alerts Toggle */}
        <View style={styles.toggleCard}>
          <View style={styles.toggleIconBox}>
            <Text style={{ fontSize: 20 }}>🔔</Text>
          </View>
          <View style={styles.toggleInfoBox}>
            <Text style={styles.toggleTitle}>Arrival Alerts</Text>
            <Text style={styles.toggleSubText}>Push when van is 5 min away</Text>
          </View>
          <Switch
            value={arrivalAlerts}
            onValueChange={setArrivalAlerts}
            trackColor={{ false: "#E0E0E0", true: "#F39C12" }}
            thumbColor="#FFFFFF"
          />
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
  topHeaderCard: {
    backgroundColor: "#F39C12",
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 28,
    position: "relative",
    overflow: "hidden",
  },
  headerDecorationCircle: {
    position: "absolute",
    right: -40,
    top: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  closeBtn: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  closeBtnText: {
    color: "#1A252C",
    fontSize: 16,
    fontWeight: "800",
  },
  parentMainRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 24,
  },
  avatarBox: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    elevation: 2,
  },
  parentMainDetails: {
    flex: 1,
  },
  parentName: {
    fontSize: 22,
    fontWeight: "900",
    color: "#1A252C",
  },
  phoneText: {
    fontSize: 12,
    color: "#2C3E50",
    fontWeight: "600",
    marginVertical: 2,
  },
  accountBadge: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  accountBadgeText: {
    color: "#1A252C",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statBox: {
    flex: 0.31,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 18,
    paddingVertical: 12,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 16,
    fontWeight: "900",
    color: "#1A252C",
    fontFamily: "monospace",
  },
  statLabel: {
    fontSize: 10,
    color: "#2C3E50",
    fontWeight: "700",
    marginTop: 2,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#1A252C",
  },
  sectionTitleStandalone: {
    fontSize: 16,
    fontWeight: "900",
    color: "#1A252C",
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  addChildBtn: {
    backgroundColor: "#F39C12",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  addChildBtnText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#1A252C",
  },
  childCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
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
    marginRight: 12,
  },
  childAvatarText: {
    fontSize: 20,
    fontWeight: "900",
  },
  childInfoBox: {
    flex: 1,
  },
  childName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1A252C",
  },
  childSubText: {
    fontSize: 11,
    color: "#7F8C8D",
    marginTop: 2,
  },
  callBtn: {
    backgroundColor: "#E6F9F0",
    borderWidth: 1,
    borderColor: "#2ECC71",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  callBtnText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#2ECC71",
  },
  addressCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  addressIconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#FFF8ED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  addressDetailsBox: {
    flex: 1,
  },
  addressTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1A252C",
  },
  addressSubText: {
    fontSize: 12,
    color: "#7F8C8D",
    marginTop: 2,
  },
  editAddressText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#F39C12",
  },
  toggleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  toggleIconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FFF8ED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  toggleInfoBox: {
    flex: 1,
  },
  toggleTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1A252C",
  },
  toggleSubText: {
    fontSize: 11,
    color: "#7F8C8D",
    marginTop: 2,
  },
});