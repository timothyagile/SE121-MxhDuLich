import React, { useEffect, useState, useContext } from 'react';
import { 
  StyleSheet, 
  View, 
  Dimensions, 
  TouchableOpacity, 
  Text, 
  Image,
  FlatList,
  SafeAreaView,
  StatusBar,
  RefreshControl,
  TextInput,
  ActivityIndicator,
  Alert,
  Clipboard
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../store/auth-context';
import { API_BASE_URL } from '../constants/config';
import { GlobalStyles } from '../constants/Styles';

const { width } = Dimensions.get('window');

// Interface định nghĩa cấu trúc của voucher
interface Voucher {
  _id: string;
  code: string;
  name: string;
  description: string;
  type: 'PERCENT' | 'AMOUNT';
  discount: {
    amount: number;
    type: string | null;
  };
  value: number;
  maxDiscount: number | null;
  minOderValue: number;
  startDate: string;
  endDate: string;
  usageLimit: number | null;
  usageCount: number;
  isActive: boolean;
  status: 'active' | 'EXPIRED' | 'DISABLED';
  applyFor: 'ALL' | 'ROOM' | 'SERVICE';
  locationIds: string[];
  createdAt: string;
}

export default function VoucherScreen() {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  
  // States
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [filteredVouchers, setFilteredVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  
  // Tabs cho phân loại voucher
  const tabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'active', label: 'Đang hoạt động' },
    { id: 'expiring', label: 'Sắp hết hạn' },
  ];

  // Hàm lấy tất cả voucher
  const fetchVouchers = async () => {
    try {
      setLoading(true);
      
      const response = await fetch(`${API_BASE_URL}/voucher/getall`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Không thể tải voucher');
      }

      const responseData = await response.json();
      
      if (responseData.isSuccess) {
        const voucherData = responseData.data || [];
        setVouchers(voucherData);
        setFilteredVouchers(voucherData);
      } else {
        console.error('Lỗi khi tải voucher:', responseData.message || responseData.error);
      }
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      Alert.alert('Lỗi', 'Không thể tải danh sách voucher. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Hàm tìm kiếm và filter voucher
  const filterVouchers = () => {
    let filtered = [...vouchers];
    
    // Tìm kiếm theo tên hoặc mã
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(v => 
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        v.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Lọc theo tab đang chọn
    if (selectedFilter === 'active') {
      const now = new Date();
      filtered = filtered.filter(v => 
        v.status == 'active' && 
        new Date(v.startDate) <= now && 
        new Date(v.endDate) >= now
      );
    } else if (selectedFilter === 'expiring') {
      const now = new Date();
      const oneWeekLater = new Date();
      oneWeekLater.setDate(now.getDate() + 7);
      
      filtered = filtered.filter(v => 
        v.isActive && 
        new Date(v.startDate) <= now && 
        new Date(v.endDate) >= now &&
        new Date(v.endDate) <= oneWeekLater
      );
    }
    
    setFilteredVouchers(filtered);
  };

  // Sao chép mã voucher
  const copyVoucherCode = (code: string) => {
    Clipboard.setString(code);
    Alert.alert('Thành công', 'Đã sao chép mã voucher vào bộ nhớ');
  };

  // Hiển thị popup chi tiết voucher
  const showVoucherDetails = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    // Ở đây bạn có thể thêm modal hiển thị chi tiết voucher
    // Hoặc điều hướng đến màn hình chi tiết voucher
    Alert.alert(
      voucher.name,
      `${voucher.description}\n\nMã: ${voucher.code}\nGiá trị: ${voucher.discount.type === 'percentage' ? voucher.discount.amount + '%' : formatter.format(voucher.discount.amount)}\nĐơn hàng tối thiểu: ${formatter.format(voucher.minOderValue)}\nHiệu lực đến: ${new Date(voucher.endDate).toLocaleDateString('vi-VN')}`,
      [
        { text: 'Đóng', style: 'cancel' },
        { text: 'Sao chép mã', onPress: () => copyVoucherCode(voucher.code) }
      ]
    );
  };

  // Format tiền tệ
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  // Side Effects
  useEffect(() => {
    fetchVouchers();
  }, []);

  useEffect(() => {
    filterVouchers();
  }, [searchQuery, selectedFilter, vouchers]);

  // Refresh control
  const onRefresh = () => {
    setRefreshing(true);
    fetchVouchers();
  };

  // Render item cho FlatList
  const renderVoucherItem = ({ item }: { item: Voucher }) => {
    const isExpired = new Date(item.endDate) < new Date();
    const isExpiringSoon = !isExpired && (new Date(item.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24) <= 7;
    
    return (
      <TouchableOpacity 
        style={[styles.voucherCard, isExpired && styles.expiredVoucher]} 
        onPress={() => showVoucherDetails(item)}
        disabled={isExpired}
      >
        <View style={styles.voucherLeftPart}>
          <View style={styles.voucherIconContainer}>
            {item.discount.type === 'percentage' ? (
              <Text style={styles.voucherValue}>{item.discount.amount}%</Text>
            ) : (
              <Text style={styles.voucherValue}>{formatter.format(item.discount.amount).replace('₫', '')}</Text>
            )}
          </View>
        </View>
        
        <View style={styles.voucherDivider}>
          {[...Array(8)].map((_, i) => (
            <View key={i} style={styles.voucherCircle} />
          ))}
        </View>
        
        <View style={styles.voucherRightPart}>
          <Text style={styles.voucherName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.voucherDescription} numberOfLines={2}>{item.description}</Text>
          
          <View style={styles.voucherFooter}>
            <Text style={styles.voucherValidUntil}>
              {isExpired ? 'Đã hết hạn' : `HSD: ${new Date(item.endDate).toLocaleDateString('vi-VN')}`}
            </Text>
            
            {isExpiringSoon && !isExpired && (
              <View style={styles.expiringSoonTag}>
                <Text style={styles.expiringSoonText}>Sắp hết hạn</Text>
              </View>
            )}
            
            <TouchableOpacity 
              style={styles.copyButton}
              onPress={() => copyVoucherCode(item.code)}
            >
              <Ionicons name="copy-outline" size={16} color={GlobalStyles.colors.primary500} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Render
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Voucher của bạn</Text>
        <View style={{ width: 24 }} />
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm voucher..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
      
      {/* Filter Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              selectedFilter === tab.id && styles.selectedTabButton
            ]}
            onPress={() => setSelectedFilter(tab.id)}
          >
            <Text style={[
              styles.tabText,
              selectedFilter === tab.id && styles.selectedTabText
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Voucher List */}
      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={GlobalStyles.colors.primary500} />
        </View>
      ) : filteredVouchers.length > 0 ? (
        <FlatList
          data={filteredVouchers}
          renderItem={renderVoucherItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.vouchersList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[GlobalStyles.colors.primary500]}
            />
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          {/* <Image
            source={require('../assets/icons/default.png')}
            style={styles.emptyImage}
            resizeMode="contain"
          /> */}
          <Text style={styles.emptyText}>
            {searchQuery
              ? 'Không tìm thấy voucher phù hợp'
              : 'Bạn chưa có voucher nào'}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  selectedTabButton: {
    backgroundColor: GlobalStyles.colors.primary500,
  },
  tabText: {
    color: '#666',
    fontWeight: '500',
  },
  selectedTabText: {
    color: '#fff',
  },
  vouchersList: {
    padding: 16,
  },
  voucherCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  voucherLeftPart: {
    width: 90,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D99FF',
  },
  voucherIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  voucherValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500,
    textAlign: 'center',
  },
  voucherDivider: {
    width: 1,
    height: '100%',
    position: 'relative',
    backgroundColor: '#f0f0f0',
  },
  voucherCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#f8f8f8',
    position: 'absolute',
    left: -3.5,
    marginTop: 10,
  },
  voucherRightPart: {
    flex: 1,
    padding: 12,
  },
  voucherName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  voucherDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  voucherFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  voucherValidUntil: {
    fontSize: 10,
    color: '#999',
    flex: 1,
  },
  expiringSoonTag: {
    backgroundColor: '#FFECB3',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  expiringSoonText: {
    fontSize: 10,
    color: '#FF8F00',
    fontWeight: 'bold',
  },
  copyButton: {
    padding: 4,
  },
  expiredVoucher: {
    opacity: 0.6,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyImage: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});



