import React, { useState } from 'react'
import { Select, Button, DatePicker, Row, Col, Input, } from 'antd'
import marked from 'marked'
import '../static/css/addArticle.css'

const { Option } = Select
const { TextArea } = Input

const AddArticle = () => {
  const [defaultMarkdownContent, defaultIntroducehtml] = ['预览内容', '预览简介']
  const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState('')   //文章标题
  const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState(defaultMarkdownContent) //html内容
  const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState(defaultIntroducehtml) //简介的html内容
  const [showDate, setShowDate] = useState()   //发布日期
  const [updateDate, setUpdateDate] = useState() //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType, setSelectType] = useState(1) //选择的文章类别
  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  }); 
  const changeContent = (e) => {
    const value = e.target.value === '' ? defaultMarkdownContent : e.target.value
    setArticleContent(value)
    const html = marked(value)
    setMarkdownContent(html)
  }
  const changeIntroduce = (e) => {
    const value = e.target.value === '' ? defaultIntroducehtml : e.target.value
    setIntroducemd(value)
    const html = marked(value)
    setIntroducehtml(html)
  }
  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input placeholder="博客标题" size="large" />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select defaultValue="1" size="large">
                <Option value="1">视频教程</Option>
                <Option value="2">养猫日记</Option>
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                onChange={changeContent}
                placeholder="文章内容"
              />
            </Col>
            <Col span={12}>
              <div className="show-html" dangerouslySetInnerHTML={{__html: markdownContent}}></div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button>&nbsp;
              <Button size="large" type="primary">发布文章</Button>
            </Col>
            <br />
            <Col span={24}>
              <br />
              <TextArea
                rows={4}
                placeholder="文章简介"
                onChange={changeIntroduce}
              />
              <br /><br />
              <div className="introduce-html" dangerouslySetInnerHTML={{__html: introducehtml}}></div>
            </Col>
            <Col span={24}>
              <div className="date-select">
                <DatePicker
                  placeholder="发布日期"
                  size="large"
                />
              </div>
            </Col>
            <Col span={24}>
              <div className="date-select">
                <DatePicker
                  placeholder="修改日期"
                  size="large"
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default AddArticle