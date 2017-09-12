'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * banner 图片接口
     *
     */
    async bannerAction() {
        let bannerList = await this.model("banner").select();
        return this.success(bannerList);
    }

    /**
     * 推荐列表接口
     *
     */
    async recommendAction() {
        let recommendList = await this.model('message').where({
            recommend: '1'
        }).select();
        return this.success(recommendList);
    }

    /**
     * 分类接口
     *
     */
    async typeAction() {
        let typeList = await this.model('type').select();
        return this.success(typeList);
    }

    /**
     * 选项卡列表接口
     * @param page 当前页,默认第一页
     * @param size 每页条数,默认6条3行
     * @param type 显示类型,默认4（美甲）
     *
     */
    async pageAction() {
        let type = this.get("type") || 4;
        let list = await this.model('message').where({
            type: type
        }).order("show_time DESC").countSelect();
        return this.success(list);
    }
}