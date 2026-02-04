import { useTranslation } from "react-i18next";
export default function Footer() {
  const { t, i18n } = useTranslation();
  // const {userName}= useContext(UserContext );
  return (
    <footer>
      <p>&copy; 2025 {t("footer.rights")}</p>
      <p>{t("footer.about")}</p>
    </footer>
  );
}
