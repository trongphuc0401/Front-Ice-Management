import followerService from "./Follower";
import taskSerivce from "./Task";
import uploadService from "./Upload";

const taskerService = {
  task: taskSerivce,
  follower: followerService,
  upload: uploadService,
};

export default taskerService;
