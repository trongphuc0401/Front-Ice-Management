import { TabsProps } from "antd";
import { AllChallengesTable } from "./Tables/AllChallenges";
import { MyChallengesTable } from "./Tables/MyChallenges";
import OtherChallengesTable from "./Tables/OtherChallenges/OtherChallenges";

const challengeListTabs: TabsProps["items"] = [
  {
    label: "All",
    key: "all_challenges",
    children: <AllChallengesTable />,
  },
  {
    label: "My Challenges",
    key: "my_challenges",
    children: <MyChallengesTable />,
  },
  {
    label: "Other Challenges",
    key: "other_challenges",
    children: <OtherChallengesTable />,
  },
];

export default challengeListTabs;
