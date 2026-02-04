import i18n from "i18next";
import {  initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      navbar: {
        home: "Home",
        products: "Products",
        categories: "Categories",
        login: "Login",
        register: "Register",
        cart: "Cart",
        logout: "Logout",
      },
      footer: {
        about: "About",
        contact: "Contact",
        terms: "Terms & Conditions",
        rights: "All rights reserved.",
      },
      auth: {
        email: "Email",
        password: "Password",
        name: "Name",
        login: "Login",
        register: "Register",
        forgotPassword: "Forgot Password?",
        resetPassword: "Reset Password",
        submit: "Submit",
        cancel: "Cancel",
      },
      home: {
        welcome: "Welcome to our store",
        featured: "Featured products",
      },
      products: {
        addToCart: "Add to Cart",
        viewDetails: "View Details",
        price: "Price",
        category: "Category",
        searchPlaceholder: "Search products...",
      },
      cart: {
        title: "Your Cart",
        empty: "Your cart is empty",
        checkout: "Checkout",
        total: "Total",
        quantity: "Quantity",
        remove: "Remove",
      },
      productCard: {
        outOfStock: "Out of stock",
      },
      categories: {
        all: "All Categories",
      },
      validation: {
        required: "This field is required",
        invalidEmail: "Invalid email address",
        passwordMin: "Password must be at least {{min}} characters",
      },
      buttons: {
        add: "Add",
        update: "Update",
        remove: "Remove",
        loadMore: "Load more",
      },
    },
  },
  ar: {
    translation: {
      navbar: {
        home: "الرئيسية",
        products: "المنتجات",
        categories: "التصنيفات",
        login: "تسجيل دخول",
        register: "إنشاء حساب",
        cart: "السلة",
        logout: "تسجيل خروج",
      },
      footer: {
        about: "من نحن",
        contact: "اتصل بنا",
        terms: "الشروط والأحكام",
        rights: "جميع الحقوق محفوظة.",
      },
      auth: {
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        name: "الاسم",
        login: "تسجيل الدخول",
        register: "إنشاء حساب",
        forgotPassword: "نسيت كلمة المرور؟",
        resetPassword: "إعادة تعيين كلمة المرور",
        submit: "إرسال",
        cancel: "إلغاء",
      },
      home: {
        welcome: "مرحباً بكم في متجرنا",
        featured: "المنتجات المميزة",
      },
      products: {
        addToCart: "أضف إلى السلة",
        viewDetails: "عرض التفاصيل",
        price: "السعر",
        category: "التصنيف",
        searchPlaceholder: "ابحث عن المنتجات...",
      },
      cart: {
        title: "سلتك",
        empty: "السلة فارغة",
        checkout: "إتمام الشراء",
        total: "الإجمالي",
        quantity: "الكمية",
        remove: "إزالة",
      },
      productCard: {
        outOfStock: "غير متوفر",
      },
      categories: {
        all: "جميع التصنيفات",
      },
      validation: {
        required: "هذا الحقل مطلوب",
        invalidEmail: "البريد الإلكتروني غير صالح",
        passwordMin: "يجب أن تكون كلمة المرور على الأقل {{min}} حرفًا",
      },
      buttons: {
        add: "إضافة",
        update: "تحديث",
        remove: "حذف",
        loadMore: "تحميل المزيد",
      },
    },
  },
};

const savedLang =
  (typeof localStorage !== "undefined" && localStorage.getItem("lang")) ||
  (typeof navigator !== "undefined" &&
  navigator.language &&
  navigator.language.startsWith("ar")
    ? "ar"
    : "en");

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: savedLang,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspense: false,
    },
  });

// set direction and lang attr on language change
i18n.on("languageChanged", (lng) => {
  try {
    document.documentElement.lang = lng;
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  } catch (e) {
    console.error("Error setting document language attributes:", e);
  }
  if (typeof localStorage !== "undefined") localStorage.setItem("lang", lng);
});

export const setLanguage = (lng) => i18n.changeLanguage(lng);
export default i18n;
