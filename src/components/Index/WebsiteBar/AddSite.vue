<template>
  <el-dialog
    class="add-site"
    :model-value="dialogVisible"
    title="添加图标"
    width="500px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <el-form label-width="80px" ref="ruleFormRef" :model="form" :rules="rules">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="连接地址" prop="url">
        <el-input v-model="form.url" />
      </el-form-item>
      <el-form-item label="Icon地址">
        <el-input v-model="form.icon" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('ctrlDialog')">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import websiteStore from "@/store/websiteStore";

const emits = defineEmits(["ctrlDialog"]);
defineProps(["dialogVisible"]);
const websiteList = websiteStore().$state;
const ruleFormRef = ref<FormInstance>();
const form = reactive({
  name: "",
  type: "user",
  icon: "Icon",
  url: "",
});
const rules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: "请输入图标名称",
      trigger: "blur",
    },
  ],
  url: [
    {
      required: true,
      message: "请输入跳转连接地址",
      trigger: "blur",
    },
  ],
});
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      websiteList.item.push(form);
      setTimeout(() => {
        const target = document.getElementById(websiteList.origin.length);
        console.log(target);
        websiteList.origin.push(target);
      }, 200);
      emits("ctrlDialog");
    } else {
      console.log("error submit!", fields);
    }
  });
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="scss" scoped>
.add-site {
  .el-alert {
    margin: 20px 0 0;
    box-sizing: border-box;
    @include transition-5;
  }
}
</style>
