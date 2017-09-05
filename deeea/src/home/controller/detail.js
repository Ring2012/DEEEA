'use strict';

import Base from './base.js';

export default class extends Base {

    /**
     * 详情列表接口
     * @param type 显示类型
     * @param title 项目标题
     *
     */
    async detailAction() {
        let type = this.get("type");
        let title = this.get("title");
        let list = await this.model('message').where({
            type: type,
            title: title
        }).select();
        return this.success(list);
    }
}