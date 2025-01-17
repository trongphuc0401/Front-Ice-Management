import { useEffect, useState } from "react";
import { Button, Col, Flex, Form, Row, Typography, notification } from "antd";
import { OTPInput } from "../../../components/Components/OTPInput";
import { useLocation, useNavigate } from "react-router";
import { ResendOtp } from "./Partials/ResendOtp";
import { useMutation } from "@tanstack/react-query";
import mutationKey from "../../../constants/mutation";
import authService from "../../../service/authService";
import {
  IVerifyOtpParams,
  IVerifyOtpRequest,
} from "../../../types/request/auth";
import { toast } from "react-toastify";
import constantRoutesAuth from "../../../constants/routes/authentication";

// ---- Import useLanguage & styled ----
import { useLanguage } from "../../../contexts/LanguageContext";
import styled from "@emotion/styled";

type IParamsMutationVerifyOtp = {
  data: IVerifyOtpRequest;
  params: IVerifyOtpParams;
};

const { Title, Text } = Typography;

/*
  Container cố định (fixed) ở góc phải bên dưới,
  nền màu, bo góc, viền, và thêm mũi tên chỉ vào từ trái.
*/
const StyledContainer = styled.div`
  position: fixed;
  right: 16px;
  bottom: 16px;

  background-color: #e6f7ff; /* Xanh nhạt */
  border: 1px solid #91d5ff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  padding: 20px;
  max-width: 400px;

  &::after {
    content: "";
    position: absolute;
    right: 100%;
    top: 20%;
    border: 10px solid transparent;
    border-right-color: #e6f7ff;
    transform: translateY(-50%);
  }
`;

const VerifyOtpPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [otp, setOtp] = useState<string>("");

  const location = useLocation();
  const emailVerify = location.state?.emailVerify;

  // Lấy hàm t(...) từ LanguageContext
  const { t } = useLanguage();

  const mutationVerifyOtp = useMutation({
    mutationKey: [mutationKey.verifyOtp],
    mutationFn: async (params: IParamsMutationVerifyOtp) =>
      await authService.verifyOtp(
        { otp: params.data.otp },
        { emailVerify: params.params.emailVerify }
      ),
  });

  const handleSubmit = async () => {
    if (otp.length === 6) {
      const paramsMutationVerifyOtp: IParamsMutationVerifyOtp = {
        data: {
          otp,
        },
        params: { emailVerify },
      };
      return toast.promise(
        mutationVerifyOtp.mutateAsync(paramsMutationVerifyOtp).then(() => {
          const newPath = location.pathname.replace(
            constantRoutesAuth.tasker.verifyOtp,
            constantRoutesAuth.tasker.register
          );
          return navigate(newPath, {
            state: {
              verifyEmailSucceess: true,
              emailRegistration: emailVerify,
            },
          });
        }),
        {
          pending: t("verifyOtp.toastPending", { otp }),
          success: t("verifyOtp.toastSuccess", { otp }),
          error: t("verifyOtp.toastError", { otp }),
        }
      );
    } else {
      notification.error({ message: t("verifyOtp.notificationError") });
    }
  };

  useEffect(() => {
    if (!emailVerify) {
      return navigate(-1);
    }
  }, [emailVerify]);

  // Nếu không có emailVerify => không render
  if (!emailVerify) return null;

  return (
    <StyledContainer>
      <Title level={2} style={{ textAlign: "center" }}>
        {t("verifyOtp.title")}
      </Title>

      <Form form={form} name="otpForm" layout="vertical">
        <Form.Item
          label={
            <Flex vertical align="start" gap={4}>
              <Text>{t("verifyOtp.inputOtpLabel")}</Text>
              {emailVerify && (
                <Text
                  copyable={{
                    tooltips: [
                      t("verifyOtp.copyEmailTooltip"),
                      t("verifyOtp.copiedEmailTooltip"),
                    ],
                  }}
                >
                  {emailVerify}
                </Text>
              )}
            </Flex>
          }
        >
          <OTPInput length={6} value={otp} onChange={setOtp} />
        </Form.Item>

        <Row gutter={12}>
          <Col span={16}>
            <Button
              type="primary"
              onClick={handleSubmit}
              style={{ width: "100%" }}
              loading={mutationVerifyOtp.isPending}
            >
              {t("verifyOtp.buttonSubmit")}
            </Button>
          </Col>
          <Col span={8}>
            <Button
              disabled={mutationVerifyOtp.isPending}
              type="default"
              style={{ width: "100%" }}
              onClick={() => navigate(-1)}
            >
              {t("verifyOtp.buttonBack")}
            </Button>
          </Col>
        </Row>

        <ResendOtp emailResend={emailVerify} />
      </Form>
    </StyledContainer>
  );
};

export default VerifyOtpPage;
