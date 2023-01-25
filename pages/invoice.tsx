// import InvoicePdf from "@components/order/invoice-pdf";
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
// import { useOrderQuery } from "@data/order/use-order.query";
// import { PDFViewer } from "@react-pdf/renderer";
import dynamic from 'next/dynamic';

const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
  { ssr: false }
);
const InvoicePdf = dynamic(() => import('@components/ui/error-message'), {
  ssr: false
});

const InvoicePage = () => {
  // const { data, isLoading: loading, error } = useOrderQuery("1");
  const data = {
    order: {
      amount: 12,
      paid_total: 5,
      discount: 9,
      delivery_fee: 5,
      sales_tax: 3
    }
  };

  const loading = false;
  const error = null;

  if (loading) return <Loader showText={false} />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <PDFViewer style={{ width: '100vw', height: '100vh' }}>
      <InvoicePdf order={data?.order!} />
    </PDFViewer>
  );
};

export default InvoicePage;
