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
    // const sql = 'SELECT userName FROM admin_user WHERE ' +
    //             'userName = ' + userName + 'AND password = ' + password;
    const result = await this.app.mysql.query(sql);
    if (result.length > 0) {
      const openId = new Date().getTime();
      ctx.session.openId = { openId };
      ctx.body = { data: '登录成功', openId };
    } else {
      ctx.body = { data: '登录失败' };
    }
  }
}

module.exports = MainController;
