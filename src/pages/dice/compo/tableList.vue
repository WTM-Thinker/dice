<template>
    <div class="__tb" v-loading="loading">
        <div class="__tb_row __tb_head __pointer">
            <div v-for="(headItem, i) in headList" :key="i" 
                    class="__tb_cell" :class="headItem.class || ''">
                {{ headItem.text || '' }}
            </div>
        </div>

        <div ref="tableContent" class="__tb_content" v-show="contentList && contentList.length">
            <div v-for="(rowItem, index) in contentList" :key="index"
                    class="__tb_row __tb_content_row" :class="{
                        'active': !!clickRow,
                        '__pointer': !!clickRow
            }" @click="_clickRow(rowItem)">
                <span v-for="(headItem, i) in headList" :key="i" 
                        @click="clickCell(headList[i].cell, rowItem, index)"
                        v-html="rowItem[ headList[i].cell ]" 
                        :class="headItem.class || ''" class="__tb_cell">{{ i }}
                </span>
            </div>
        </div>
        <div class="__tb_content __tb_no_data" v-show="!contentList || !contentList.length">
            noData
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        headList: {
            type: Array,
            default: () => {
                return [];
            }
        },
        contentList: {
            type: Array,
            default: () =>{
                return [];
            }
        },
        clickRow: null,
        clickCell: {
            type: Function,
            default: ()=>{}
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        _clickRow(item) {
            this.clickRow && this.clickRow(item);
        }
    }
};
</script>

<style lang="scss" scoped>
.__tb {
    color: white;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
    position: relative!important;
    font-family:PingFangSC-Semibold;
    font-size: 12px;
    .__tb_content {
        position: relative;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .__tb_no_data {
        height: 75px;
        line-height: 75px;
        text-align: center;
    }
    .__tb_pagination {
        height: 75px;
        line-height: 75px;
        text-align: center;
        border-top: 1px solid #f3f6f9;
    }

    .__tb_head {
        flex: none;
        font-family: PingFang-SC-Regular;
    }
    .__tb_row {
        display: flex;
        justify-content: space-between;
        height: 28px;
        line-height: 28px;
        box-sizing: border-box;
        &:nth-child(even) {
            background: rgba(230,255,218,0.11);
        }
    }
    .__tb_content_row {
        border: none;
    }

    .__tb_cell {
        display: inline-block;
        text-align: left;
        &:first-child {
            padding-left: 22.5px;
        }
        &:last-child {
            padding-right: 22.5px;
        }
    }
    @media only screen and (max-width: 500px) {
        .__tb_cell {
            white-space: nowrap;
            &:first-child {
                float: left;
                padding-left: 5px;
            }
            &:last-child {
                float: right;
                padding-right: 10px;
            }
        }
    }
}
</style>
