const { Wechat } = require('wechat-jssdk')
const wx = new Wechat({
  appId: process.env.WeChat_APP_ID,
  appSecret: process.env.WeChat_APP_SECRET
})
export default async (req, res) => {
  const signatureData = await wx.jssdk.getSignature(req.query.url)
  res.status(200).json(signatureData)
}
