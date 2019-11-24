export const api = {
  //账户
  "pcAssetQuery": "/v1/http/pc/asset/query",
  // "transfer": "/v1/http/pc/leverage/change",
  // 杠杆
  "change": "/v1/http/pc/leverage/change",
  // 自动追加保证金
  "increase": "/v1/http/pc/margin/auto_increase",
  "marketsquery": "/v1/http/pc/markets/query", //合约面值
  //追加保证金
  "incr": "/v1/http/pc/margin/increase",

  // 委托
  "order1": "/v1/http/pc/order/create",
  //创建永续合约委托
  "order2": "/pc/order/query",
  "order3": "/v1/http/pc/order/cancel",
  // 历史委托
  "history": "/v1/http/pc/order/query_history",
  //仓位 
  "position": "/v1/http/pc/position/change",
  // 成交记录
  "transferpc": "/v1/http/pc/account/transfer",
  "query": "/v1/http/pc/order/query",
  "positionquery": "/v1/http/pc/position/query",
  "yue": "/v1/http/pc/account/available/query",
  "billheyuezhanghu": "/v1/http/pc/bill/query",
  "query_alltiaojian": "/v1/http/pc/order/query_all",
  "transactionRecord": "/v1/http/pc/trade/query",
  "pairQuery": "/v1/http/pc/contract/query",

  "close": "/v1/http/pc/position/close",
  "login": "/v1/http/login/phone",//手机登录
  "loginpoSt": "/v1/http/login",//登录
  "logins": "/v1/http/login/email",//邮箱登录
  "register": "/v1/http/register/email",
  "check_email": "/v1/http/register/check_email",
  "register_by_phone": "/v1/http/register/phone",//手机注册
  "check_phone": "/v1/http/register/check_phone",//验证手机号码是否存在
  "send_sms_verify_code": "/v1/http/register/send_register_sms",//手机验证码
  "send_email_verify_code": "/v1/http/register/send_register_email",//邮箱验证码
  "area": "/v1/http/register/get_area_list",//手机区号
  "reset_pwd_phone": "/v1/http/login/reset_pwd_phone",//重置手机密码
  "reset_pwd_email": "/v1/http/login/reset_pwd_email",//重置邮箱密码
  "send_reset_sms": "/v1/http/login/send_reset_sms",//重置手机密码验证码
  "send_reset_email": "/v1/http/login/send_reset_email",//重置邮箱密码验证邮箱验证码
  "check_phone_exist": "/v1/http/login/check_phone_exist",//重置手机密码  验证手机号码是否存在
  "check_email_exist": "/v1/http/login/check_email_exist",//重置邮箱密码  验证邮箱号码是否存在
  "check_verify": "/v1/http/login/check_verify",//登录验证码

  //财产中心
  "cczxquery": "/v1/http/account/total/query",//总资产
  "cczxquery_history": "/v1/http/account/transfer/query_history",//划转历史记录
  "transfer": "/v1/http/account/transfer",//账户划转
  "hyzhquery": "/v1/http/account/pc/query",//合约账户
  "zjzhanghu": "/v1/http/account/fund/query",//资金账户
  "deposit": "/v1/http/account/deposit/asset/query",//充币
  "address": "/v1/http/account/deposit/address/query",//充币地址
  "cbquery_history": "/v1/http/account/deposit/query_history",//充币记录
  "tbwithdraw": "/v1/http/account/withdraw/asset/query",//提币比重
  "ttbwithdraw": "/v1/http/account/withdraw",//提币
  "authrenzz": "/v1/http/account/withdraw/auth",//提币比重
  "tbquery_history": "/v1/http/account/withdraw/query_history",//提币历史
  "tbdzaddress": "/v1/http/account/withdraw/address/create",//创建提币地址
  "tbdzquery": "/v1/http/account/withdraw/address/query",//查询提币地址
  "tbremove": "/v1/http/account/withdraw/address/remove",//删除提币地址
  "tbmarkets": "/v1/http/account/withdraw/markets/query",//提币基础配置
  "hzavailable": "/v1/http/account/transfer/available/query",//划转余额








  "aqguci": "/v1/http/user/get_user_center_info",//获取个人中心展示信息
  "getInviteUser": "/v1/http/user/get_invite_user",//获取邀请列表
  "getReferrerCode": "/v1/http/user/get_referrer_code",//获取邀请码和邀请链接
  "getSortRakeBack": "/v1/http/user/get_sort_rake_back",//获取返佣排行榜
  "getRakeBack": "/v1/http/user/get_rake_back",//获取返佣列表
  "query_login_his": "/v1/http/user/query_login_his",//历史记录
  "apiquery": "/v1/http/user/api/query",//查询 用户api
  "apicreate": "/v1/http/user/api/create",//创建用户apiKey
  "apiremove": "/v1/http/user/api/remove",//删除apiKey
  "xgchange_phone": "/v1/http/user/change_phone",//修改手机号码
  "send_change_phone_sms": "/v1/http/user/send_change_phone_sms",//发送手机验证码绑定手机
  "bdsjsend_bind_phone": "/v1/http/user/send_bind_phone",//发送手机验证码绑定手机
  "send_installed_fundpwd_sms": "/v1/http/user/send_installed_fundpwd_sms",//发送手机验证码设置资金密码
  "send_bind_phone_email": "/v1/http/user/send_bind_phone_email",//发送邮箱验证码绑定手机
  "bindphone": "/v1/http/user/bind_phone",//绑定手机
  "installed_fundpwd": "/v1/http/user/installed_fundpwd",//设置资金密码密码
  "bind_email": "/v1/http/user/send_bind_email",//绑定邮箱
  "bind_email2": "/v1/http/user/bind_email",//绑定邮箱
  "send_chang_login_pwd_sms": "/v1/http/user/send_chang_login_pwd_sms",//修改登录密码验证码
  "send_change_fundpwd_sms": "/v1/http/user/send_change_fundpwd_sms",//修改资金密码验证码
  "change_fund_pwd": "/v1/http/user/change_fund_pwd",//修改资金密码
  "change_login_pwd": "/v1/http/user/change_login_pwd",//修改资金密码
  "enableverify": "/v1/http/user/enable_email_verify",//开启邮箱验证
  "enable_phone_verify": "/v1/http/user/enable_phone_verify",//开启手机验证
  "realname_auth": "/v1/http/user/realname_auth",//实名认证
  "realname_auth_other": "/v1/http/user/realname_auth_other",//实名认证国外
  // "realname_auth_other": "/v1/http/user/realname_auth_other",//实名认证国外
  "settingzuida": "/v1/http/pc/setting/query",//用户配置 setting
  "init": "/v1/http/pc/contract/init",//永续合约用户初始化,用户登录状态进入交易页面最先调用这个接口
  "symbolbizhongleixing": "/v1/http/account/transfer/asset/query",//财务中心资金划转查询划转币种
  // "enableverify": "/v1/http/user/get_user_center_info",//修改资金密码




  "getPcFeeList": "/v1/http/user/get_pc_fee_list",//获取手续费列表
  "resetFundPwd": "/v1/http/user/reset_fund_pwd",//重置资金密码
  "sendResetFundpwdSms": "/v1/http/user/send_reset_fundpwd_sms",//发送重置资金密码短信验证码


  "getUserFee": "/v1/http/user/get_user_fee",//获取用户当前手续费率
  "depositMarketsQuery": "/v1/http/account/deposit/markets/query",//查询充值的基本配置
  "candlequeryhistory": "/v1/http/pc/candle/query/history",//k线历史记录
  
  
  //第三方地址请求获取
  "GetPersonalCenterHelpCenterAddress": "/v1/http/user/query_help_center",//获取个人中心帮助中心地址
  
}

