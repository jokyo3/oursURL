// functions/uploadtx.js 微信开放平台
export async function onRequest(context) {
    const { request } = context;
    const uploadUrl = "https://openai.weixin.qq.com/weixinh5/webapp/h774yvzC2xlB4bIgGfX2stc4kvC85J/cos/upload";
    
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Max-Age': '86400', // 24 hours
    };
    const responseHeaders = {
    ...corsHeaders,
    'Content-Type': 'application/json'
};

    if (request.method === 'OPTIONS') {
        return new Response(null, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400', // 24小时
            },
        });
    }
    let formData;
    // 将请求体解析为 FormData 对象
    formData = await request.formData();
    let fileData;
    // 获取文件
    fileData = formData.get("file");
    // 创建新的 FormData 对象并添加文件
    const newFormData = new FormData();
    newFormData.append("media", fileData, fileData.name);
    // 转发请求
     const response = await fetch(uploadUrl, {
            method: 'POST',
        //    headers: request.headers,
            body:    newFormData,
        });

        const jsonResponse = await response.json();
        const resurl = jsonResponse.url;
      // 返回响应
      if(resurl){
        const responseData = [{ src: resurl }]; // 修改为 JSON 格式
        return new Response(JSON.stringify(responseData), {
            status: response.status,
            headers: {
                ...responseHeaders,
                ...response.headers,
            },
        });
    }

      const responseD = [{ src: 'https://github.com/SokWith' }]; // 修改为 JSON 格式
      return new Response(JSON.stringify(responseD), {
        status: 200,
        headers: {
                ...responseHeaders,
                ...response.headers,
            },
      });    
}
