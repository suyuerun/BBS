<template>
    <div>
         <Table :columns="titleContent" :data="dataConent"></Table>
    </div>
</template>

<script>
import {getAllPostList} from '../vuex/actions/UserAction';
import {getRegister, getLogin, changeLoginbean} from '../vuex/getters/UserGetter';
export default {
    name: 'mainContene',
    data () {
        return {
            titleContent: [
                {
                    title: '帖子标题',
                    key: 'title'
                },
                {
                    title: '作者',
                    key: 'author'
                },
                {
                    title: '发布时间',
                    key: 'pubTime'
                },
                {
                    title: '回复时间',
                    key: 'replyTime'
                }
            ],
            dataConent: [],
            postList:null 
            // [
            //     {
            //         title: 'vue论坛雏形',
            //         author: '苏月润',
            //         pubTime: '2016-10-03',
            //         replyTime: '2017-10-03'
            //     }
            // ]
        }
    },
    methods:{

    },
    created:function(){
        
    },
    beforeMount:function(){
        getAllPostList(this);
    },
    mounted: function () {
      if(this.dataConent.length < 1){
          alert(JSON.stringify(this.postList));
          for (var i = this.postList.length - 1; i >= 0; i--) {
              this.dataConent.push({
                title: this.postList[i].postTitle,
                author: this.postList[i].postAuthor,
                pubTime: this.postList[i].pubTime,
                replyTime: this.postList[i].replyTime
              });
          }
          
        }      
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
</style>
