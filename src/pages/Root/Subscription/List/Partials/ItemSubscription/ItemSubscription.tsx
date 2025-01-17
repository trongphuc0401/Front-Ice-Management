import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Card,
  Descriptions,
  Flex,
  Input,
  InputProps,
  List,
  Modal,
  Typography,
} from "antd";
import { FC, useState } from "react";
import { toast } from "react-toastify";
import mutationKey from "../../../../../../constants/mutation";
import constantRootQueryKeys from "../../../../../../constants/queryKey/root";
import rootService from "../../../../../../service/Root/RootService";
import { ISubscriptionEntity } from "../../../../../../types/entity/subscription";
import { formatCurrencyVND } from "../../../../../../utils/helper";
import { generateItemsDescriptionSubscription } from "../../list.config";

// ---- Import useLanguage để dùng t(...) ----
import { useLanguage } from "../../../../../../contexts/LanguageContext";

interface IItemSubscriptionProps {
  subscriptionData: ISubscriptionEntity;
}

const { Title, Text } = Typography;

const ItemSubscription: FC<IItemSubscriptionProps> = ({ subscriptionData }) => {
  const queryClient = useQueryClient();

  // Lấy hàm t(...) để dịch
  const { t } = useLanguage();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [priceUpdateValue, setPriceUpdateValue] = useState<number>(
    subscriptionData.price
  );

  const mutationUpdatePrice = useMutation({
    mutationKey: [mutationKey.updatePriceSubscription, subscriptionData.id],
    mutationFn: async () =>
      rootService.subscription.updatePrice(
        { subscriptionId: subscriptionData.id },
        { price: priceUpdateValue }
      ),
  });

  const removeNonNumeric = (value: string): string => {
    return value.replace(/[^0-9]/g, "");
  };

  const handleChangePrice: InputProps["onChange"] = (e) => {
    const rawValue = removeNonNumeric(e.target.value);
    const numericValue = parseInt(rawValue, 10);
    setPriceUpdateValue(numericValue);
  };

  const handleOnOkModal = async () => {
    if (priceUpdateValue === subscriptionData.price) {
      return toast.error(t("subscriptionItem.errorPriceSame"));
    }

    if (priceUpdateValue < 1000) {
      return toast.error(t("subscriptionItem.errorPriceLessThan1000"));
    }

    return await toast.promise(
      mutationUpdatePrice.mutateAsync().then(() => {
        queryClient.refetchQueries({
          queryKey: [constantRootQueryKeys.subscription.getAllSubscription],
        });
        setShowModal(false);
      }),
      {
        pending: t("subscriptionItem.toastUpdatePrice.pending"),
        success: t("subscriptionItem.toastUpdatePrice.success"),
        error: t("subscriptionItem.toastUpdatePrice.error"),
      }
    );
  };

  return (
    <>
      <List.Item>
        <Card
          title={
            <Flex justify="space-between" align="center">
              {/* Sử dụng i18n cho tiêu đề: "Gói {subscriptionData.name}" */}
              <Title style={{ margin: "0" }} level={5}>
                {t("subscriptionItem.cardTitle", {
                  name: subscriptionData.name,
                })}
              </Title>
              {/* Nút "Thay đổi giá tiền" */}
              <Button onClick={() => setShowModal(true)}>
                {t("subscriptionItem.changePriceButton")}
              </Button>
            </Flex>
          }
        >
          {/* Truyền t(...) vào hàm generateItemsDescriptionSubscription nếu cần */}
          <Descriptions
            items={generateItemsDescriptionSubscription(subscriptionData)}
          />
        </Card>
      </List.Item>

      <Modal
        title={t("subscriptionItem.modalTitleChangePrice", {
          name: subscriptionData.name,
        })}
        open={showModal}
        onCancel={() => setShowModal(false)}
        onOk={handleOnOkModal}
        okButtonProps={{ loading: mutationUpdatePrice.isPending }}
        cancelButtonProps={{ disabled: mutationUpdatePrice.isPending }}
        okText={t("subscriptionItem.modalOkText")}
        cancelText={t("subscriptionItem.modalCancelText")}
      >
        <Flex vertical gap={24}>
          <Flex vertical gap={12}>
            <Text>{t("subscriptionItem.currentPriceLabel")}</Text>
            <Input disabled value={formatCurrencyVND(subscriptionData.price)} />
          </Flex>
          <Flex vertical gap={12}>
            <Text>{t("subscriptionItem.newPriceLabel")}</Text>
            <Input
              value={formatCurrencyVND(priceUpdateValue)}
              placeholder={t("subscriptionItem.placeholderPrice")}
              onChange={handleChangePrice}
            />
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};

export default ItemSubscription;
