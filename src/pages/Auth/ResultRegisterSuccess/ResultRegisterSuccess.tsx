import { Button, Flex, Result, Typography } from "antd";
import { useLocation, useNavigate } from "react-router";
import constantRoutesAuth from "../../../constants/routes/authentication";
import { useEffect } from "react";

// --- Import useLanguage & styled ---
import { useLanguage } from "../../../contexts/LanguageContext";
import styled from "@emotion/styled";

const { Text } = Typography;

/* 
  Container được fixed ở góc phải bên dưới,
  có màu nền, viền, bo góc, và một mũi tên 
  "đâm" vào từ bên trái.
*/
const StyledContainer = styled.div`
  position: fixed;
  right: 16px;
  bottom: 16px;

  background-color: #f6ffed; /* Xanh nhạt */
  border: 1px solid #b7eb8f;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  padding: 16px 24px;
  max-width: 700px;

  &::after {
    content: "";
    position: absolute;
    right: 100%; /* Mũi tên nằm về bên trái khối */
    top: 30%;
    border: 12px solid transparent;
    border-right-color: #f6ffed; /* Màu nền, trùng với container */
    transform: translateY(-50%);
  }
`;

const ResultRegisterSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isRegisterSuccess = location.state?.isRegisterSuccess;
  const emailRegistration = location.state?.emailRegistration;

  // Lấy hàm t(...) từ LanguageContext
  const { t } = useLanguage();

  useEffect(() => {
    // Nếu không có state isRegisterSuccess, quay trở lại trang trước
    if (!Boolean(isRegisterSuccess) && Boolean(emailRegistration)) {
      return navigate(-1);
    }
  }, [location.state]);

  // Nếu isRegisterSuccess không tồn tại => không render gì
  if (!isRegisterSuccess) return null;

  return (
    <StyledContainer>
      <Flex justify="center" align="center">
        <Result
          status={"success"}
          title={t("resultRegisterSuccess.title")}
          style={{ maxWidth: "700px" }}
          subTitle={
            <span>
              {t("resultRegisterSuccess.subTitle.part1")}{" "}
              <Text
                copyable={{
                  tooltips: [
                    t("resultRegisterSuccess.copyEmailTooltip"),
                    t("resultRegisterSuccess.copiedEmailTooltip"),
                  ],
                }}
              >
                {emailRegistration}
              </Text>{" "}
              {t("resultRegisterSuccess.subTitle.part2")}
            </span>
          }
          extra={[
            <Button
              type="default"
              onClick={() =>
                navigate(
                  `/${constantRoutesAuth.root}/${constantRoutesAuth.tasker.root}/${constantRoutesAuth.tasker.login}`
                )
              }
            >
              {t("resultRegisterSuccess.backButton")}
            </Button>,
          ]}
        />
      </Flex>
    </StyledContainer>
  );
};

export default ResultRegisterSuccessPage;
