var day={

    getUnix:function(){
        var date=new Date();
        return date.getTime();
    },

    

    getFormatDates:function(timestamp){
        var now= this.getUnix();
        var timer=(now-timestamp)/1000;
        var dates=Math.floor(timer/86400);
        
        return dates;
    },

    getFormatAges:function(timestamp){
        var dates=this.getFormatDates(timestamp);
        var year=Math.floor(dates/365);
        var remain_days=Math.floor(dates%365);
        var month=Math.floor(remain_days/30);
        var day=Math.floor(remain_days %30);

        var tip="您今年"+year+"岁"+month+'个月'+day+'天';
        return tip;
    }



}



Vue.directive('birthday',{
    bind:function(el,binding){

        el.innerHTML="您已经出生了:"+day.getFormatDates(binding.value)+"天" +'<br />'+ day.getFormatAges(binding.value);
        el._timeout_=setInterval(function(){
            el.innerHTML="您已经出生了:"+day.getFormatDates(binding.value)+"天"+'<br />'+ day.getFormatAges(binding.value);
        },86400);

    },
    unbind:function(el){

        clearInterval(el._timeout_);
        delete el._timeout_;

    }  
})