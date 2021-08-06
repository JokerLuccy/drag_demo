一个低代码平台的前端部分，靠拖拉拽生成页面。

### 模拟数据说明

​	1.设计页面，保存，从localStorage中复制 canvasData 中的数据

​	2.在测试项目中的Home文件的componentData 替换即可

## 文档
1.子组件回调事件 第一行写注释(子组件暴露出的事件名，格式固定) // @change@ \
2.代码编辑器最后一行不能写注释

3.组件中如果用到暴露出函数 在component-list 文件中的callBackEvents中加入，最后会释放

4.组合组件中的配置项，定义在component-list 文件的data的config中，一些状态信息直接定义在data中即可

## 组件说明
```javascript
1.VSwitch
	可修改属性
    	width: Number,
    	height: Number,
    	backgroundColor: String,
    	borderRadius: Number,
    默认数据
		data:{
           flag:false // 关闭 不可修改
        }
	暴露函数
    	change-开关改变时触发
2.VIcon
	可修改属性
    	width:Number,// 与字体大小保持一致，涉及到组合问题
        height:Number,// 与字体大小保持一致，涉及到组合问题
    	fontSize: Number,
        fontWeight: Number,
        color: String,
   	默认数据
		propValue:'icontupian',//在最底下输入框修改即可
3.VInput
	可修改属性:
		 width: Number,
         height: Number,
         fontSize: Number,
         fontWeight: Number,
         lineHeight: String,
         letterSpacing: Number,
         textAlign: String,
         color: String,
         borderColor: String,
         borderWidth: Number,
         backgroundColor: String,
         borderStyle: String,
         verticalAlign: String,
         type: String,
         borderRadius:String,
     默认数据：
		 propValue:'请输入数据',// 不可修改，后期完善
4.VText
	可修改属性:
		  width: Number,
          height: Number,
          fontSize: Number,
          fontWeight: Number,
          lineHeight: String,
          letterSpacing: Number,
          textAlign: String,
          color: String,
     默认数据:
		  propValue:'双击编辑文字',// 可修改
5.VButton
	可修改属性:
		  width: Number,
          height: Number,
          borderWidth: Number,
          borderColor: String,
          borderRadius: String,
          fontSize: Number,
          fontWeight: Number,
          lineHeight: String,
          letterSpacing: Number,
          textAlign: String,
          color: String,
          backgroundColor: String,
          boxShadow: String,
     默认数据:
		  propValue:'按钮',// 可修改 后期会加上禁用属性
     暴露函数
		  click,// 直接在click事件中添加即可
6.VSwitchText
	可修改属性:
		   width: Number,
           height: Number,
           backgroundColor: String,
           color: String,
           fontSize: Number,
           fontWeight: Number,
           borderColor: String,
           borderWidth: Number,
           borderRadius: Number,
           borderStyle: String,
     默认数据:
     	   propValue:['中','EN'],// 可修改，如果传入icon 直接传入 类名即可
     暴露函数
		   change-开关改变时触发
 7.VTitle
 	 可修改属性:
		   width: Number,
           height: Number,
           fontSize: Number,
           backgroundColor: String,
           color: String,
     默认数据:
           propValue:
           				{ left: String, // 左侧图标 
              			  center: String,// 中间文字
                          right:String // 右侧图标(待实现 插入图片功能)
                        }
		
	 暴露函数：
     		vTitleLeftClick-点击左侧图标触发
			vTitleRightClick-点击右侧图标触发
		 
```

