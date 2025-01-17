import { Card, Col, Row } from "antd";
import { formatCurrencyVND } from "../../../../../utils/helper";
import { useQuery } from "@tanstack/react-query";
import constantRootQueryKeys from "../../../../../constants/queryKey/root";
import rootService from "../../../../../service/Root/RootService";

// ---- Import useLanguage để dùng t(...) ----
import { useLanguage } from "../../../../../contexts/LanguageContext";

const Overview = () => {
  const { t } = useLanguage(); // Lấy hàm t(...)
  const { data, isFetching } = useQuery({
    queryKey: [constantRootQueryKeys.statistic.getStatisticOverview],
    queryFn: async () => {
      try {
        const response = await rootService.statistic.getStatisticOverview();
        const responseData = response.data;
        return responseData;
      } catch (error) {
        console.log("error: ", error);
      }
    },
  });

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card title={t("overview.totalRevenue")} loading={isFetching}>
          {formatCurrencyVND(data?.statistic.total as string)}{" "}
          {t("overview.currency")}
        </Card>
      </Col>
      <Col span={6}>
        <Card title={t("overview.todayRevenue")} loading={isFetching}>
          {formatCurrencyVND(data?.statistic.dailyTotal as string)}{" "}
          {t("overview.currency")}
        </Card>
      </Col>
      <Col span={6}>
        <Card title={t("overview.monthRevenue")} loading={isFetching}>
          {formatCurrencyVND(data?.statistic.monthlyTotal as string)}{" "}
          {t("overview.currency")}
        </Card>
      </Col>
      <Col span={6}>
        <Card title={t("overview.yearRevenue")} loading={isFetching}>
          {formatCurrencyVND(data?.statistic.yearlyTotal as string)}{" "}
          {t("overview.currency")}
        </Card>
      </Col>
    </Row>
  );
};

export default Overview;
