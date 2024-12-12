import { FC } from "react";
import useTimeCountDown from "../../../hooks/useTimeCountDown";
import { Button } from "antd";

interface IExpiredTimeProps {
  expiredTime: number;
}

const ViewExpiredTime: FC<IExpiredTimeProps> = ({ expiredTime }) => {
  const timeExpired = useTimeCountDown(expiredTime * 1000);
  return (
    <Button variant="outlined" color="default" style={{ minWidth: "120px" }}>
      {timeExpired ? (
        <>
          {timeExpired?.hours} : {timeExpired?.minutes} : {timeExpired?.seconds}
        </>
      ) : (
        <span style={{ color: "red" }}>Hết thời gian</span>
      )}
    </Button>
  );
};

export default ViewExpiredTime;
