import { Flex, Form, Button, Input, Typography, Row, Col } from "antd";
import { FC, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";
import { BrandColorLogo } from "../../../assets/images/logos/locals";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { ILoginRequest } from "../../../types/request/login";
import useLoginLogic from "./login.logic.ts";
import FormItem from "antd/es/form/FormItem/index";
import constantRoutesAuth from "../../../constants/routes/authentication.ts";
import { useLanguage } from "../../../contexts/LanguageContext";

type IRoleInPath = "challenge-manager" | "mentor" | "tasker" | "root";

const LogoWrapper = styled.div`
  width: 220px;
  heigh: auto;

  & > img {
    width: 100%;
    heigh: 100%;
    object-fit: cover;
  }
`;

const LoginFormWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: "center";
  align-items: center;
`;

const { Link } = Typography;

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const roleInPath = location.pathname.split("/")[2] as IRoleInPath;
  const [roleValue, setRoleValue] = useState<string>("");

  const { t, setLanguage } = useLanguage();

  const { mutationLogin } = useLoginLogic();
  useEffect(() => {
    switch (roleInPath) {
      case "tasker":
        setRoleValue(t("role.tasker")); // Ví dụ: "Người tuyển dụng"
        break;
      case "mentor":
        setRoleValue(t("role.mentor")); // Ví dụ: "Người hỗ trợ"
        break;
      case "challenge-manager":
        setRoleValue(t("role.challengeManager")); // Ví dụ: "Người quản lí thử thách"
        break;
      case "root":
        setRoleValue(t("role.root")); // Ví dụ: "Người quản lí website"
        break;

      default:
        break;
    }
  }, [roleInPath, location]);

  const onFinish = (formLoginData: ILoginRequest) => {
    mutationLogin.mutate(formLoginData);
  };

  return (
    <LoginFormWrapper>
      <Flex
        flex={1}
        vertical
        gap={32}
        justify="center"
        align="center"
        style={{ width: "fit-content" }}
      >
        <Flex vertical justify="center" align="center">
          <LogoWrapper>
            <img src={BrandColorLogo} />
          </LogoWrapper>
          <Typography style={{ fontSize: "16px" }}>
            {t("login.title")}{" "}
            <span style={{ color: "#5250F7", fontWeight: "bold" }}>
              {roleValue}
            </span>
          </Typography>
        </Flex>

        <Form
          name="login"
          initialValues={{ remember: true }}
          style={{ maxWidth: "360px", width: "300px" }}
          onFinish={onFinish}
        >
          <Form.Item<ILoginRequest>
            name="email"
            rules={[
              {
                required: true,
                message: t("login.pleaseInputEmail"),
              },
              {
                type: "email",
                message: t("login.invalidEmail"),
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder={t("login.emailPlaceholder")}
            />
          </Form.Item>

          <Form.Item<ILoginRequest>
            name="password"
            rules={[
              {
                required: true,
                message: t("login.pleaseInputPassword"),
              },
            ]}
          >
            <Input
              size="large"
              prefix={<LockOutlined />}
              type="password"
              placeholder={t("login.passwordPlaceholder")}
            />
          </Form.Item>

          <Row gutter={12}>
            <Col span={16}>
              <Button
                loading={mutationLogin.isPending}
                size="large"
                block
                type="primary"
                htmlType="submit"
              >
                {t("login.loginButton")}
              </Button>
            </Col>
            <Col span={8}>
              <Button
                disabled={mutationLogin.isPending}
                block
                size="large"
                onClick={() =>
                  navigate(
                    `${constantRoutesAuth.root}/${constantRoutesAuth.options}`
                  )
                }
              >
                {t("login.backButton")}
              </Button>
            </Col>
          </Row>

          {roleInPath === "tasker" && (
            <FormItem>
              <Flex justify="center">
                <Link
                  style={{ margin: "12px 0" }}
                  onClick={() => {
                    const newPath = location.pathname.replace(
                      constantRoutesAuth.tasker.login,
                      constantRoutesAuth.tasker.emailRegistration
                    );
                    navigate(newPath);
                  }}
                >
                  {t("login.registerText")}
                </Link>
              </Flex>
            </FormItem>
          )}
        </Form>
      </Flex>
    </LoginFormWrapper>
  );
};
export default LoginPage;
