<template>
  <div class="image-box box"
    ref="imgBox"
    :class="{'err': status == 'err', 'single': single}"
    @mouseover="handleMouseover"
    @mouseout="handleMouseout">

    <div class="inside-box">
      
      <!-- 图片显示 -->
      <div class="img-box box">
        <img ref="imgShow" @load="imgLoaded" :src="imgUrl" alt="">
      </div>

      <!-- 正在上传的遮罩层 -->
      <div v-if="status == 'uploading'" class="uploading-box box">
        <span>{{(progress * 100).toFixed(2)}}%</span>
        <span class="progress" :style="'width:' + (progress * 100).toFixed(2) + '%'"></span>
      </div>

      <!-- 发生错误的遮罩层 -->
      <div v-if="status == 'err'" class="uploading-box box">
        <!-- <mu-icon-button class="image-action-btn" icon="refresh" @click="handleReload"/> -->
        <el-button class="image-action-btn" icon="close" @click="handleDel"/>
      </div>

      <!-- 已上传完成的遮罩层 -->
      <div v-if="status == 'uploaded'" class="cover-box box"
        :class="{'hover': hover}"
        @mouseover="handleMouseoverUploaded"
        @mouseout="handleMouseoutUploaded">
        <div class="content" :class="{'hoverUploaded': hoverUploaded}">
          <el-button class="image-action-btn" :href="imgUrl" target="_blank"
            @click="see" icon="remove_red_eye"/>
          <el-button v-if="single" class="image-action-btn" icon="refresh" @click="handleReplace"/>
          <el-button class="image-action-btn" icon="close" @click="handleDel"/>
        </div>
      </div>

      <!-- 确认删除的遮罩层 -->
      <transition name="fade">
        <div v-if="delState" class="uploading-box box" style="flex-direction: column">
          <p>确定删除?</p>
          <div>
            <el-button class="image-action-btn" icon="check" @click="del"
              style="color:red"/>
            <el-button class="image-action-btn" icon="close" @click="closeDel"/>
          </div>
        </div>
      </transition>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      delState: false,

      hover: false,
      hoverUploaded: false,
    }
  },
  props: ['imgUrl', 'status', 'progress', 'single'],
  methods: {
    handleMouseover () {
      this.hover = true;
    },
    handleMouseout () {
      this.hover = false;
    },
    handleMouseoverUploaded () {
      this.hoverUploaded = true;
    },
    handleMouseoutUploaded () {
      this.hoverUploaded = false;
    },
    handleReplace () {
      this.$emit('replace');
    },
    handleDel () {
      this.delState = true;
    },
    closeDel () {
      this.delState = false;
    },
    see () {
      this.$emit('show', this.imgUrl);
    },
    del () {
      this.$emit('del');
    },
    imgLoaded () {

      let img = this.$refs.imgShow;
      let box = this.$refs.imgBox;

      let boxRate = box.clientWidth / box.clientHeight;
      let imgRate = img.style.width / img.style.height;

      if (imgRate > boxRate) {
        img.style.width = '100%';
        img.style.height = '';
      } else {
        img.style.height = '100%';
        img.style.width = '';
      }
    }
  },
}
</script>
<style>
.g-image-upload {
    color: #888;
    position: relative;
}
.g-image-upload .input-area {
    width: 100%;
    height: 100%;
    
}
.g-image-upload .input-area .single {
    position: absolute;
}
.g-image-upload .add-box {
    border: 1px dashed #d9d9d9;
    background-color: #fbfbfb;
    cursor: pointer;
    transition: border-color .5s ease;
    margin: 0 8px 8px 0;
}
.g-image-upload .add-box:hover {
    border-color: #108ee9;
}
.g-image-upload .single {
    width: 100%;
    height: 100%;
}
.g-image-upload .box {
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
}
.g-image-upload .box .single {
    width: 100%;
    height: 100%;
}
.image-box {
    border: 1px solid #d9d9d9;
    float: left;
    position: relative;
    margin: 0 8px 8px 0;
    padding: 7px;
}
.image-box .image-action-btn {
    width: initial;height: initial;padding:initial;
}
.image-box .uploading-box {
    background-color: rgba(0,0,0,.6);
    flex-direction: initial;
    color: #fff;
}
.image-box .uploading-box .progress {
    position: absolute;
    bottom: 0; left: 0;
    width: 0;height: 3px;
    background-color: #0c0;
    transition: width .5s ease;
}
.image-box .cover-box {
    background-color: rgba(0,0,0,.6);
    flex-direction: initial;
    color: #fff;
    opacity: 0;
    transition: opacity .5s ease;
}
.image-box .cover-box .hover {
    opacity: 1;
}

.image-box .cover-box .content {
    opacity: 0;
    transition: opacity .5s ease;
}
.image-box .cover-box .content .hoverUploaded {
    opacity: 1;
}
.image-box .box {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    overflow: hidden;
}
.image-box .inside-box {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.image-box .err {
    border-color: #c00;
}

.image-box .single {
    position: absolute;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
}

.list-item {
    display: inline-block;
    margin-right: 10px;
}
.list-enter-active, .list-leave-active {
    transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for <2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
}
</style>

