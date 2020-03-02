import React, { useState, useEffect } from 'react'
import { List, Row, Col, Modal, message, Button } from 'antd'
import { getArticleList, delArticle } from '../request'
import '../static/css/articleList.css'

const { confirm } = Modal

const ArticleList = (props) => {
  const [list, setList] = useState([])
  useEffect(() => {
    getList()
  }, [])
  const getList = async () => {
    const result = await getArticleList()
    setList(result.data.list)
  }
  const delArticleConfirm = id => {
    confirm({
      title: '确定删除这篇文章吗?',
      onOk: async () => {
        const result = await delArticle(id)
        if(result.status === 200) {
          message.success('文章删除成功')
          await getList()
        }
      }
    })
  }
  const updateArticle = (id) => {
    props.history.push(`/index/add/${id}`)
  }
  return (
    <div>
      <List 
        header={
          <Row className="list-div">
            <Col span={8}><b>标题</b></Col>
            <Col span={4}><b>类别</b></Col>
            <Col span={4}><b>发布时间</b></Col>
            <Col span={4}><b>浏览量</b></Col>
            <Col span={4}><b>操作</b></Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Row className="list-div">
              <Col span={8}>{item.title}</Col>
              <Col span={4}>{item.typeName}</Col>
              <Col span={4}>{item.addTime}</Col>
              <Col span={4}>{item.view_count}</Col>
              <Col span={4}>
                <Button type="primary" onClick={() => updateArticle(item.id)} size="small">修改</Button>&nbsp;
                <Button type="danger" onClick={() => delArticleConfirm(item.id)} size="small">删除</Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  )
}

export default ArticleList