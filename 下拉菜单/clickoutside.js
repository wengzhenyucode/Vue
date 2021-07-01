Vue.directive('clickoutside',{
    bind:function(el,binding,vnode){
        function documentHandler(e){

            console.log("e=%o",e);
  
            if(el.contains(e.target)){
                return false;
            }
            console.log("binding.expression=%o",binding.expression);
            console.log("binding.value=%o",binding.value);
            if(binding.expression){
                binding.value(e);
            }
          
        }

        function handlerEsc(e){

            if(binding.modifiers.esc)
            {
                if(e.keyCode==27){
                    binding.value(e);
                }
            }
           
        }
        console.log("el=%o",el);
        el._vueClickOutside_=documentHandler;
        el._vueEscOutside_=handlerEsc;
        document.addEventListener('click',documentHandler);
        document.addEventListener('keyup',handlerEsc);
            
    },
    unbind:function(el,binding){
        document.removeEventListener('click',el._vueClickOutside_);
        document.removeEventListener('keyup',el._vueEscOutside_);
        delete el._vueClickOutside_;
        delete  el._vueEscOutside_;
    },
    update:function(el,binding,vnode,oldVnode){
        console.log("update");
    }

});