import { Flex } from "antd";
import { FC } from "react";
import Title from "antd/es/typography/Title";
import OptionRole from "./Partials/OptionsRole/OptionsRole";
import styled from "@emotion/styled";
import constantRoutesAuth from "../../../constants/routes/authentication";

// ---- Import useLanguage & Select để làm Dropdown ----
import { Select } from "antd";
import { useLanguage } from "../../../contexts/LanguageContext";

const { Option } = Select;

const WrapperConent = styled.div`
  min-height: 100dvh;
  width: 100%;
  display: flex;
`;

interface IOptionRoles {
  name: string;
  redirectTo: string;
}

const OptionsRolePage: FC = () => {
  // Lấy hàm t và setLanguage từ context
  const { t, setLanguage } = useLanguage();

  // Mình giả định bạn muốn hiển thị 4 role với text t("role.xxx")
  // thay vì hard-code như trước.
  const optionsRoles: IOptionRoles[] = [
    {
      name: t("role.mentor"), // "Mentor"
      redirectTo: `/${constantRoutesAuth.root}/${constantRoutesAuth.mentor.root}`,
    },
    {
      name: t("role.challengeManager"), // "Challenge Manager"
      redirectTo: `/${constantRoutesAuth.root}/${constantRoutesAuth.challengeManager.root}`,
    },
    {
      name: t("role.tasker"), // "Tasker"
      redirectTo: `/${constantRoutesAuth.root}/${constantRoutesAuth.tasker.root}`,
    },
    {
      name: t("role.root"), // "Root"
      redirectTo: `/${constantRoutesAuth.root}/${constantRoutesAuth.adminRoot.root}`,
    },
  ];

  return (
    <WrapperConent>
      <Flex flex={1} justify="center" align="center" gap={32} vertical>
        {/* Dropdown ở góc phải */}
        <div style={{ position: "absolute", top: "16px", right: "16px" }}>
          <Select
            defaultValue="en"
            style={{
              width: 120,
              backgroundColor: "#f0f4ff",
              border: "1px solid #5250F7",
              borderRadius: "8px",
            }}
            dropdownStyle={{
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            onChange={(value) => setLanguage(value)}
          >
            <Option value="en">English</Option>
            <Option value="vi">Việt Nam</Option>
            <Option value="ko">한국인</Option>
          </Select>
        </div>

        <Flex vertical justify="center" align="center" gap={24}>
          <Title level={1} style={{ color: "#5250F7", margin: 0 }}>
            {t("optionRole.fronticePanel")}
          </Title>
          <Title italic={true} style={{ margin: 0 }} level={4}>
            {t("optionRole.chooseRole")}
          </Title>
        </Flex>

        <Flex justify="center" align="stretch" gap={24}>
          {optionsRoles.map((role, index) => (
            <OptionRole
              key={`${index}`}
              nameRole={role.name}
              redirectTo={role.redirectTo}
            />
          ))}
        </Flex>
      </Flex>
    </WrapperConent>
  );
};

export default OptionsRolePage;
