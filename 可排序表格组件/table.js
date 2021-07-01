Vue.component('vTable',{

    template:
    `<table>
           <colgroup>
                <col v-for="item in currentColumns" :key="item.key":style="{width:item.width}" ">
           </colgroup> 
           <thead>
                <tr>
                    <template v-for="(col,index) in columns">
                        <th v-if="col.sortable" :key=col.title>
                            <span>{{col.title}}</span>
                            <a :class="{on:col.sortType==='asc'}"  @click="handleSortByAsc(index)">↑</a>
                            <a :class="{on:col.sortType==='desc'}" @click="handleSortByDesc(index)">↓</a>
                        </th>
                        <th v-else :key="col.title">
                            {{col.title}}
                        </th>
                    </template>
                </tr>
           </thead>
           <tbody>
                <tr v-for="row in currentData" :key="row.name">
                    <td v-for="cell in currentColumns" :key="cell.key">
                        {{row[cell.key]}}
                    </td>
                </tr>
           </tbody>
    
    </table>`,
    props:{
        columns:{
            type:Array,
            default:function(){
                return [];
            }
        },
        data:{
            type:Array,
            default:function(){
                return [];
            }
        }
    },
    data:function(){
        return {
            currentColumns:[],
            currentData:[]
        }
    },
    methods:{
        makeColums:function(){
            this.currentColumns=this.columns.map(function(col,index){
                //添加一个字段标识当前列排序的状态，后续使用
                col._sortType='normal';
                //添加一个字段标识当前列在数组中的索引，后续使用
                col._index=index;
                return col;
            });
        },
        makeData:function(){
            this.currentData=this.data.map(function(row,index){
                //添加一个字段标识当前行在数组中的索引，后续使用
                row._index=index;
                return row;
            });
        },
        handleSortByAsc:function(index){
            var key=this.currentColumns[index].key;
            this.currentColumns.forEach(function(col){
                col._sortType='normal';
            });
            this.currentColumns[index]._sortType='asc';
            this.currentData.sort(function(a,b){
                return a[key]>b[key]?1:-1;
            });
        },
        handleSortByDesc:function(index){
            var key=this.currentColumns[index].key;
            this.currentColumns.forEach(function(col){
                col._sortType='normal';
            });
            this.currentColumns[index]._sortType='desc';
            this.currentData.sort(function(a,b){
                return a[key]<b[key]?1:-1;
            });
        }
    },
    mounted(){
        //v-table 初始化时使用
        this.makeColums();
        this.makeData();
    },
    watch:{
        data:function(){
            this.makeData();
            var sortedColumn=this.currentColumns.filter(function(col){
                return col._sortType!=='normal';
            });

            if(sortedColumn.length>0){
                if(sortedColumn[0]._sortType==='asc'){
                    this.handleSortByAsc(sortedColumn[0]._index);
                }else{
                    this.handleSortByDesc(sortedColumn[0]._index);
                }
            }
        }
    },
    // render:function(h){

    //     var _this=this;
     
    //     var trs=[];
    //     this.currentData.forEach(function(row){
    //         var tds=[];
    //         _this.currentColumns.forEach(function(cell){
    //             tds.push(h('td',row[cell.key]));
    //         });
    //         trs.push(h('tr',tds));
    //     });
    //     var ths=[];
    //     this.currentColumns.forEach(function(col,index){
    //         if(col.sortable){
    //             ths.push(h('th',[
    //                 h('span',col.title),
    //                 //升序
    //                 h('a',{
    //                     class:{
    //                         on:col._sortType==='asc'
    //                     },
    //                     on:{
    //                         click:function(){
    //                             _this.handleSortByAsc(index)
    //                         }
    //                     }
    //                 },'↑'),
    //                 //降序
    //                 h('a',{
    //                     class:{
    //                         on:col._sortType==='desc'
    //                     },
    //                     on:{
    //                         click:function(){
    //                             _this.handleSortByDesc(index)
    //                         }
    //                     }
    //                 },'↓')
    //             ]));
    //         }else{
    //             ths.push(h('th',col.title));
    //         }
    //     });
    //     var cols=[];
    //     this.currentColumns.forEach(function(col,index){
    //         cols.push(h('col',{
    //             style:{
    //                 width:col.width
    //             }
    //         }))
    //     });
    //     return h('table',[
    //         h('colgroup',cols),
    //         h('thead',[
    //             h('tr',ths)
    //         ]),
    //         h('tbody',trs)
    //     ])
    // }
})