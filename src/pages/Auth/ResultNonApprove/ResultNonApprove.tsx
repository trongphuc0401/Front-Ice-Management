import { Button, Result, Typography } from "antd";
import { useNavigate } from "react-router";
import constantRoutesAuth from "../../../constants/routes/authentication";

// --- Import useLanguage & styled ---
import { useLanguage } from "../../../contexts/LanguageContext";
import styled from "@emotion/styled";

const { Text } = Typography;

// Phần container sẽ được cố định (fixed) ở góc dưới bên phải màn hình
// và có mũi tên nhọn hướng vào (sử dụng ::after).
const StyledContainer = styled.div`
  position: fixed;
  right: 16px;
  bottom: 16px;

  /* Tạo khung bao quanh, màu nền, bo góc... */
  background-color: #fff5f6;
  border: 1px solid #ffccc7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  /* Khoảng cách giữa các phần tử bên trong */
  padding: 12px 24px;
  max-width: 420px;

  /* Mũi tên  */
  &::after {
    content: "";
    position: absolute;
    right: 100%; /* Mũi tên nằm về bên trái khối */
    top: 20%;
    border: 10px solid transparent;
    border-right-color: #fff5f6; /* Màu nền, để mũi tên hòa với khối */
    transform: translateY(-50%);
  }
`;

const ResultNonApprovePage = () => {
  const navigate = useNavigate();

  // Lấy hàm t từ context i18n
  const { t } = useLanguage();

  return (
    <StyledContainer>
      <Result
        status={"403"}
        title={t("resultNonApprove.title")}
        subTitle={
          <Text>
            {t("resultNonApprove.subTitle.part1")}{" "}
            <Text
              style={{ color: "blue", textDecoration: "underline" }}
              copyable={{
                tooltips: [
                  t("resultNonApprove.copyEmailTooltip"),
                  t("resultNonApprove.copiedEmailTooltip"),
                ],
              }}
            >
              frontice.suport@frontice.com
            </Text>{" "}
            {t("resultNonApprove.subTitle.part2")}
          </Text>
        }
        extra={[
          <Button
            type="primary"
            variant="solid"
            color="primary"
            onClick={() =>
              navigate(
                `/${constantRoutesAuth.root}/${constantRoutesAuth.tasker.root}/${constantRoutesAuth.tasker.login}`
              )
            }
          >
            {t("resultNonApprove.backButton")}
          </Button>,
        ]}
      />
    </StyledContainer>
  );
};

export default ResultNonApprovePage;
