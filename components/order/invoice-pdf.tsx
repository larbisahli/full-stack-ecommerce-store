import { useSettings } from '@contexts/settings.context';
import { usePrice } from '@hooks/use-price';
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View
} from '@react-pdf/renderer';
import { formatAddress } from '@utils/format-address';
import dayjs from 'dayjs';

const ProductItem = ({ product, index }) => {
  const {
    currency: { code }
  } = useSettings();

  const price = usePrice({
    amount: Number(product?.unitPrice),
    locale: 'us',
    currencyCode: code
  });

  return (
    <View style={styles.tbody}>
      <View style={styles.tr}>
        <Text style={[styles.td, { width: 15, textAlign: 'center' }]}>
          {index + 1}
        </Text>
        <Text style={[styles.td, { width: '100%', flex: 2 }]}>
          {product.name}
        </Text>
        <Text style={[styles.td, { width: 100, flex: 1, textAlign: 'right' }]}>
          {price}
        </Text>
        <Text
          style={[styles.td, { flex: 1 }]}
        >{product.option}</Text>
        <Text
          style={[styles.td, {  width: 100,flex: 1 }]}
        >{`Quantity: ${product.quantity}`}</Text>
      </View>
    </View>
  );
};

export default function InvoicePdf({ order }) {
  const {
    currency: { code }
  } = useSettings();

  const total = usePrice({
    amount: Number(order?.total),
    locale: 'us',
    currencyCode: code
  });

  return (
    <Document>
      <Page size="A4">
        <View style={styles.container}>
          {/* Address */}
          <View style={styles.addressWrapper}>
            <View style={styles.section}>
              <Text style={[styles.addressText, { marginBottom: 20 }]}>
                Order No:{' '}
                <Text style={{ color: '#374151', fontFamily: 'Lato Bold' }}>
                  {order.id}
                </Text>
              </Text>
              <Text
                style={[
                  styles.addressText,
                  { color: '#374151', fontFamily: 'Lato Bold', fontSize: 12 }
                ]}
              >
                {order?.fullName}
              </Text>
              <Text style={styles.addressText}>{`+${order?.phoneNumber}`}</Text>
              <Text style={styles.addressText}>
                {formatAddress(order?.addressLine1)}
              </Text>
            </View>

            <View style={[styles.section]}>
              <Text style={[styles.addressTextRight, { marginBottom: 20 }]}>
                Date: {dayjs().format('D MMMM, YYYY')}
              </Text>
              <Text
                style={[
                  styles.addressTextRight,
                  { color: '#374151', fontFamily: 'Lato Bold', fontSize: 12 }
                ]}
              >
                Pickbazar
              </Text>
              <Text style={styles.addressTextRight}>pickbazar@dummy.com</Text>
              <Text style={styles.addressTextRight}>+123456789</Text>
              <Text style={styles.addressTextRight}>
                21 Jump Street, CA, California
              </Text>
            </View>
          </View>

          {/* Table */}
          <View style={styles.orderTable}>
            {(order?.products ?? [])?.map((product, index) => (
              <ProductItem key={product.id} product={product} index={index} />
            ))}
          </View>

          {/* Border */}
          <View style={styles.singleBorder} />

          {/* Total */}
          <View style={styles.totalCountWrapper}>
            <View style={styles.totalCountRow}>
              <Text
                style={[
                  styles.totalCountCell,
                  { fontSize: 12, fontFamily: 'Lato Bold' }
                ]}
              >
                Total
              </Text>
              <Text
                style={[
                  styles.totalCountCell,
                  { fontSize: 12, fontFamily: 'Lato Bold' }
                ]}
              >
                {total}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

Font.register({
  family: 'Lato',
  src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`
});

Font.register({
  family: 'Lato Bold',
  src: `https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf`
});

const styles = StyleSheet.create({
  container: {
    maxWidth: 600,
    flex: 1,
    margin: '50pt',
    fontFamily: 'Lato'
  },

  addressWrapper: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 30
  },

  section: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column'
  },

  addressText: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: 400,
    marginBottom: 5
  },
  addressTextRight: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: 400,
    marginBottom: 5,
    textAlign: 'right'
  },

  orderTable: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },

  thead: {
    width: '100%',
    backgroundColor: '#F3F4F6',
    display: 'flex',
    flexDirection: 'row'
  },

  th: {
    fontSize: 11,
    fontFamily: 'Lato Bold',
    color: '#374151',
    padding: '12pt 16pt',
    borderRightWidth: 1,
    borderRightColor: '#ffffff',
    borderRightStyle: 'solid'
  },

  tbody: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },

  tr: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
  },

  td: {
    fontSize: 11,
    color: '#6B7280',
    padding: '12pt 16pt',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    borderTopStyle: 'solid',
    borderRightWidth: 1,
    borderRightColor: '#ffffff',
    borderRightStyle: 'solid'
  },

  singleBorder: {
    width: '50%',
    display: 'flex',
    marginLeft: 'auto',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    borderTopStyle: 'solid',
    marginBottom: 2
  },

  totalCountWrapper: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 'auto',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    borderTopStyle: 'solid'
  },

  totalCountRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  totalCountCell: {
    fontSize: 11,
    color: '#6B7280',
    padding: '8pt 16pt 2pt'
  }
});
