###接口整理

1. 登录（暂时支持邮箱登录）
>接口：/login
>方式: post
>参数：email, password

2. 注册(暂时支持邮件注册)
>接口：/register
>方式: post
>参数：email, password

-----------------------------
###### 以下接口前面统一加 /user

3. 发起邮箱验证(在用户的邮箱验证链接过期以后，登录时提醒需要验证邮箱是需要)
>接口：/verifyEmail
>方式: get
>参数：token

4. 邮箱验证(用于邮箱验证的链接的页面中的邮箱验证确认)
>接口：/verifyToken
>方式: get
>参数：token

5. 刷新登录状态
>接口：/refresh
>方式: get
>参数：token （存于headers中或者直接是参数）

6. 查询用户信息
>接口：/getById
>方式: get
>参数：id ( 所有的id都是数据的_id字段 )

7. 通过邮箱修改用户密码
>接口：/changePasswordByEmail
>方式: get
>参数：email

8. 邮箱验证后用过token修改密码
>接口： /changeUserPasswordBytoken
>参数：token（可以放在请求头里 也可以是参数）, password


9. 修改用户信息
>接口：/updateUserInfoById (post)
>参数：id, username(等其他用户信息),thumbnail(用户头像，formdata add时需要在id字段之后添加)

10. 通过老密码设置新密码
>接口：/changePwdByOldPwd
>方法: get
>参数：id, oldPwd, newPwd

-----------------------------

### 注册模块修改 
> 全部路由统一前面加 /signup

11. 邮箱注册
> 接口：/email 
> 方法: post
> 参数：基本用户信息(字段参考model)以及email
 
12. 手机注册获取验证码
> 接口：/getVerifyCode 
> 方法: get
> 参数：phone
> 备注：返回结果中： 
    status: 0， 代表报错
    status: 1， 代表该用户已经注册过了，无需再次注册
    正常就是result:'OK',并返回一个token（里面包含code信息，用于验证code）
 
13. 手机注册验证码验证
> 接口：/verifyCode 
> 方法: get
> 参数：token,code；
> 备注：返回结果中： 
    status: 0， 代表token有问题，如：已过期，不合法的
    status: 1， 代表该用户输入的验证码不对
    正常就是result:'OK'
 
14. 手机注册(最后一步)
> 接口：/phone 
> 方法: post
> 参数：基本用户信息(字段参考model)以及phone,token(验证码的token，避免跳过验证直接发送注册请求)


### 登录模块修改 
> 全部路由统一前面加 /login

14. 邮箱号登录
> 接口：/email 
> 方法: post
> 参数：email, password
> 备注： 返回中state,1:正常， 2：封号， 0：未激活（未激活的账号应该提供重新激活相关的操作流程）


15. 手机号登录（密码）
> 接口：/phone 
> 方法: post
> 参数：phone, password
> 备注： 返回中state,2：封号， 其他正常


16. 手机号登录 —— 验证码登录——获取验证码
> 接口：/getVerifyCode 
> 方法: get
> 参数：phone
> 备注： 返回中status,0：创建用户报错（正常报错）， 1：发送验证码失败

17. 手机号登录 —— 验证码登录 —— 验证码验证
> 接口：/verifyCode 
> 方法: get
> 参数: token, code
> 备注： 返回中status,0：非法token或者已过期的token， 1：验证码错误

18. 手机号登录（验证码）
> 接口：/phone/verifyCode 
> 方法: post
> 参数：phone, token
> 备注： 返回中state,2：封号， 其他正常

19. 微信登录
> 接口：/WeChat
> 方法: post
> 参数：code
> 备注： 返回中state,2：封号， 其他正常， 返回中包含了用户数据以及用户微信中的数据（用户名、头像）

### * 所有手机验证码验证统一使用 /user/verifyPhonecode 接口

20. 手机号修改密码（发送验证码）
> 接口：/user/phone/changPwdCode
> 方法: get
> 参数：phone

21. 手机号修改密码（修改密码）
> 接口：/user/phone/changePassword
> 方法: post
> token,password
