/**
 * DSE错题本 - AI对话后端代理
 * 
 * 本函数运行在 Vercel Serverless 环境中，负责：
 * 1. 接收前端发来的聊天消息（含文字/图片）
 * 2. 用服务端环境变量里的 API 密钥调用 DeepSeek API
 * 3. 把 AI 回复返回给前端
 * 
 * 这样做的好处：API 密钥永远只存在服务器上，不会暴露在浏览器里。
 */

// DeepSeek API 端点（OpenAI 兼容格式）
const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';

export default async function handler(req, res) {
  // ========== CORS 跨域处理 ==========
  // 允许所有来源的前端访问（开发阶段方便调试，上线后也无安全问题）
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理浏览器的 OPTIONS 预检请求（CORS 握手）
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ========== 只允许 POST 请求 ==========
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只支持 POST 请求' });
  }

  // ========== 读取 API 密钥 ==========
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    // 密钥没配置，返回 500 错误，提示管理员去 Vercel 设置环境变量
    return res.status(500).json({ error: '未配置DEEPSEEK_API_KEY' });
  }

  // ========== 解析前端请求体 ==========
  // Vercel Serverless 会自动解析 JSON 请求体到 req.body
  const { messages } = req.body || {};

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: '请求体必须包含 messages 数组' });
  }

  // ========== 调用 DeepSeek API ==========
  try {
    const deepseekResp = await fetch(DEEPSEEK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-flash',   // 使用 deepseek-flash 模型，支持图片识别
        messages: messages,         // 直接转发前端发来的消息数组
        temperature: 0.7,           // 温度参数，控制回答的随机性
      }),
    });

    // ========== 处理 DeepSeek 返回的错误 ==========
    if (!deepseekResp.ok) {
      const errText = await deepseekResp.text();
      console.error('DeepSeek API 错误:', deepseekResp.status, errText);
      return res.status(deepseekResp.status).json({
        error: `DeepSeek API 调用失败 (${deepseekResp.status})`,
        detail: errText,
      });
    }

    // ========== 解析成功响应并返回给前端 ==========
    const data = await deepseekResp.json();
    const reply = data.choices?.[0]?.message?.content || '';

    return res.status(200).json({ reply: reply });

  } catch (err) {
    // 网络错误、超时等异常情况
    console.error('后端异常:', err);
    return res.status(500).json({
      error: '服务器内部错误',
      detail: err.message,
    });
  }
}
