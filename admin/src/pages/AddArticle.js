import React, { useState,useEffect } from 'react'
import { Select, Button, DatePicker, Row, Col, Input, message, } from 'antd'
import marked from 'marked'
import '../static/css/addArticle.css'
import { getTypeInfo, addArticle, updateArticle, getArticleById } from '../request'

const { Option } = Select
const { TextArea } = Input

const AddArticle = (props) => {
  const [defaultMarkdownContent, defaultIntroducehtml] = ['预览内容', '预览简介']
  const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState('')   //文章标题
  const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState(defaultMarkdownContent) //html内容
  const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState(defaultIntroducehtml) //简介的html内容
  const [showDate, setShowDate] = useState()   //发布日期
  // const [updateDate, setUpdateDate] = useState() //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType, setSelectType] = useState() //选择的文章类别
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

  useEffect(() => {
    //获取文章类别
    asyncGetTypeInfo()
    //获取文章id
    const tmpId = props.match.params.id
    console.log(tmpId)
    if(tmpId) {
      setArticleId(tmpId)
      asyncGetArticleById(tmpId)
    }
  }, [])

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
  const selectTypeHandler = value => setSelectType(value)
  const saveArticle = async () => {
    if(!selectedType) {
      message.error('必须选择文章类型')
      return
    }
    if(!articleTitle) {
      message.error('文章标题不能为空')
      return
    }
    if(!articleContent) {
      message.error('文章内容不能为空')
      return
    }
    if(!introducemd) {
      message.error('文章简介不能为空')
      return
    }
    if(!showDate) {
      message.error('发布日期不能为空')
      return
    }
    const dataProps = {
      type_id: selectedType,
      title: articleTitle,
      article_content: articleContent,
      introduce: introducemd,
      addTime: (new Date(showDate.replace('-', '/')).getTime()) / 1000
    }
    if(articleId === 0) {
      dataProps.view_count = 0
      const result = await addArticle(dataProps)
      setArticleId(result.data.insertId)
      if(result.data.isSuccess) {
        message.success('文章添加成功')
      } else {
        message.error('文章添加失败')
      }
    } else {
      dataProps.id = articleId
      const result = await updateArticle(dataProps)
      if(result.data.isSuccess) {
        message.success('文章修改成功')
      } else {
        message.error('文章修改失败')
      }
    }
  }
  const asyncGetTypeInfo = async () => {
    const result = await getTypeInfo();
    if(result.data.data === '没有登录') {
      localStorage.removeItem('openId')
      props.history.push('/login')
    }else {
      setTypeInfo(result.data.data)
    }
  }
  const asyncGetArticleById = async (id) => {
    const result = await getArticleById(id)
    console.log(result)
    const articleInfo = result.data.data[0]
    const { title, article_content, introduce, addTime, typeId } = articleInfo
    const html = marked(article_content)
    const tmpInt = marked(introduce)
    setArticleTitle(title)
    setArticleContent(article_content)
    setMarkdownContent(html)
    setIntroducemd(introduce)
    setIntroducehtml(tmpInt)
    setShowDate(addTime)
    setSelectType(typeId)
  }
  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input 
                placeholder="博客标题" 
                value={articleTitle}
                onChange={e => setArticleTitle(e.target.value)} 
                size="large" 
              />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select 
                size="large" 
                style={{width: '95%'}}
                value={selectedType}
                onChange={selectTypeHandler}
                placeholder="文章类别"
              >
                {
                  typeInfo.map(item => (
                    <Option key={item.id} value={item.id}>{item.typeName}</Option>
                  ))
                }
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                value={articleContent}
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
              <Button size="large" type="primary" onClick={saveArticle}>发布文章</Button>
            </Col>
            <br />
            <Col span={24}>
              <br />
              <TextArea
                rows={4}
                placeholder="文章简介"
                value={introducemd}
                onChange={changeIntroduce}
              />
              <br /><br />
              <div className="introduce-html" dangerouslySetInnerHTML={{__html: introducehtml}}></div>
            </Col>
            <Col span={24}>
              <div className="date-select">
                <DatePicker
                  placeholder="发布日期"
                  onChange={(date, dateString) => setShowDate(dateString)}
                  size="large"
                />
              </div>
            </Col>
            {/* <Col span={24}>
              <div className="date-select">
                <DatePicker
                  placeholder="修改日期"
                  onChange={(date, dateString) => setUpdateDate(dateString)}
                  size="large"
                />
              </div>
            </Col> */}
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default AddArticle