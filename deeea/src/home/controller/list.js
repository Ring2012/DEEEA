'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * 分类卡列表接口
     * @param page 当前页,默认第一页
     * @param size 每页条数,默认8条4行
     * @param type 类型
     */
    async pageAction() {
        let page = this.get("page") || 1;
        let size = this.get("size") || 8;
        let type = this.get("type");
        let list = await this.model('message').where({
            type: type
        }).page(page, size).order("show_time DESC").countSelect();
        return this.success(list);
    }
}