<template>
  <div class="g-image-upload" :class="{'single': singleMode}">
    <!-- 展示图片区 -->
    <transition-group name="list">
      <image-box v-for="(img, index) in imgs" :key="img.uid"  
        :imgUrl="img.imgUrl" :status="img.status"
        :progress="img.progress" :single="singleMode"
        @replace="replaceImg(index)"
        @del="del(index)"></image-box>
    </transition-group>

    <!-- 添加图片按钮区 -->
    <transition name="fade">
      <div class="input-area" :class="{'single': singleMode}" v-show="inputAreaState">
        <div class="box add-box" :class="{'single': singleMode}" @click="addImg">
          <!-- <mu-icon value="add" :size="36"/> -->
          <i class="el-icon-add"></i>
          <p>Upload</p>
        </div>
        <input
          ref="file-upload" type="file"
          style="width: 100%;height: 100%;display:none"
          multiple="multiple">
      </div>
    </transition>
  </div>
</template>

<script>
import props from './props';
import ImageBox from './ImageBox.vue';
import xhr from './lib/xhr';

function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
  });
  return uuid;
};

export default {
  data() {
    return {
      // 保存当前图片信息
      imgs: [
        // {
        //   status: '',
        //   imgUrl: '',
        //   progress: 0,
        //   uid: generateUUID(),
        // }
      ],
    }
  },
  props: props,
  methods: {

    /**
     * @function createImgObj
     * 根据是否有 url 包装对象
     * 若存在 url 则将状态设置为已加载完成并返回
     * 若不存在 设置为未加载完成状态并返回
     * @param  {String} url {图片 url}
     * @return {Object} {根据是否有 url 包装对象}
     */
    createImgObj(url) {
      let obj = {
        status: '',
        imgUrl: '',
        progress: 0,
        uid: generateUUID(),
      };
      if (url) {
        obj.imgUrl = url;
        obj.status = 'uploaded';
        obj.progress = 100;
      };
      return obj;
    },

    /**
     * @function addImg {向当前图片对象池尾添加图片}
     */
    addImg() {
      const self = this;
      let uploadBtn = this.$refs['file-upload'];
      uploadBtn.onchange = function (e) {
        let files = e.target.files;
        let promisesArr = [];

        // 检查文件个数是否超出
        if (self.max > 0 && files.length + self.imgs.length > self.max) {
          self.$emit('err', '文件数量过多');
          return;
        }

        // 每个文件分开上传
        for (let i = 0; i < files.length; i++) {
          let obj = self.createImgObj();
          self.imgs.push(obj);
          let promise = self.upload(obj, files[i]);
          promisesArr.push(promise);
        }

        // 所有文件完成上传动作
        Promise.all(promisesArr).then(resp => {
          self.submitDone();
        })
      }
      uploadBtn.click();
    },

    /**
     * @function replaceImg {替换当前图片对象池中指定 index 的图片对象}
     */
    replaceImg(index) {
      const self = this;
      let obj = this.createImgObj();
      let uploadBtn = this.$refs['file-upload'];
      uploadBtn.onchange = function (e) {
        self.imgs.splice(index, 1, obj);
        self.upload(obj, e.target.files[0]).then(resp => {
          self.submitDone();
        })
      }
      uploadBtn.click();
    },
    
    /**
     * @function submitDone {在上传结束后发起 done 事件并返回对象池中的全部 url 信息}
     */
    submitDone() {
      // 清空上传input中的数据
      this.clearInput();
      
      // 遍历对象池 整理 url
      let urlsList = [];

      if (this.singleMode) {
        // 单图模式返回字符串形式的 url
        urlsList = this.imgs[0].imgUrl;
      } else {
        // 多图模式返回数组形式
        this.imgs.forEach(img => {
          if (img.imgUrl) {
            urlsList.push(img.imgUrl);
          }
        });
      }

      this.$emit('done', urlsList);
    },

    /**
     * @function clearInput {清空上传input中的数据}
     */
    clearInput() {
      this.$refs['file-upload'].value = '';
    },

    /**
     * @function del {删除指定index的图片对象池中的对象}
     * @param  {Number} index {指定删除对象的index值}
     */
    del(index) {
      this.imgs.splice(index, 1);
    },

    /**
     * @function upload {上传单个图片文件}
     * @param  {Object} obj  {状态改变将要影响的对象}
     * @param  {File} file {要上传的文件}
     * @return {Promise} {在上传成功和错误时都会触发resolve}
     */
    upload(obj, file) {

      return new Promise((resolve, reject) => {
        const self = this;

        // 检查文件大小
        if (this.limit > 0 && file.size > this.limit) {
          obj.status = 'err';
          resolve('ERROR: Over size limit');
          return;
        }
        
        /**
         * @function done 上传成功的回调
         * @param  {Object} resp {上传成功返回数据}
         */
        const done = function (resp) {

          obj.status = 'uploaded';
          obj.imgUrl = resp.data;

          resolve(obj.imgUrl);
        }

        /**
         * @function err 上传失败的回调
         * @param  {Object} err {错误提示对象}
         */
        const err = function (err) {
          obj.status = 'err';
          resolve('ERROR: Upload failed');
        }

        /**
         * @function uploading 上传过程中触发的回调
         * @param  {Number} progress {上传进度}
         */
        const uploading = function (progress) {
          // 修改对应对象的进度显示
          obj.progress = progress;
          self.$emit('uploading', progress);
        }

        // 将文件放入表单中
        let data = new FormData();
        let aFile = file;
        data.append('file', aFile, aFile.name);
        // 修改对象状态
        obj.status = 'uploading';
        // 使用 axios 上传
        xhr(this.api, this.headers, data, done, uploading, err);
      })
    },
  },
  components: {
    'image-box': ImageBox,
  },

  /**
   * 初始化展示原有图片
   */
  mounted() {
    if (this.singleMode) {
      let obj = null;
      if (this.value != '' && this.value != null) {
        // 创建已完成状态的对象
        obj = this.createImgObj(this.value);
        // 放入对象池
        this.imgs.push(obj);
      }
    } else {
      this.value.forEach(url => {
        // 创建已完成状态的对象
        let obj = this.createImgObj(url);
        // 放入对象池
        this.imgs.push(obj);
      });
    }
  },

  watch: {
    // 检测对象池 截去超出部分
    imgs(val) {
      if (this.max > 0 && val.length > this.max) {
        this.imgs = val.splice(0, this.max);
      }
    }
  },

  computed: {
    singleMode() {
      let _value = this.value;
      let _max = this.max;
      if (typeof _value == 'string' || _max == 1) {
        return true;
      }
      return false;
    },
    inputAreaState() {
      let _singleMode = this.singleMode;
      let _len = this.imgs.length;

      if (_singleMode) { // 单图模式
        if (_len == 0) {
          return true;
        }
      } else { // 多图模式
        if (this.max == 0) { // 不限数量
          return true;
        } else {
          if (_len < this.max) { // 限数且数量小于最大数
            return true;
          }
        }
      }
      return false;
    }
  }
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