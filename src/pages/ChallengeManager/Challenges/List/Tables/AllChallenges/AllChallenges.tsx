import { FC, useState } from "react";
import challengeListColumn from "../tables.config";
import IDataTypeChallengeList from "../tables.type";
import { Button, Empty, Table, TableProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import challengeManagerService from "../../../../../../service/ChallengeManager/challengeManagerService";
import { IGetAllChallengeParams } from "../../../../../../types/request/challenge";
import { constantChallengeManagerQueryKey } from "../../../../../../constants/queryKey/challengeManager";
import generateQueryKeyChallenges from "../../challengeList.utils";
import { ActionChallenge } from "../Partials/ActionChallenge";
import { useSearchParams, Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import constantRoutesChallengeManager from "../../../../../../constants/routes/challengeManager";

// ---- Import useLanguage để gọi t(...) ----
import { useLanguage } from "../../../../../../contexts/LanguageContext";

const DEFAULT_CURRENT_PAGE: number = 1;
const DEFAULT_PAGE_SIZE: number = 10;

const typeChallenge: IGetAllChallengeParams["get"] = null;

const AllChallengesTable: FC = () => {
  // Lấy hàm t(...) từ context
  const { t } = useLanguage();

  const [searchParams, setSearchParams] = useSearchParams();
  const columns = challengeListColumn || [];

  const [currentPage, setCurrentPage] = useState<number | string>(
    searchParams.get("page") || DEFAULT_CURRENT_PAGE
  );
  const [pageSize, setPageSize] = useState<number | string>(
    searchParams.get("limit") || DEFAULT_PAGE_SIZE
  );
  const [total, setTotal] = useState<number>(0);
  const [challengesList, setChallengesList] = useState<
    IDataTypeChallengeList[]
  >([]);

  const queryKeys = generateQueryKeyChallenges(
    constantChallengeManagerQueryKey.challenge.allChallenges,
    {
      page: currentPage,
      perPage: pageSize,
      get: typeChallenge,
    }
  );

  const { isFetching } = useQuery({
    queryKey: [...queryKeys, { ...Object.fromEntries(searchParams.entries()) }],
    queryFn: async () => {
      const searchParamsEntries = Object.fromEntries(searchParams.entries());
      const filters: IGetAllChallengeParams["filter"] = {};

      if (searchParamsEntries["levels"]) {
        filters.levels = searchParamsEntries["levels"].split("-");
      }
      if (searchParamsEntries["timeCreated"]) {
        filters.timeCreated = searchParamsEntries["timeCreated"].split("-");
      }
      if (searchParamsEntries["technical"]) {
        filters.technical = searchParamsEntries["technical"].split("-");
      }
      if (searchParamsEntries["owners"]) {
        filters.owners = searchParamsEntries["owners"].split("%%");
      }
      if (searchParamsEntries["points"]) {
        filters.points = searchParamsEntries["points"].split("-");
      }
      if (searchParamsEntries["premium"]) {
        filters.premium = true;
      }

      try {
        const response = await challengeManagerService.challenge.getAll({
          page: currentPage,
          perPage: pageSize,
          get: typeChallenge,
          filter: filters,
        });

        const {
          challenges = [],
          total = 0,
          perPage = 10,
          currentPage: currentPageResponse = 1,
        } = response.data;

        setCurrentPage(currentPageResponse);
        setTotal(total);
        setPageSize(perPage);
        setChallengesList(challenges);

        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const onChangeTable: TableProps<IDataTypeChallengeList>["onChange"] = (
    pagination
  ) => {
    if (pagination.current !== currentPage && pagination.current) {
      const page = pagination.current.toString();
      const currentParams = Object.fromEntries(searchParams.entries());
      setCurrentPage(pagination.current);
      setSearchParams({ ...currentParams, page });
    }

    if (
      pagination.pageSize !== pageSize &&
      pagination.showSizeChanger &&
      pagination.pageSize
    ) {
      const limit = pagination.pageSize.toString();
      const currentParams = Object.fromEntries(searchParams.entries());
      setPageSize(pagination.pageSize);
      setSearchParams({ ...currentParams, limit });
    }
  };

  // Nút "Tạo thử thách"
  const buttonCreateChallenge = (
    <Button size="large" icon={<PlusOutlined />}>
      <Link to={constantRoutesChallengeManager.pages.challenges.create}>
        {t("allChallenges.createChallenge")}
      </Link>
    </Button>
  );

  // Cột Hành động
  const actionColumns: TableProps<IDataTypeChallengeList>["columns"] = [
    {
      width: 200,
      title: t("allChallenges.actionsColumn"),
      fixed: "right",
      key: "actions",
      render: (_, record: IDataTypeChallengeList) => (
        <ActionChallenge challenge={record} />
      ),
    },
  ];

  return (
    <Table<IDataTypeChallengeList>
      rowKey={(record) => `${record.id}`}
      dataSource={challengesList}
      scroll={{ x: "max-content" }}
      loading={isFetching}
      columns={[...columns, ...actionColumns]}
      pagination={{
        pageSize: pageSize as number,
        current: currentPage as number,
        total: total,
        showSizeChanger: true,
      }}
      sticky
      virtual
      showHeader
      onChange={onChangeTable}
      locale={{
        emptyText: (
          <Empty description={t("allChallenges.emptyText")}>
            {buttonCreateChallenge}
          </Empty>
        ),
      }}
    />
  );
};

export default AllChallengesTable;
