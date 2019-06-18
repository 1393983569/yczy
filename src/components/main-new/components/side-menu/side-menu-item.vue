<template>
  <Submenu :name="`${parentName}`">
    <template slot="title">
      <common-icon :type="parentItem.icon || ''"/>
      <span>{{ showTitle(parentItem) }}</span>
    </template>
    <template v-for="(item, index) in children">
      <template v-if="item.children && item.children.length === 1">
        <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
        <menu-item v-else :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`">
          <common-icon :type="item.children[0].icon || ''"/>
          <span>{{ showTitle(item.children[0]) }}</span>
        </menu-item>
      </template>
      <template v-else>
        <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
        <menu-item v-else :name="getNameOrHref(item)" :key="`menu-${item.name}`" ref="menuItemRef">
          <common-icon :type="item.icon || ''"/>
          <span>{{ showTitle(item) }}</span>
          <!--<div style="display: inline-block;" :class="[item.showSelect ? 'showSelect_Js' : '']" @click="clickTitle(index)">-->

          <!--</div>-->
        </menu-item>
      </template>
    </template>
  </Submenu>
</template>
<script>
  import mixin from './mixin'
  import itemMixin from './item-mixin'
  export default {
    name: 'SideMenuItem',
    mixins: [ mixin, itemMixin ],
    methods: {
      clickTitle (index) {
        // this.children.forEach(item => {
        //   if (item.showSelect) item.showSelect = false
        // })
        // this.children[index].showSelect = true
        // console.log(this.children, '*********************')
        // 'showSelect_Js'
        // this.$forceUpdate()
      }
    }
  }
</script>
<style>
  .showSelect_Js{
    border-left: #2D8cF0 5px solid
  }
</style>
