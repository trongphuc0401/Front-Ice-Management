import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Flex, List, Typography } from "antd";
import constantRootQueryKeys from "../../../../constants/queryKey/root";
import rootService from "../../../../service/Root/RootService";
import { ISubscriptionEntity } from "../../../../types/entity/subscription";
import { ItemSubscription } from "./Partials/ItemSubscription";
import { RedoOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

// ---- Import useLanguage để dùng t(...) ----
import { useLanguage } from "../../../../contexts/LanguageContext";

const { Title } = Typography;

const SubscriptionListPage = () => {
  const queryClient = useQueryClient();

  // Lấy hàm t từ context
  const { t } = useLanguage();

  const { data, isFetching } = useQuery({
    queryKey: [constantRootQueryKeys.subscription.getAllSubscription],
    queryFn: async () => {
      try {
        const response = await rootService.subscription.getAllSubscription();
        const responseData = response.data;
        return responseData;
      } catch (error) {
        console.log("error: ", error);
      }
    },
  });

  const handlePrefetchData = async () => {
    return toast.promise(
      queryClient.refetchQueries({
        queryKey: [constantRootQueryKeys.subscription.getAllSubscription],
      }),
      {
        pending: t("subscriptionListPage.toastRefresh.pending"),
        success: t("subscriptionListPage.toastRefresh.success"),
        error: t("subscriptionListPage.toastRefresh.error"),
      }
    );
  };

  return (
    <Flex vertical gap={32}>
      <Flex
        justify="space-between"
        align="center"
        style={{
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0px 4px 24px 0px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div>
          <Title level={3} style={{ margin: "0" }}>
            {t("subscriptionListPage.title")}
          </Title>
        </div>
        <div>
          <Flex justify="flex-end" align="stretch" gap={12}>
            <Button
              size="large"
              // Có thể đổi variant="outlined" / color="primary" thành props Antd tương đương
              // Tùy vào bạn đang dùng theme nào
              icon={<RedoOutlined />}
              onClick={() => handlePrefetchData()}
            >
              {t("subscriptionListPage.refreshButton")}
            </Button>

            {/*
            <Button
              size="large"
              icon={<FilterOutlined />}
              disabled
            >
              {t("subscriptionListPage.filterButton")}
            </Button>
            */}
          </Flex>
        </div>
      </Flex>

      <List<ISubscriptionEntity>
        loading={isFetching}
        grid={{ gutter: 16, column: 1 }}
        dataSource={data?.services[0]}
        renderItem={(subscription) => (
          <ItemSubscription subscriptionData={subscription} />
        )}
      />
    </Flex>
  );
};

export default SubscriptionListPage;
