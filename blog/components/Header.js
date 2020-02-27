import { useState, useEffect } from 'react'
import Router, { withRouter } from 'next/router'
import '../public/style/components/header.css'
import { Row, Col, Menu, Icon, Affix } from 'antd'
import { getTypeInfo } from '../request/index'

const Header = ({ router }) => {
  const id = router.query.id || '0';
  const [navArray, setNavArray] = useState([])
  const [activeType, setActiveType] = useState(id)
  useEffect(() => {
    setActiveType(id)
  })
  useEffect(() => {
    const fetchData = async () => {
      const result = await getTypeInfo()
      setNavArray(result.data.data)
    }
    fetchData()
  }, [])
  const handleClick = (e) => {
    const key = parseInt(e.key)
    if(key === 0) {
      Router.push('/')
    }else {
      Router.push(`/list?id=${key}`)
    }
  }
  return (
    <Affix offsetTop={0}>
      <div className="header">
        <Row type="flex" justify="center">
          <Col xs={22} sm={22} md={10} lg={12} xl={12}>
            <span className="header-logo">wcq</span>
            <span className="header-text">专注前端开发，早日实现财务自由。</span>
          </Col>
          <Col xs={2} sm={2} md={14} lg={10} xl={10}>
            <Menu 
              mode="horizontal" 
              selectedKeys={[activeType]}
              overflowedIndicator={<Icon type="menu" />}
              onClick={handleClick}
            >
              <Menu.Item key="0">
                <Icon type="home" />
                首页
              </Menu.Item>
              {
                navArray.map(item => (
                  <Menu.Item key={String(item.id)}>
                    <Icon type={item.icon} />
                    {item.typeName}
                  </Menu.Item>
                ))
              }
            </Menu>
          </Col>
        </Row>
      </div>
    </Affix>
  )
}

export default withRouter(Header)