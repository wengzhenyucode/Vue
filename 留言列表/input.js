Vue.component('vInput',{

    template:
    `
    <div>
        <span>昵称: </span>
        <input :value="_value" @input="handleInput"></input>
    </div>
    `,
    props:{
        value:{
            type:[String,Number],
            default:''
        }
    },
    data:function(){
        return {
            _value:this.value
        }
    },
    render:function(h){
        var _this=this;
        return h('div',[
            h('span','昵称: '),
            h('input',{
                attrs:{
                    type:'text'
                },
                domProps:{
                    value:this.value
                },
                on:{
                    input:function(event){
                    
                        _this._value=event.target.value;
                        _this.$emit('input', _this._value);
                    }
                }
            })
        ])
    },
    watch:{
        value:function(val){
            this._value=val;
        }

    }

})


Vue.component('vTextarea',{
    props:{
        value:{
            type:String,
            default:''
        }
    },
    data:function(){
       return {
           _value:this.value
       }
    },
    render:function(h){
        var _this=this;
        return h('div',[
            h('span','留言内容: '),
            h('textarea',{
                atter:{
                    placeholder:'请输入留言内容'
                },
                domProps:{
                    value: this.value
                },
                ref:'message',
                on:{
                    input:function(event){
                       
                        _this._value=event.target.value;
                        _this.$emit('input',_this._value);
                    }
                }
            })

        ])
    },
    methods:{
        focus:function(){
            this.$refs.message.focus();
        }
    },
    watch:{
        value:function(val){
            this._value=val;
        }
    }
})