import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, useSearchParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/ProductComponent/ProductCard";

const DEFAULT_FILTERS = {
  page: 1,
  limit: 6,
  sortBy: "price",
  ascending: false,
};

export default function Products() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const labels = {
    filters: i18n.language === "ar" ? "فلترة المنتجات" : "Product Filters",
    sortBy: i18n.language === "ar" ? "ترتيب حسب" : "Sort By",
    order: i18n.language === "ar" ? "اتجاه الترتيب" : "Order",
    pageSize: i18n.language === "ar" ? "عدد العناصر" : "Page Size",
    reset: i18n.language === "ar" ? "إعادة الضبط" : "Reset",
    totalResults:
      i18n.language === "ar" ? "عدد النتائج" : "Total Results",
    currentPage:
      i18n.language === "ar" ? "الصفحة الحالية" : "Current Page",
    price: i18n.language === "ar" ? "السعر" : "Price",
    rating: i18n.language === "ar" ? "التقييم" : "Rating",
    name: i18n.language === "ar" ? "الاسم" : "Name",
    ascending: i18n.language === "ar" ? "تصاعدي" : "Ascending",
    descending: i18n.language === "ar" ? "تنازلي" : "Descending",
  };

  const filters = useMemo(() => {
    const pageValue = Number(searchParams.get("page"));
    const limitValue = Number(searchParams.get("limit"));
    const ascendingValue = searchParams.get("ascending");

    return {
      page: Number.isFinite(pageValue) && pageValue > 0 ? pageValue : DEFAULT_FILTERS.page,
      limit:
        Number.isFinite(limitValue) && limitValue > 0
          ? limitValue
          : DEFAULT_FILTERS.limit,
      sortBy: searchParams.get("sortBy") || DEFAULT_FILTERS.sortBy,
      ascending:
        ascendingValue === null
          ? DEFAULT_FILTERS.ascending
          : ascendingValue === "true",
    };
  }, [searchParams]);

  const { data = [], meta, isLoading, isError } = useProducts(filters);

  const pageCount = Math.max(
    1,
    Math.ceil((meta?.totalCount || 0) / Math.max(meta?.limit || filters.limit, 1)),
  );

  const updateFilters = (nextValues) => {
    const mergedFilters = {
      ...filters,
      ...nextValues,
    };

    const nextSearchParams = new URLSearchParams();
    nextSearchParams.set("page", String(mergedFilters.page));
    nextSearchParams.set("limit", String(mergedFilters.limit));
    nextSearchParams.set("sortBy", mergedFilters.sortBy);
    nextSearchParams.set("ascending", String(mergedFilters.ascending));
    setSearchParams(nextSearchParams);
  };

  if (isLoading) {
    return (
      <Box p={3} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box p={3}>
        <Alert severity="error">{t("categories.failedLoad")}</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 3 } }}>
      <Stack spacing={3}>
        <Stack
          spacing={1}
          sx={{ textAlign: { xs: "center", md: "start" } }}
        >
          <Typography
            variant="overline"
            color="primary.main"
            sx={{ fontWeight: 800 }}
          >
            Store
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            {t("navbar.products")}
          </Typography>
        </Stack>

        <Paper
          sx={{
            p: { xs: 2, md: 2.5 },
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={2}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", lg: "center" }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                {labels.filters}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {labels.totalResults}: {meta.totalCount}
                {"  "}•{"  "}
                {labels.currentPage}: {meta.page}/{pageCount}
              </Typography>
            </Box>

            <Button
              variant="outlined"
              onClick={() => updateFilters(DEFAULT_FILTERS)}
              sx={{ alignSelf: { xs: "stretch", lg: "auto" } }}
            >
              {labels.reset}
            </Button>
          </Stack>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="products-sortBy-label">{labels.sortBy}</InputLabel>
                <Select
                  labelId="products-sortBy-label"
                  value={filters.sortBy}
                  label={labels.sortBy}
                  onChange={(event) =>
                    updateFilters({
                      sortBy: event.target.value,
                      page: 1,
                    })
                  }
                >
                  <MenuItem value="price">{labels.price}</MenuItem>
                  <MenuItem value="rate">{labels.rating}</MenuItem>
                  <MenuItem value="name">{labels.name}</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="products-order-label">{labels.order}</InputLabel>
                <Select
                  labelId="products-order-label"
                  value={String(filters.ascending)}
                  label={labels.order}
                  onChange={(event) =>
                    updateFilters({
                      ascending: event.target.value === "true",
                      page: 1,
                    })
                  }
                >
                  <MenuItem value="true">{labels.ascending}</MenuItem>
                  <MenuItem value="false">{labels.descending}</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="products-limit-label">{labels.pageSize}</InputLabel>
                <Select
                  labelId="products-limit-label"
                  value={String(filters.limit)}
                  label={labels.pageSize}
                  onChange={(event) =>
                    updateFilters({
                      limit: Number(event.target.value),
                      page: 1,
                    })
                  }
                >
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="6">6</MenuItem>
                  <MenuItem value="9">9</MenuItem>
                  <MenuItem value="12">12</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {data.length === 0 ? (
          <Alert severity="info">{t("products.notFound")}</Alert>
        ) : (
          <Grid container justifyContent="center" spacing={3}>
            {data.map((product) => (
              <Grid
                item
                key={product.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <ProductCard
                  product={product}
                  onDetails={(id) => id && navigate(`/products/${id}`)}
                />
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ display: "flex", justifyContent: "center", pt: 1 }}>
          <Pagination
            color="primary"
            page={filters.page}
            count={pageCount}
            onChange={(_, value) => updateFilters({ page: value })}
          />
        </Box>
      </Stack>
    </Container>
  );
}
