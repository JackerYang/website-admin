// 通用(5)
export {
  uploadImg,
  getOrgTree,
  login,
  logout,
  pwdChange,
  getLoginUser
} from "./api/common";

// 组织机构(6)
export {
  getOrgList,
  getOrgSortList,
  getOrg,
  editOrg,
  editOrgSort,
  delOrg
} from "./api/org";

// 用户管理(6)
export {
  getUserList,
  getUserSortList,
  getUser,
  editUser,
  editUserSort,
  delUser
} from "./api/user";

// 企业简介(2) && 企业风光(6) && 企业印象(6) && 企业成果(6)
export {
  getOrgProfile,
  editOrgProfile,
  getOrgSceneryList,
  getOrgScenerySortList,
  getOrgScenery,
  editOrgScenery,
  editOrgScenerySort,
  delOrgScenery,
  getOrgImpressionList,
  getOrgImpression,
  editOrgImpression,
  orgImpressionPublish,
  orgImpressionCancel,
  delOrgImpression,
  getOrgAchievementList,
  getOrgAchievement,
  editOrgAchievement,
  orgAchievementPublish,
  orgAchievementCancel,
  delOrgAchievement
} from "./api/company";

// 主要成员(6)
export {
  getMemberList,
  getMemberSortList,
  getMember,
  editMember,
  editMemberSort,
  delMember
} from "./api/member";

// 板块管理(7)
export {
  getPlateList,
  getPlateSortList,
  getPlate,
  editPlate,
  editPlateSort,
  platePublish,
  plateCancel,
  delPlate
} from "./api/plate";

// 信息发布(7)
export {
  getInfoNav,
  getInformationList,
  getInformation,
  editInformation,
  informationPublish,
  informationCancel,
  delInformation
} from "./api/information";

// 统计分析(3)
export {
  getReleaseEcharts,
  getReadEcharts,
  exportRelease,
  exportRead
} from "./api/statistics";

// 日志管理(2)
export { getLog, exportLog, getLogDetail } from "./api/log";

// 商品(13)
export {
  getShopClassifyTree,
  getShopClassifyList,
  getShopClassifySortList,
  getShopClassify,
  editShopClassify,
  editShopClassifySort,
  delShopClassify,
  getShopList,
  getShops,
  getShop,
  editShop,
  inBoundShop,
  shopPublish,
  shopCancel,
  delShop,
  inBoundRecord,
  inBoundRecordDetail,
  exportInbound
} from "./api/shop";
