import { type AxiosResponse } from 'axios';

export function blobDownload (res: AxiosResponse, mimeType: string) {
 let blob = new Blob([res.data], { type: mimeType }); //application/vnd.openxmlformats-officedocument.wordprocessingml.document这里表示doc类型
 let contentDisposition = res.headers['content-disposition'];  //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
 let patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
 let result = patt.exec(contentDisposition);
 let filename = decodeURIComponent((result && result[1]) || ('fn_' + Date.now()));
 let downloadElement = document.createElement('a');
 let href = window.URL.createObjectURL(blob); //创建下载的链接
 downloadElement.style.display = 'none';
 downloadElement.href = href;
 downloadElement.download = filename; //下载后文件名
 document.body.appendChild(downloadElement);
 downloadElement.click(); //点击下载
 document.body.removeChild(downloadElement); //下载完成移除元素
 window.URL.revokeObjectURL(href);
}