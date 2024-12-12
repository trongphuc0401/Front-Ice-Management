import { Button, Result } from "antd";
import { useLocation, useNavigate } from "react-router";
import constantRoutesAuth from "../../../constants/routes/authentication";
import { useEffect } from "react";

const ResultRegisterSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isRegisterSuccess = location.state?.isRegisterSuccess;

  useEffect(() => {
    if (!isRegisterSuccess) {
      return navigate(-1);
    }
  }, [isRegisterSuccess]);

  if (!isRegisterSuccess) return;

  return (
    <Result
      status={"success"}
      title="Đăng kí tài khoản thành công"
      subTitle="Bạn đã thực hiện đăng kí tài khảon cho vai trò tuyển dụng thành công, xin đợi admin xác thực và duyệt tài khoản"
      extra={[
        <Button
          type="default"
          onClick={() =>
            navigate(
              `/${constantRoutesAuth.root}/${constantRoutesAuth.tasker.root}/${constantRoutesAuth.tasker.login}`,
            )
          }
        >
          Quay lại
        </Button>,
      ]}
    />
  );
};
export default ResultRegisterSuccessPage;
