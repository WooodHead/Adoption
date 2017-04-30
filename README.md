# Adoption

## 第一迭代：上传图片后保存到服务器中，数据保存到SQL

> ## input type="file" 上传多张图片
解决方案：每次只能选择一张图片（不设置multiple），name设置为数组就可以保存多个文件，如：  

`
<input type="file" name="photos[]" id="photos1" onchange="selectImage(this)" class="upload_photo">
`
需要注意的是，在后端处理时： `var upload = multer.array("photos[]", 6);`  


> ## multer组件:

1. Multer 不会处理任何非 multipart/form-data 类型的表单数据.  
解决方案： 在form元素上加 `enctype=‘multipart/form-data’`  

2. 确保你总是处理了用户的文件上传. 永远不要将multer作为全局中间件使用，因为恶意用户可以上传文件到一个你没有预料到的路由，应该只在你需要处理上传文件的路由上使用.
解决方案：将multer处理文件的过程单独放在一个文件里

3. 
