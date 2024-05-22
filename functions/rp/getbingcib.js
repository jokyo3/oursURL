// functions/rp/getbingcib.js
export async function onRequest(context) {
 // 从环境变量中获取数据库连接
  const database = context.env.webpho_db;
 // const { username, dirName } = await context.request.json();
 // const fullname = `${username}_${dirName}`;

  const cibname = await fetchAndExtractVariableString();
  //console.log('CIB Name:', cibname);
  
  return new Response(cibname, { status: 200 }); 
}


async function fetchAndExtractVariableString(url = 'https://sokwith-proxybing.hf.space/chat?q=Microsoft+Copilot&FORM=hpcodx') {
  try {
    // 使用fetch API获取网页内容
    const response = await fetch(url);
   const resBody = response.body;
    //const htmlContent = await response.text();
   // 首先，将 ReadableStream 转换为 ArrayBuffer
  const buffer = await new Response(resBody).arrayBuffer();
  // 然后，将 ArrayBuffer 转换为字符串
  const htmlContent = new TextDecoder("utf-8").decode(buffer);
    console.log('CIBHTML:', htmlContent);
    // 正则表达式匹配特定的data-ajaxResKey和变化的src属性
    // 注意：由于 HTML 可能包含换行符，我们使用 [\s\S]*? 来匹配任意字符，包括换行符
   // const regex = /data-ajaxResKey="rms:answers:CodexBundle:cib-bundle"[\s\S]*?src="https:\/\/r\.bing\.com\/rp\/(.*?\.br\.js)"/;
   //  const regex = /data-ajaxResKey="rms:answers:CodexBundle:cib-bundle"[\s\S]*?src="https:\/\/r\.bing\.com\/rp\/([^"]+)\.br\.js"/; 
    const regex = /rms:answers:CodexBundle:cib-bundle[\s\S]*?\.js/;

   const match = htmlContent.match(regex);
    // 如果匹配成功，返回变化的字符串
    if (match) {
      return match[0];
    } else {
      console.log('No matching string found. Returning default string.');
      return "AAA-Kc8IFliASxPpbk8y8d9exvjtdg"; // 返回的默认字符串不带引号
    }
  } catch (error) {
    console.error('Fetching failed:', error);
    return "AAA-Kc8IFliASxPpbk8y8d9exvjtdg"; // 返回的默认字符串不带引号
  }
}

// 调用函数，如果不传入任何参数，它将使用默认的网页地址
// fetchAndExtractVariableString().then(matchedString => console.log(matchedString));
