 var app=new Vue({
     el:"#app",
     data:{

         lists:[{

                type:"电子商品",
                isCheckType:false,
                list:[

                    {
                        id:1,
                        name:"iphone7",
                        price:7199,
                        count:1,
                        checked:false
        
                     },
                     {
                         id:2,
                         name:"ipad Pro",
                         price:5888,
                         count:1,
                         checked:false
        
                     },
                     {
                         id:3,
                         name:"MacBook Pro",
                         price:21488,
                         count:1,
                         checked:false
        
                     },

                ]

            },
            {
                type:"生活用品",
                isCheckType:false,
                list:[

                    {
                        id:1,
                        name:"Bed",
                        price:500,
                        count:1,
                        checked:false
        
                     },
                     {
                         id:2,
                         name:"Chair",
                         price:100,
                         count:1,
                         checked:false
        
                     },
                     {
                         id:3,
                         name:"Pen",
                         price:10,
                         count:1,
                         checked:false
        
                     },

                ]

            },
            {
                type:"果蔬",
                isCheckType:false,
                list:[

                    {
                        id:1,
                        name:"Apple",
                        price:10,
                        count:1,
                        checked:false
        
                     },
                     {
                         id:2,
                         name:"Banana",
                         price:5,
                         count:1,
                         checked:false
        
                     },
                     {
                         id:3,
                         name:"Orange",
                         price:8,
                         count:1,
                         checked:false
        
                     },

                ]

            },

            
         ],
         allchecked:false
        

     },
     computed:{
         totalPrice:function(){

             var total=0;
             for(var i=0;i<this.lists.length;i++){
                 for(var j=0;j<this.lists[i].list.length;j++){

                    var item=this.lists[i].list[j];
                    if(item.checked){
                       total+=item.price*item.count;
                    }
                 }

                
                 
             }
             return total.toString().replace(/\B(?=(\D{3})+$)/g,',');
         }
    
     },
     methods:{
        handleReduce:function(index,subindex){

            if(this.lists[index].list[subindex].count===1) return;
            this.lists[index].list[subindex].count--;
        },
        handleAdd:function(index,subindex){

            this.lists[index].list[subindex].count++;
        },
        handleRemove:function(index,subindex){

            this.lists[index].list.splice(subindex,1);
        },
        handleSelected:function(index,subindex){
            
            this.lists[index].list[subindex].checked=this.lists[index].list[subindex].checked===true? false:true;
            if(this.lists[index].list[subindex]===false){
                this.lists[index].isCheckType=false;
            }
            for(var i=0;i<this.lists[index].list.length;i++){
                if(this.lists[index].list[i].checked===false){
                    this.lists[index].isCheckType=false;
                    break;
                }
                if(i===this.lists[index].list.length-1 && this.lists[index].list[i].checked){
                    this.lists[index].isCheckType=true;
                }
            }
            for(var i=0;i<this.lists.length;i++){

                if(this.lists[i].isCheckType===false){
                    this.allchecked=false;
                    break;
                }
                if(i===this.lists.length-1 && this.lists[i].isCheckType===true){

                    this.allchecked=true;
                }
            }
            
        },
        handleSelectType:function(index){
            this.lists[index].isCheckType=this.lists[index].isCheckType===true?false:true;

            if(this.lists[index].isCheckType){

                for(var i=0;i<this.lists[index].list.length;i++){

                    this.lists[index].list[i].checked=true
                }
            }else{
                for(var i=0;i<this.lists[index].list.length;i++){

                    this.lists[index].list[i].checked=false
                }
                this.allchecked=false
            }

            for(var i=0;i<this.lists.length;i++){

                if(this.lists[i].isCheckType===false){
                    this.allchecked=false;
                    break;
                }
                if(i===this.lists.length-1 && this.lists[i].isCheckType===true){

                    this.allchecked=true;
                }
            }

        },
        handleAllselected:function(){

            this.allchecked=this.allchecked===true?false:true;

            if(this.allchecked){

                for(var i=0;i<this.lists.length;i++){

                    var item=this.lists[i];
                    item.isCheckType=true; 
                    for(var j=0;j<item.list.length;j++){
                        var subitem=item.list[j];
                        subitem.checked=true;
                    }
                }

            }else{

                for(var i=0;i<this.lists.length;i++){

                    var item=this.lists[i];
                    item.isCheckType=false; 
                    for(var j=0;j<item.list.length;j++){
                        var subitem=item.list[j];
                        subitem.checked=false;
                    }
                }
            }
        }

     }
 });