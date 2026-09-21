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

interface StudentFee {
  id: string;
  name: string;
  grade: string;
  parent: string;
  amount: string;
  status: "paid" | "unpaid";
  paymentMethod?: string;
  paidDate?: string;
  avatarBg: string;
  avatarColor: string;
}

const INITIAL_FEES: StudentFee[] = [
  {
    id: "1",
    name: "Aisha Rahman",
    grade: "Gr 4",
    parent: "Mrs. Rahman",
    amount: "LKR 4,500",
    status: "paid",
    paymentMethod: "Cash",
    paidDate: "02 Sep 2026",
    avatarBg: "#FFF3D6",
    avatarColor: "#F39C12",
  },
  {
    id: "2",
    name: "Omar Hassan",
    grade: "Gr 6",
    parent: "Mr. Hassan",
    amount: "LKR 5,000",
    status: "paid",
    paymentMethod: "Bank Transfer",
    paidDate: "01 Sep 2026",
    avatarBg: "#E8F0FE",
    avatarColor: "#3B82F6",
  },
  {
    id: "3",
    name: "Priya Mehta",
    grade: "Gr 3",
    parent: "Mrs. Mehta",
    amount: "LKR 4,500",
    status: "unpaid",
    avatarBg: "#F3E8FF",
    avatarColor: "#A855F7",
  },
  {
    id: "4",
    name: "Lucas Silva",
    grade: "Gr 5",
    parent: "Mr. Silva",
    amount: "LKR 6,000",
    status: "unpaid",
    avatarBg: "#E6F9F0",
    avatarColor: "#10B981",
  },
  {
    id: "5",
    name: "Zoe Kim",
    grade: "Gr 2",
    parent: "Mrs. Kim",
    amount: "LKR 4,500",
    status: "paid",
    paymentMethod: "Cash",
    paidDate: "03 Sep 2026",
    avatarBg: "#FEE2E2",
    avatarColor: "#EF4444",
  },
];

export default function FeesScreen() {
  const router = useRouter();
  const [feeList] = useState<StudentFee[]>(INITIAL_FEES);
  const [filter, setFilter] = useState<"all" | "paid" | "unpaid">("all");

  const paidCount = feeList.filter((item) => item.status === "paid").length;
  const unpaidCount = feeList.filter((item) => item.status === "unpaid").length;
  const totalCount = feeList.length;
  const percentagePaid = Math.round((paidCount / totalCount) * 100);

  const filteredFees = feeList.filter((item) => {
    if (filter === "paid") return item.status === "paid";
    if (filter === "unpaid") return item.status === "unpaid";
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.panelTitle}>Driver Panel</Text>
            <Text style={styles.mainTitle}>Fee Collection</Text>
          </View>
          <View style={styles.summaryBadge}>
            <Text style={styles.summaryBadgeText}>
              <Text style={styles.boldPaid}>{paidCount}</Text>/{totalCount}
            </Text>
            <Text style={styles.summaryBadgeSubText}>paid</Text>
          </View>
        </View>

        {/* Month Picker Box */}
        <View style={styles.monthSelectorCard}>
          <View style={styles.monthRow}>
            <View style={styles.monthInfo}>
              <Text style={{ fontSize: 18, marginRight: 8 }}>📅</Text>
              <Text style={styles.monthText}>September 2026</Text>
            </View>
            <TouchableOpacity style={styles.changeBtn} activeOpacity={0.7}>
              <Text style={styles.changeBtnText}>Change ▾</Text>
            </TouchableOpacity>
          </View>

          {/* Payment Collection Progress Bar */}
          <View style={styles.progressInfoRow}>
            <Text style={styles.progressLabel}>
              {paidCount} of {totalCount} paid
            </Text>
            <Text style={styles.percentageText}>{percentagePaid}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${percentagePaid}%` },
              ]}
            />
          </View>
        </View>

        {/* Filter Tab Chips (All, Paid, Unpaid) */}
        <View style={styles.filterTabsRow}>
          <TouchableOpacity
            style={[
              styles.filterChip,
              filter === "all" && styles.activeFilterChipAll,
            ]}
            onPress={() => setFilter("all")}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.filterChipText,
                filter === "all" && styles.activeFilterTextAll,
              ]}
            >
              All ({totalCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterChip,
              filter === "paid" && styles.activeFilterChipPaid,
            ]}
            onPress={() => setFilter("paid")}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.filterChipText,
                filter === "paid" && styles.activeFilterTextPaid,
              ]}
            >
              ✓ Paid ({paidCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterChip,
              filter === "unpaid" && styles.activeFilterChipUnpaid,
            ]}
            onPress={() => setFilter("unpaid")}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.filterChipText,
                filter === "unpaid" && styles.activeFilterTextUnpaid,
              ]}
            >
              ⌛ Unpaid ({unpaidCount})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Student Fee List */}
        <View style={styles.feeListContainer}>
          {filteredFees.map((student) => {
            const isPaid = student.status === "paid";

            return (
              <View
                key={student.id}
                style={[
                  styles.feeCard,
                  isPaid ? styles.paidCardBorder : styles.unpaidCardBorder,
                ]}
              >
                <View style={styles.feeCardContent}>
                  {/* Left Avatar Icon with Check/Alert Badge */}
                  <View style={styles.avatarWrapper}>
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
                        style={[
                          styles.avatarText,
                          { color: student.avatarColor },
                        ]}
                      >
                        {student.name.charAt(0)}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.statusBadgeIcon,
                        { backgroundColor: isPaid ? "#2ECC71" : "#EF4444" },
                      ]}
                    >
                      <Text style={styles.statusBadgeIconText}>
                        {isPaid ? "✓" : "!"}
                      </Text>
                    </View>
                  </View>

                  {/* Middle Student Information */}
                  <View style={styles.studentDetailsBox}>
                    <Text style={styles.studentName}>{student.name}</Text>
                    <Text style={styles.studentParentText}>
                      {student.grade} • {student.parent}
                    </Text>
                    {isPaid ? (
                      <Text style={styles.paidMethodText}>
                        {student.paymentMethod} • {student.paidDate}
                      </Text>
                    ) : null}
                  </View>

                  {/* Right Status Label and LKR Amount */}
                  <View style={styles.feeRightBox}>
                    <View
                      style={[
                        styles.paidStatusTag,
                        isPaid
                          ? styles.paidTagBg
                          : styles.unpaidTagBg,
                      ]}
                    >
                      <Text
                        style={[
                          styles.paidStatusText,
                          isPaid
                            ? styles.paidTagText
                            : styles.unpaidTagText,
                        ]}
                      >
                        {isPaid ? "PAID" : "UNPAID"}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={styles.amountPill}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.amountText}>{student.amount}</Text>
                      <Text style={{ fontSize: 12, marginLeft: 4 }}>✏️</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Navigation Tab Bar */}
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

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/student-checklist" as any)}
        >
          <Text style={styles.tabIcon}>✅</Text>
          <Text style={styles.tabLabel}>Roster</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <View style={styles.activeTabHighlight}>
            <Text style={{ fontSize: 18 }}>💰</Text>
          </View>
          <Text style={[styles.tabLabel, styles.activeTabLabel]}>Fees</Text>
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
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  panelTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#7F8C8D",
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: "#1A252C",
  },
  summaryBadge: {
    backgroundColor: "#FFF3D6",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  summaryBadgeText: {
    fontSize: 16,
    color: "#1A252C",
    fontWeight: "800",
  },
  boldPaid: {
    color: "#F39C12",
  },
  summaryBadgeSubText: {
    fontSize: 10,
    color: "#7F8C8D",
    fontWeight: "700",
  },
  monthSelectorCard: {
    backgroundColor: "#FFF8ED",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FFE0B2",
    marginBottom: 20,
  },
  monthRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  monthInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  monthText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1A252C",
  },
  changeBtn: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFE0B2",
  },
  changeBtnText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#F39C12",
  },
  progressInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 11,
    color: "#7F8C8D",
    fontWeight: "700",
  },
  percentageText: {
    fontSize: 11,
    color: "#F39C12",
    fontWeight: "900",
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EAEAEA",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#F39C12",
  },
  filterTabsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  filterChip: {
    flex: 0.31,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#7F8C8D",
  },
  activeFilterChipAll: {
    backgroundColor: "#1A252C",
    borderColor: "#1A252C",
  },
  activeFilterTextAll: {
    color: "#FFFFFF",
  },
  activeFilterChipPaid: {
    backgroundColor: "#FFFFFF",
    borderColor: "#2ECC71",
  },
  activeFilterTextPaid: {
    color: "#2ECC71",
  },
  activeFilterChipUnpaid: {
    backgroundColor: "#FFFFFF",
    borderColor: "#F39C12",
  },
  activeFilterTextUnpaid: {
    color: "#F39C12",
  },
  feeListContainer: {
    gap: 12,
  },
  feeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1.5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  paidCardBorder: {
    borderColor: "#E6F9F0",
  },
  unpaidCardBorder: {
    borderColor: "#FEE2E2",
  },
  feeCardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrapper: {
    position: "relative",
    marginRight: 12,
  },
  avatarBox: {
    width: 48,
    height: 48,
    borderRadius: 18,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "900",
  },
  statusBadgeIcon: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  statusBadgeIconText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "900",
  },
  studentDetailsBox: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1A252C",
  },
  studentParentText: {
    fontSize: 11,
    color: "#7F8C8D",
    marginVertical: 2,
  },
  paidMethodText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#10B981",
  },
  feeRightBox: {
    alignItems: "flex-end",
  },
  paidStatusTag: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 6,
  },
  paidTagBg: {
    backgroundColor: "#E6F9F0",
  },
  unpaidTagBg: {
    backgroundColor: "#FEE2E2",
  },
  paidStatusText: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  paidTagText: {
    color: "#10B981",
  },
  unpaidTagText: {
    color: "#EF4444",
  },
  amountPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  amountText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#7F8C8D",
    fontFamily: "monospace",
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