import React, { useState, useEffect, useRef } from 'react'
import { Card, Input, Icon, Button, Spin, message } from 'antd'
import { checkLogin } from '../request'
import '../static/css/login.css'

const Login = (props) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    return () => clearTimeout(timer.current)
  }, [])
  const CloseLoading = () => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }
  const handleSubmit = async () => {
    setIsLoading(true)
    if(!userName) {
      message.error('用户名不能为空')
      CloseLoading()
      return false
    }
    if(!password) {
      message.error('密码不能为空')
      CloseLoading()
      return false
    }
    let dataProps = {
      userName,
      password
    }
    const result = await checkLogin(dataProps)
    if(result.data.data === '登录成功') {
      localStorage.setItem('openId', result.data.openId)
      setIsLoading(false)
      props.history.push('/index')
    }else {
      message.error('用户名或密码错误')
      CloseLoading()
    }
  }
  return (
    <div className="login-div">
      <Spin tip="Loading..." spinning={isLoading}>
        <Card title="Wcq blog System" bordered style={{width: 400}} >
          <Input
            id="userName"
            size="large"
            placeholder="Enter your UserName"
            prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0, .25'}} />}
            onChange={e => setUserName(e.target.value)}
          />
          <br/><br/>
          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your PassWord"
            prefix={<Icon type="key" style={{color: 'rgba(0, 0, 0, .25'}} />}
            onChange={e => setPassword(e.target.value)}
          />
          <br/><br/>
          <Button type="primary" size="large" block onClick={handleSubmit}>Login In</Button>
        </Card>
      </Spin>
    </div>
  )
}

export default Login