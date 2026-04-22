import { useOutletContext } from "react-router-dom";
import ProfileInfo from "../../components/Profile/ProfileInfo";

export default function ProfileInfoPage() {
  const { profile, i18n } = useOutletContext();

  return <ProfileInfo profile={profile} i18n={i18n} />;
}
