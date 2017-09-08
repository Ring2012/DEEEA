'use strict';

import Base from './base.js';

export default class extends Base {

    /**
     * 我的订单列表接口
     * @param openid 用户id
     * @param order_status 预约状态 0-未完成  1-完成
     */
    async orderAction() {
        let openid = this.get("openid");
        let list = await this.model('users').where({
            openid: openid,
            order_status: 0
        }).order("timer DESC").countSelect();
        return this.success(list);
    }

    /**
     * 预约订单列表接口
     * @param openid 用户id
     */
    async mineAction() {
        let openid = this.get("openid");
        let list = await this.model('users').where({
            openid: openid
        }).order("timer DESC").countSelect();
        return this.success(list);
    }
}