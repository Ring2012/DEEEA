'use strict';

import Base from './base.js';

export default class extends Base {
    indexAction() {
        //auto render template file index_index.html
        return this.display();
    }

    //-----------------预约--------------------------------------
    /**
     * 获取预约列表接口
     * @param page 当前页,默认第一页
     * @param size 每页条数,默认4条
     * @param order_status 订单状态  0==未完成
     *
     */
    async makeAction() {
        let page = this.get("page") || 1;
        let size = this.get("size") || 4;
        let list = await this.model('users').where({
            order_status: 0
        }).page(page, size).order("timer DESC").countSelect();
        return this.success(list);
    }

    /**
     * 预约处理接口
     * @param beautician 服务老师
     * @param servicing_time 服务时间
     *
     */
    async makesAction() {
        let user = {};
        user.beautician = this.get("beautician");
        user.order_status = 1;
        user.servicing_time = this.get("servicing_time");
        let list = await this.model('users').add(user);
        return this.success(user);
    }

    //-----------------订单--------------------------------------
    /**
     * 获取预约列表接口
     * @param page 当前页,默认第一页
     * @param size 每页条数,默认4条
     * @param pay_status 支付状态  0==未完成
     *
     */
    async orderAction() {
        let page = this.get("page") || 1;
        let size = this.get("size") || 4;
        let list = await this.model('users').where({
            pay_status: 0
        }).page(page, size).order("timer DESC").countSelect();
        return this.success(list);
    }

    /**
     * 订单处理接口
     * @param pay_status 支付状态
     *
     */
    async ordersAction() {
        let user = {};
        user.order_status = 1;
        let list = await this.model('users').add(user);
        return this.success(user);
    }

    //-----------------历史--------------------------------------
    /**
     * 获取预约列表接口
     * @param page 当前页,默认第一页
     * @param size 每页条数,默认4条
     * @param pay_status 支付状态  0==未完成
     *
     */
    async recordAction() {
        let page = this.get("page") || 1;
        let size = this.get("size") || 4;
        let list = await this.model('users').where({
            order_status: 1,
            pay_status: 1
        }).page(page, size).order("timer DESC").countSelect();
        return this.success(list);
    }
	
}