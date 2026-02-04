import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  // const {userName}= useContext(UserContext );
  return (
    <footer>
      <p>&copy; 2025 {t("footer.rights")}</p>
      <p>{t("footer.contact")}</p>
    </footer>
  );
}
