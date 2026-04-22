import i18n from "i18next";
import { initReactI18next } from "react-i18next";

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
        brand: "E-commerce",
        brandName: "ابرهيم",
        welcome: "Welcome",
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
        sendReset: "Send Reset Code",
        resetCode: "Reset Code",
        newPassword: "New Password",
        confirmPassword: "Confirm Password",
      },
      home: {
        welcome: "Welcome to our store",
        featured: "Featured products",
        name: "ابرهيم ابوهنية",
        studentYear: "Fourth-year Computer Science student",
        passion:
          "Passionate about learning modern web technologies and software development.",
        schoolNote: "This is a React project developed for Al-Maaref Academy.",
        heroBadge: "Curated picks for every style",
        heroTitle: "Discover products your customers will actually want",
        heroSubtitle:
          "Browse trending categories, explore featured products, and move quickly from discovery to checkout with a polished shopping experience.",
        heroCardText:
          "A clean storefront built to help shoppers move from browsing to checkout without friction.",
        featuredBadge: "Store overview",
        featuredTitle: "Everything you need in one place",
        categoriesSection: "Browse by category",
        categoriesHint: "Start from the collection that fits the mood.",
        productsSection: "Featured products",
        productsHint: "A quick look at the most recent highlights.",
        viewAllProducts: "View all products",
        exploreCategories: "Explore categories",
        fastCheckout: "Fast checkout",
        securePayments: "Secure payments",
        bestOffers: "Best offers",
        categoryCard: "Open collection",
      },
      products: {
        addToCart: "Add to Cart",
        viewDetails: "View Details",
        price: "Price",
        category: "Category",
        searchPlaceholder: "Search products...",
        failedCategoryLoad: "Failed to load products for this category",
        categoryWithId: "Category {{id}}",
        failedDetails: "Failed to load product details",
        notFound: "Product not found.",
      },
      cart: {
        title: "Your Cart",
        empty: "Your cart is empty",
        checkout: "Checkout",
        total: "Total",
        quantity: "Quantity",
        remove: "Remove",
        loading: "Loading...",
        error: "Error loading cart",
        product: "Product",
        subtotal: "Subtotal",
        actions: "Actions",
        removing: "Removing...",
        continue: "continue shopping",
      },
      checkout: {
        title: "Checkout",
        paymentMethod: "Payment Method",
        cash: "Cash",
        visa: "Visa",
        payNow: "Pay Now",
        backToCart: "Back to Cart",
        summary: "Order Summary",
        processing: "Processing...",
        success: "Checkout successful! Your order has been placed.",
        error: "Checkout failed. Please try again.",
      },
      productCard: {
        outOfStock: "Out of stock",
        details: "Details",
      },
      categories: {
        all: "All Categories",
        title: "Categories",
        failedLoad: "Failed to load categories",
        empty: "No categories found.",
      },
      validation: {
        required: "This field is required",
        invalidEmail: "Invalid email address",
        passwordMin: "Password must be at least {{min}} characters",
      },
      register: {
        fullName: "Full Name",
        userName: "User Name",
        phoneNumber: "Phone Number",
      },
      buttons: {
        add: "Add",
        update: "Update",
        remove: "Remove",
        loadMore: "Load more",
        back: "Back",
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
        brand: "متجر إلكتروني",
        brandName: "ابرهيم",
        welcome: "مرحبا",
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
        sendReset: "إرسال رمز إعادة التعيين",
        resetCode: "رمز إعادة التعيين",
        newPassword: "كلمة المرور الجديدة",
        confirmPassword: "تأكيد كلمة المرور",
      },
      home: {
        welcome: "مرحباً بكم في متجرنا",
        featured: "المنتجات المميزة",
        name: "ابرهيم ابوهنية",
        studentYear: "طالب سنة رابعة بكالوريوس علوم الحاسوب",
        passion: "شغوف بتعلم تقنيات الويب الحديثة وتطوير البرمجيات.",
        schoolNote: "هذا مشروع React مطور لأكاديمية المعرفة.",
        heroBadge: "اختيارات مرتبة لكل ذوق",
        heroTitle: "اكتشف المنتجات التي سيبحث عنها عملاؤك فعلاً",
        heroSubtitle:
          "تصفح الفئات الرائجة، استعرض المنتجات المميزة، وانتقل بسرعة من الاكتشاف إلى الدفع بتجربة تسوق أنيقة ومريحة.",
        heroCardText:
          "واجهة متجر نظيفة تساعد المتسوق على الانتقال من التصفح إلى الدفع بدون تعقيد.",
        featuredBadge: "نظرة عامة على المتجر",
        featuredTitle: "كل ما تحتاجه في مكان واحد",
        categoriesSection: "تصفح حسب الفئة",
        categoriesHint: "ابدأ من المجموعة المناسبة للمزاج.",
        productsSection: "منتجات مميزة",
        productsHint: "لمحة سريعة على أحدث المنتجات.",
        viewAllProducts: "عرض كل المنتجات",
        exploreCategories: "استكشاف الفئات",
        fastCheckout: "دفع سريع",
        securePayments: "دفع آمن",
        bestOffers: "أفضل العروض",
        categoryCard: "افتح المجموعة",
      },
      products: {
        addToCart: "أضف إلى السلة",
        viewDetails: "عرض التفاصيل",
        price: "السعر",
        category: "التصنيف",
        searchPlaceholder: "ابحث عن المنتجات...",
        failedCategoryLoad: "فشل في تحميل المنتجات لهذه الفئة",
        categoryWithId: "التصنيف {{id}}",
        failedDetails: "فشل في تحميل تفاصيل المنتج",
        notFound: "المنتج غير موجود.",
      },
      cart: {
        title: "سلتك",
        empty: "السلة فارغة",
        checkout: "إتمام الشراء",
        total: "الإجمالي",
        quantity: "الكمية",
        remove: "إزالة",
        loading: "جاري التحميل...",
        error: "حدث خطأ أثناء تحميل السلة",
        product: "المنتج",
        subtotal: "المجموع الجزئي",
        actions: "الإجراءات",
        removing: "جارٍ الحذف...",
        continue: "متابعة التسوق",
      },
      checkout: {
        title: "إتمام الشراء",
        paymentMethod: "طريقة الدفع",
        cash: "كاش",
        visa: "فيزا",
        payNow: "ادفع الآن",
        backToCart: "العودة إلى السلة",
        summary: "ملخص الطلب",
        processing: "جاري المعالجة...",
        success: "تم الشراء بنجاح! تم تسجيل طلبك.",
        error: "فشل الشراء. حاول مرة أخرى.",
      },
      productCard: {
        outOfStock: "غير متوفر",
        details: "التفاصيل",
      },
      categories: {
        all: "جميع التصنيفات",
        title: "التصنيفات",
        failedLoad: "فشل في تحميل التصنيفات",
        empty: "لا توجد تصنيفات.",
      },
      validation: {
        required: "هذا الحقل مطلوب",
        invalidEmail: "البريد الإلكتروني غير صالح",
        passwordMin: "يجب أن تكون كلمة المرور على الأقل {{min}} حرفًا",
      },
      register: {
        fullName: "الاسم الكامل",
        userName: "اسم المستخدم",
        phoneNumber: "رقم الهاتف",
      },
      buttons: {
        add: "إضافة",
        update: "تحديث",
        remove: "حذف",
        loadMore: "تحميل المزيد",
        back: "عودة",
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
