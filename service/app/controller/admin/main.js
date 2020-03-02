'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'api admin hi';
  }
  async checkLogin() {
    const { ctx } = this;
    const userName = ctx.request.body.userName;
    const password = ctx.request.body.password;
    const sql = " SELECT userName FROM admin_user WHERE userName = '" + userName +
                  "' AND password = '" + password + "'";
    const result = await this.app.mysql.query(sql);
    if (result.length > 0) {
      const openId = new Date().getTime();
      ctx.session.openId = { openId };
      ctx.body = { data: '登录成功', openId };
    } else {
      ctx.body = { data: '登录失败' };
    }
  }
  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };
  }
  async addArticle() {
    const { ctx } = this;
    const tmpArticle = ctx.request.body;
    const result = await this.app.mysql.insert('article', tmpArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    };
  }
  async updateArticle() {
    const { ctx } = this;
    const tmpArticle = ctx.request.body;
    const result = await this.app.mysql.update('article', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    ctx.body = {
      isSuccess: updateSuccess,
    };
  }
  async getArticleList() {
    const { ctx } = this;
    const sql = 'SELECT article.id as id ,' +
             'article.title as title ,' +
             'article.introduce as introduce ,' +
             "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime," +
             'article.view_count as view_count ,' +
             'type.typeName as typeName ' +
             'FROM article LEFT JOIN type ON article.type_id = type.id ' +
             'ORDER BY article.id DESC';
    const result = await this.app.mysql.query(sql);
    ctx.body = {
      list: result,
    };
  }
  async delArticle() {
    const { ctx } = this;
    const id = ctx.params.id;
    const result = this.app.mysql.delete('article', { id });
    ctx.body = { data: result };
  }
  async getArticleById() {
    const { ctx } = this;
    const id = ctx.params.id;
    const sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                'article.article_content as article_content,' +
                "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
                'article.view_count as view_count ,' +
                'type.typeName as typeName ,' +
                'type.id as typeId ' +
                'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
                'WHERE article.id=' + id;
    const result = await this.app.mysql.query(sql);
    ctx.body = { data: result };
  }
}

module.exports = MainController;
