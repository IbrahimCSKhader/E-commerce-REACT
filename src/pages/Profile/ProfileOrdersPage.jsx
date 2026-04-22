import { useOutletContext } from "react-router-dom";
import ProfileOrders from "../../components/Profile/ProfileOrders";

export default function ProfileOrdersPage() {
  const { orders, i18n } = useOutletContext();

  return <ProfileOrders orders={orders} i18n={i18n} />;
}
