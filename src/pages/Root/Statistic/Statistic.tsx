import { Flex, Typography } from "antd";
import { AccountDistributionChart } from "./Partials/AccountDistributionChart";
import { DailyRevenueChart } from "./Partials/DailyRevenueChart";
import MonthlyRevenueChart from "./Partials/MonthlyRevenueChart/MonthlyRevenueChart";
import { Overview } from "./Partials/Overview";

// ---- Import useLanguage để lấy hàm t(...)
import { useLanguage } from "../../../contexts/LanguageContext";

const { Title } = Typography;

const StatisticPage = () => {
  // Lấy hàm t(...) từ context
  const { t } = useLanguage();

  return (
    <Flex vertical gap={32}>
      <Flex vertical gap={24} style={{ width: "100%" }}>
        <Flex justify="center" align="center">
          {/* Sử dụng t("statistic.title") thay cho chuỗi tĩnh */}
          <Title level={4}>{t("statistic.title")}</Title>
        </Flex>
        <Overview />
      </Flex>

      <Flex justify="space-between" align="stretch" gap={32}>
        <DailyRevenueChart />
        <MonthlyRevenueChart />
      </Flex>

      <AccountDistributionChart />
    </Flex>
  );
};

export default StatisticPage;
