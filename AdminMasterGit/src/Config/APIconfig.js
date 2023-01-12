// const url = "https://node-service-platform.mobiloitte.com/api/v1";
// const url = "http://172.16.1.132:1931/api/v1";   //vishnu


const url = "https://node.solidis.io/api/v1";

const account = `${url}/account`;
const auth = `${url}/auth`;
const user = `${url}/user`;
const admin = `${url}/admin`;
const static1 = `${url}/static`;
const faq = `${url}/faq`;
const dispute = `${url}/dispute`;
const transaction = `${url}/transaction`;

const ApiConfig = {
  auth: `${auth}`,
  faqsList: `${faq}/faqsList`,
  viewFaq: `${faq}/faqs/`,
  editFaq: `${faq}/faqs`,
  addFaq: `${faq}/faqs`,

  adLogin: `${admin}/login`,
  dashboard: `${admin}/dashboard`,
  resetPassword: `${admin}/resetPassword`,
  viewparticularMilestone: `${admin}/viewparticularMilestone?_id=`,

  verifyOTP: `${user}/otpVerify`,
  sendOTP: `${user}/resendOTP`,

  listValidator: `${admin}/listValidator`, //
  deleteValidator: `${admin}/deleteValidator`, //
  viewUser: `${admin}/viewUser`,
  getPlanList: `${admin}/planList`, //
  viewPlan: `${admin}/viewPlanPage`, //
  editPlanPage: `${admin}/editPlanPage`, //
  getUserList: `${admin}/listUsers`,
  editProfile: `${admin}/editProfile`,
  getProfile: `${admin}/getProfile`,
  forgotPassword: `${admin}/forgotPassword`,
  toggleUser: `${admin}/blockUnblockUser`,
  viewValidator: `${admin}/viewValidator`, //
  editValidator: `${admin}/editValidator`,
  blockUnblockValidator: `${admin}/blockUnblockValidator`,
  addValidator: `${admin}/addValidator`,
  staticPageList: `${static1}/staticPageList`, //
  viewStaticPage: `${static1}/viewStaticPage`, //
  editStaticPage: `${static1}/editStaticPage`, ///api/v1/static/editStaticPage///api/v1/admin/listContractForCompany
  transactionList: `${admin}/transactionList`, ///api/v1/admin/transactionList/api/v1/user/viewTransaction
  viewTransaction: `${admin}/viewTransaction`,
  listContractForCompany: `${admin}/listContractForCompany`,
  listContractForUser: `${admin}/listContractForUser`, ///api/v1/admin/listContractForUser
  listMilestoneForCompany: `${admin}/listMilestoneForCompany`, ///api/v1/admin/listMilestoneForCompany
  listMilestoneForUser: `${admin}/listMilestoneForUser`, //api/v1/admin/listMilestoneForUser
  // dispute
  dispute: `${dispute}/disputeRequest`,
  disputedList: `${dispute}/disputedList`,
  viewDisputeList: `${dispute}/viewDisputeList`,
  disputedContractList: `${dispute}/disputedContractList`,
  disputedContractListByMilestoneId: `${dispute}/disputedContractListByMilestoneId`,
  resolveDispute: `${dispute}/resolveDispute`,
  // transaction

  blockchainTransactionListForAdmin: `${transaction}/blockchainTransactionListForAdmin`,
};

export default ApiConfig;
