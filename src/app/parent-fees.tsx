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

export default function ParentFeesScreen() {
  const router = useRouter();
  const [showSlipSuccess, setShowSlipSuccess] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={styles.headerRow}>
          <Text style={styles.subHeaderTitle}>Monthly Fees</Text>
          <Text style={styles.mainTitle}>Van Payments</Text>
        </View>

        {/* Current Due Payment Card */}
        <View style={styles.dueCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.monthLabel}>SEPTEMBER 2026</Text>
            <View style={styles.unpaidBadge}>
              <Text style={styles.unpaidBadgeText}>UNPAID</Text>
            </View>
          </View>

          <Text style={styles.amountText}>Rs. 15,000</Text>
          <Text style={styles.dueDateText}>Due by 5 September 2026</Text>

          {/* Children Fee Breakdown Row */}
          <View style={styles.childrenBreakdownRow}>
            <View style={styles.childFeeBox}>
              <View style={[styles.avatarBox, { backgroundColor: "#F39C12" }]}>
                <Text style={styles.avatarText}>A</Text>
              </View>
              <View>
                <Text style={styles.childName}>Aisha</Text>
                <Text style={styles.childAmount}>Rs. 7,500</Text>
              </View>
            </View>

            <View style={styles.childFeeBox}>
              <View style={[styles.avatarBox, { backgroundColor: "#3B82F6" }]}>
                <Text style={styles.avatarText}>T</Text>
              </View>
              <View>
                <Text style={styles.childName}>Tariq</Text>
                <Text style={styles.childAmount}>Rs. 7,500</Text>
              </View>
            </View>
          </View>

          {/* Action Button -> Navigates to /bank-transfer */}
          <TouchableOpacity
            style={styles.uploadSlipBtn}
            activeOpacity={0.8}
            onPress={() => router.push("/bank-transfer" as any)}
          >
            <Text style={styles.uploadBtnText}>🏦 Transfer & Upload Slip</Text>
          </TouchableOpacity>

          {showSlipSuccess && (
            <View style={styles.successNotice}>
              <Text style={styles.successNoticeText}>
                ✓ Payment slip uploaded successfully for review!
              </Text>
            </View>
          )}
        </View>

        {/* Accepted Banks Section */}
        <Text style={styles.sectionHeaderTitle}>ACCEPTED BANKS</Text>
        <View style={styles.acceptedBanksCard}>
          <View style={styles.bankPill}>
            <View style={styles.bankRedIcon} />
            <View>
              <Text style={styles.bankName}>BOC</Text>
              <Text style={styles.bankStatus}>Available</Text>
            </View>
          </View>
        </View>

        {/* Payment History Section */}
        <Text style={styles.sectionTitle}>Payment History</Text>
        <View style={styles.historyContainer}>
          {/* August 2026 */}
          <View style={styles.historyRow}>
            <View style={styles.checkIconBox}>
              <Text style={{ fontSize: 16 }}>✅</Text>
            </View>
            <View style={styles.historyDetails}>
              <Text style={styles.historyMonth}>August 2026</Text>
              <Text style={styles.historyMeta}>1 Aug 2026 • Bank Transfer</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.historyAmount}>Rs. 15,000</Text>
              <View style={styles.paidBadge}>
                <Text style={styles.paidBadgeText}>Paid</Text>
              </View>
            </View>
          </View>

          {/* July 2026 */}
          <View style={styles.historyRow}>
            <View style={styles.checkIconBox}>
              <Text style={{ fontSize: 16 }}>✅</Text>
            </View>
            <View style={styles.historyDetails}>
              <Text style={styles.historyMonth}>July 2026</Text>
              <Text style={styles.historyMeta}>2 Jul 2026 • Online Transfer</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.historyAmount}>Rs. 15,000</Text>
              <View style={styles.paidBadge}>
                <Text style={styles.paidBadgeText}>Paid</Text>
              </View>
            </View>
          </View>

          {/* June 2026 */}
          <View style={styles.historyRow}>
            <View style={styles.checkIconBox}>
              <Text style={{ fontSize: 16 }}>✅</Text>
            </View>
            <View style={styles.historyDetails}>
              <Text style={styles.historyMonth}>June 2026</Text>
              <Text style={styles.historyMeta}>30 May 2026 • Cash</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.historyAmount}>Rs. 15,000</Text>
              <View style={styles.paidBadge}>
                <Text style={styles.paidBadgeText}>Paid</Text>
              </View>
            </View>
          </View>

          {/* May 2026 */}
          <View style={[styles.historyRow, { borderBottomWidth: 0 }]}>
            <View style={styles.checkIconBox}>
              <Text style={{ fontSize: 16 }}>✅</Text>
            </View>
            <View style={styles.historyDetails}>
              <Text style={styles.historyMonth}>May 2026</Text>
              <Text style={styles.historyMeta}>1 May 2026 • Bank Transfer</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.historyAmount}>Rs. 15,000</Text>
              <View style={styles.paidBadge}>
                <Text style={styles.paidBadgeText}>Paid</Text>
              </View>
            </View>
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

        <TouchableOpacity style={styles.tabItem} activeOpacity={0.8}>
          <View style={styles.activeTabHighlight}>
            <Text style={{ fontSize: 18 }}>💳</Text>
          </View>
          <Text style={[styles.tabLabel, styles.activeTabLabel]}>Pay</Text>
        </TouchableOpacity>

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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 110,
  },
  headerRow: {
    marginBottom: 20,
  },
  subHeaderTitle: {
    fontSize: 13,
    color: "#7F8C8D",
    fontWeight: "600",
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: "#1A252C",
    marginTop: 2,
  },
  dueCard: {
    backgroundColor: "#1A252C",
    borderRadius: 28,
    padding: 22,
    marginBottom: 24,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  monthLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: "#7F8C8D",
    letterSpacing: 1,
  },
  unpaidBadge: {
    backgroundColor: "rgba(255, 59, 48, 0.2)",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FF3B30",
  },
  unpaidBadgeText: {
    color: "#FF3B30",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  amountText: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFFFFF",
    marginVertical: 6,
    fontFamily: "monospace",
  },
  dueDateText: {
    fontSize: 12,
    color: "#A0AAB0",
    fontWeight: "600",
    marginBottom: 20,
  },
  childrenBreakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 18,
    padding: 12,
    marginBottom: 20,
  },
  childFeeBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatarBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 16,
  },
  childName: {
    fontSize: 13,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  childAmount: {
    fontSize: 11,
    color: "#A0AAB0",
    fontWeight: "600",
  },
  uploadSlipBtn: {
    backgroundColor: "#F39C12",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadBtnText: {
    fontSize: 15,
    fontWeight: "900",
    color: "#1A252C",
  },
  successNotice: {
    backgroundColor: "rgba(16, 185, 129, 0.2)",
    borderRadius: 12,
    padding: 10,
    marginTop: 12,
    alignItems: "center",
  },
  successNoticeText: {
    color: "#10B981",
    fontSize: 12,
    fontWeight: "800",
  },
  sectionHeaderTitle: {
    fontSize: 11,
    fontWeight: "900",
    color: "#F39C12",
    letterSpacing: 1,
    marginBottom: 10,
  },
  acceptedBanksCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  bankPill: {
    backgroundColor: "#FAF7F2",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 12,
  },
  bankRedIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FF3B30",
  },
  bankName: {
    fontSize: 14,
    fontWeight: "900",
    color: "#1A252C",
  },
  bankStatus: {
    fontSize: 10,
    color: "#7F8C8D",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#1A252C",
    marginBottom: 14,
  },
  historyContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  historyRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  checkIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#E6F9F0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  historyDetails: {
    flex: 1,
  },
  historyMonth: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1A252C",
  },
  historyMeta: {
    fontSize: 11,
    color: "#7F8C8D",
    marginTop: 2,
  },
  historyAmount: {
    fontSize: 14,
    fontWeight: "900",
    color: "#1A252C",
    fontFamily: "monospace",
  },
  paidBadge: {
    backgroundColor: "#E6F9F0",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginTop: 3,
  },
  paidBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#10B981",
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