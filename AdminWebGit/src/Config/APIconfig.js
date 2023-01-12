
// const url = "https://nodenew-serviceplatform.mobiloitte.com/api/v1";
const url = "https://node.solidis.io/api/v1";
const account = `${url}/account`;
const auth = `${url}/auth`;
const user = `${url}/user`;
const admin = `${url}/admin`;
const faq = `${url}/faq`;
const static1 = `${url}/static`;
const dispute = `${url}/dispute`;
const txn = `${url}/transaction`;


const ApiConfig = {
  auth: `${auth}`,
  // user
  sendOTP: `${user}/resendOTP`,
  verifyOTP: `${user}/otpVerify`,
  staticPageList: `${static1}/staticPageList`, //

  forgotPassword: `${user}/forgotPassword`,
  resetPassword: `${user}/resetPassword`,
  userLogin: `${user}/login`,
  logout: `${user}/logout`,
  signUp: `${user}/signUp`,
  contactUs: `${user}/contactUs`,
  editProfile: `${user}/editProfile`,
  getProfile: `${user}/getProfile`,
  listMilestone: `${user}/listMilestone`,
  listMilestoneForCompany: `${user}/listMilestoneForCompany`,
  listContract: `${user}/listContract`,
  listContractForCompany: `${user}/listContractForCompany`,
  completeContract: `${user}/completeContract`,
  activeContract: `${user}/activeContract`,

  listContractById: `${user}/listContractById`,
  listMilestoneForValidator: `${user}/listMilestoneForValidator`,
  addContract: `${user}/addContract`,
  subscriptionList: `${user}/subscriptionList`,
  choosePlan: `${user}/choosePlan`,
  addCard: `${user}/addCard`,
  madePayment: `${url}/payment/payment`,
  planList: `${user}/planList`,
  shareContractDetails: `${user}/shareContractDetails`,
  approveContract: `${user}/approveContract`,
  rejectContract: `${user}/rejectContract`,
  viewMilestone: `${user}/viewMilestone`, ///api/v1/user/transactionList
  transactionList: `${user}/transactionList`, ///api/v1/user/transactionList
  viewTransaction: `${user}/viewTransaction`, ///api/v1/user/transactionList
  completeParticularMilestone: `${user}/completeParticularMilestone`, //api/v1/user/viewMilestone/api/v1/user/completeParticularMilestone
  selectValidatorByCompany: `${user}/selectValidatorByCompany`, //api/v1/user/viewMilestone/api/v1/user/completeParticularMilestone

  listValidatorContract: `${user}/listValidatorContract`,

  acceptMilestoneByValidator: `${user}/acceptMilestoneByValidator`,
  rejectMilestoneByValidator: `${user}/rejectMilestoneByValidator`,

  // admin   listValidatorContract
  adLogin: `${admin}/login`,
  listValidator: `${user}/listValidator`,
  faqsList: `${faq}/faqsList`,
  // wallet

  connectWallet: `${user}/addWallet`,

  // dispute
  dispute: `${dispute}/disputeRequest`,
  disputedList: `${dispute}/disputedList`,
  viewDisputeList: `${dispute}/viewDisputeList`,
  disputedContractListByMilestoneId: `${dispute}/disputedContractListByMilestoneId`,
  contractFinalizeByClient: `${user}/contractFinalizeByClient`,


  replyOnDispute: `${dispute}/replyOnDispute`,





  // relese fund

  releaseFundOnParticularMilestoneByClient: `${user}/releaseFundOnParticularMilestoneByClient`,
  // transaction
  blockchainTransactionListForUser: `${txn}/blockchainTransactionListForUser`,
};

export default ApiConfig;
