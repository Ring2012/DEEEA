'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * 详情列表接口
     * @param type 显示类型
     * @param title 项目标题
     *
     */
    async formAction() {
        let user = {};
        user.openid = this.get("openid");
        user.name = this.get("name");
        user.phone = this.get("phone");
        user.pay_way = this.get("pay_way");
        user.projectName = this.get("title");
        user.title_img = this.get("imgUrl");
        user.type = this.get("type");
        user.remark = this.get("remark");
        user.price = this.get("price");
        user.time = this.get("time");
        user.timer = this.get("timer");
        let list = await this.model('users').add(user);
        return this.success(user);
    }
}