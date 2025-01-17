import styled from "@emotion/styled";
import { Flex, Typography, Form, Button, Col, Input, Row, Tooltip } from "antd";
import { FC, useEffect } from "react";
import { BrandColorLogo } from "../../../assets/images/logos/locals";
import { FormProps } from "rc-field-form";
import { IRegisterTaskerRequest } from "../../../types/request/auth";
import { useMutation } from "@tanstack/react-query";
import mutationKey from "../../../constants/mutation";
import authService from "../../../service/authService";
import { useLocation, useNavigate } from "react-router";
import constantRoutesAuth from "../../../constants/routes/authentication";
import { toast } from "react-toastify";
import constantRoutesGlobal from "../../../constants/routes/global";

// ---- Import hook useLanguage để dùng t(...) ----
import { useLanguage } from "../../../contexts/LanguageContext";

const LogoWrapper = styled.div`
  width: 220px;
  heigh: auto;

  & > img {
    width: 100%;
    heigh: 100%;
    object-fit: cover;
  }
`;

const RegisterFormWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: "center";
  align-items: center;
`;

type IFormFieldData = IRegisterTaskerRequest;

const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailRegistration = location.state?.emailRegistration as string;
  const verifyEmailSucceess = location.state?.verifyEmailSuccess as string;

  // Lấy form của antd
  const [form] = Form.useForm<IFormFieldData>();

  // Lấy hàm t(...) từ LanguageContext
  const { t } = useLanguage();

  const mutationRegisterTasker = useMutation({
    mutationKey: [mutationKey.regitserTasker],
    mutationFn: async (data: IRegisterTaskerRequest) =>
      await authService.registerTasker(data),
  });

  const onFinish: FormProps<IFormFieldData>["onFinish"] = async (
    formValues
  ) => {
    // Thay thế text tĩnh bằng t("...") trong toast
    return await toast.promise(
      mutationRegisterTasker
        .mutateAsync({ ...formValues, role: "tasker" })
        .then((response) => {
          const newPath = location.pathname.replace(
            constantRoutesAuth.tasker.register,
            constantRoutesAuth.tasker.registerSuccess
          );
          navigate(newPath, {
            state: {
              emailRegistration: response.data.email,
              isRegisterSuccess: true,
            },
          });
        }),
      {
        pending: t("register.toastPending"),
        success: t("register.toastSuccess"),
        error: t("register.toastError"),
      }
    );
  };

  useEffect(() => {
    if (!Boolean(emailRegistration) && !Boolean(verifyEmailSucceess)) {
      return navigate(constantRoutesGlobal.errorPage["404"]);
    }
  }, [location.state]);

  return (
    <RegisterFormWrapper>
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
            {t("register.title")}{" "}
            <span style={{ color: "#5250F7", fontWeight: "bold" }}>
              {t("register.tasker")}
            </span>
          </Typography>
        </Flex>

        <Form<IFormFieldData>
          form={form}
          name="register"
          initialValues={{ role: "tasker", email: emailRegistration }}
          style={{ maxWidth: "400px" }}
          autoComplete="off"
          onFinish={onFinish}
          layout="vertical"
        >
          {/* Họ và Tên */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={t("register.firstNameLabel")}
                name="firstname"
                rules={[
                  {
                    required: true,
                    message: t("register.firstNameRule"),
                  },
                ]}
              >
                <Input placeholder={t("register.placeholderFirstName")} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={t("register.lastNameLabel")}
                name="lastname"
                rules={[
                  {
                    required: true,
                    message: t("register.lastNameRule"),
                  },
                ]}
              >
                <Input placeholder={t("register.placeholderLastName")} />
              </Form.Item>
            </Col>
          </Row>

          {/* Công ty */}
          <Form.Item
            label={t("register.companyLabel")}
            name="company"
            rules={[{ required: true, message: t("register.companyRule") }]}
          >
            <Input placeholder={t("register.placeholderCompany")} />
          </Form.Item>

          {/* Tên tài khoản */}
          <Form.Item
            label={t("register.usernameLabel")}
            name="username"
            rules={[
              {
                required: true,
                message: t("register.usernameRule"),
              },
            ]}
          >
            <Input placeholder={t("register.placeholderUsername")} />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label={t("register.emailLabel")}
            name="email"
            initialValue={emailRegistration}
            rules={[
              { required: true, message: t("register.emailRule") },
              { type: "email", message: t("register.emailInvalid") },
            ]}
          >
            <Input
              placeholder={t("register.placeholderEmail")}
              defaultValue={emailRegistration}
              disabled
            />
          </Form.Item>

          {/* Số điện thoại */}
          <Form.Item
            label={
              <span>
                {t("register.phoneLabel")}{" "}
                <Tooltip color="blue" title={t("register.phoneTooltip")}>
                  <Typography.Text
                    style={{ color: "#1890ff", cursor: "pointer" }}
                  >
                    ?
                  </Typography.Text>
                </Tooltip>
              </span>
            }
            name="phone"
            rules={[
              {
                required: true,
                message: t("register.phoneRule"),
              },
              {
                pattern: /^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})$/,
                message: t("register.phoneInvalid"),
              },
            ]}
          >
            <Input placeholder={t("register.placeholderPhone")} />
          </Form.Item>

          {/* Mật khẩu */}
          <Form.Item
            label={t("register.passwordLabel")}
            name="password"
            rules={[
              {
                required: true,
                message: t("register.passwordRule"),
              },
              {
                min: 8,
                message: t("register.passwordMin"),
              },
            ]}
          >
            <Input.Password
              autoComplete="off"
              placeholder={t("register.placeholderPassword")}
            />
          </Form.Item>

          {/* Xác nhận mật khẩu */}
          <Form.Item
            label={t("register.passwordConfirmLabel")}
            name="password_confirmation"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: t("register.passwordConfirmRule"),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(t("register.passwordConfirmMismatch"))
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder={t("register.placeholderPasswordConfirm")}
            />
          </Form.Item>

          <Form.Item>
            <Row gutter={12}>
              <Col span={16}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={mutationRegisterTasker.isPending}
                >
                  {t("register.registerButton")}
                </Button>
              </Col>
              <Col span={8}>
                <Button
                  type="default"
                  block
                  disabled={mutationRegisterTasker.isPending}
                >
                  {t("register.backButton")}
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Flex>
    </RegisterFormWrapper>
  );
};

export default RegisterPage;
