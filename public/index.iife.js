var VueDemi = (function (VueDemi, Vue, VueCompositionAPI) {
    if (VueDemi.install) {
      return VueDemi
    }
    if (!Vue) {
      console.error('[vue-demi] no Vue instance found, please be sure to import `vue` before `vue-demi`.')
      return VueDemi
    }
  
    // Vue 2.7
    if (Vue.version.slice(0, 4) === '2.7.') {
      for (var key in Vue) {
        VueDemi[key] = Vue[key]
      }
      VueDemi.isVue2 = true
      VueDemi.isVue3 = false
      VueDemi.install = function () {}
      VueDemi.Vue = Vue
      VueDemi.Vue2 = Vue
      VueDemi.version = Vue.version
      VueDemi.warn = Vue.util.warn
      VueDemi.hasInjectionContext = () => !!VueDemi.getCurrentInstance()
      function createApp(rootComponent, rootProps) {
        var vm
        var provide = {}
        var app = {
          config: Vue.config,
          use: Vue.use.bind(Vue),
          mixin: Vue.mixin.bind(Vue),
          component: Vue.component.bind(Vue),
          provide: function (key, value) {
            provide[key] = value
            return this
          },
          directive: function (name, dir) {
            if (dir) {
              Vue.directive(name, dir)
              return app
            } else {
              return Vue.directive(name)
            }
          },
          mount: function (el, hydrating) {
            if (!vm) {
              vm = new Vue(Object.assign({ propsData: rootProps }, rootComponent, { provide: Object.assign(provide, rootComponent.provide) }))
              vm.$mount(el, hydrating)
              return vm
            } else {
              return vm
            }
          },
          unmount: function () {
            if (vm) {
              vm.$destroy()
              vm = undefined
            }
          },
        }
        return app
      }
      VueDemi.createApp = createApp
    }
    // Vue 2.6.x
    else if (Vue.version.slice(0, 2) === '2.') {
      if (VueCompositionAPI) {
        for (var key in VueCompositionAPI) {
          VueDemi[key] = VueCompositionAPI[key]
        }
        VueDemi.isVue2 = true
        VueDemi.isVue3 = false
        VueDemi.install = function () {}
        VueDemi.Vue = Vue
        VueDemi.Vue2 = Vue
        VueDemi.version = Vue.version
        VueDemi.hasInjectionContext = () => !!VueDemi.getCurrentInstance()
      } else {
        console.error('[vue-demi] no VueCompositionAPI instance found, please be sure to import `@vue/composition-api` before `vue-demi`.')
      }
    }
    // Vue 3
    else if (Vue.version.slice(0, 2) === '3.') {
      for (var key in Vue) {
        VueDemi[key] = Vue[key]
      }
      VueDemi.isVue2 = false
      VueDemi.isVue3 = true
      VueDemi.install = function () {}
      VueDemi.Vue = Vue
      VueDemi.Vue2 = undefined
      VueDemi.version = Vue.version
      VueDemi.set = function (target, key, val) {
        if (Array.isArray(target)) {
          target.length = Math.max(target.length, key)
          target.splice(key, 1, val)
          return val
        }
        target[key] = val
        return val
      }
      VueDemi.del = function (target, key) {
        if (Array.isArray(target)) {
          target.splice(key, 1)
          return
        }
        delete target[key]
      }
    } else {
      console.error('[vue-demi] Vue version ' + Vue.version + ' is unsupported.')
    }
    return VueDemi
  })(
    (this.VueDemi = this.VueDemi || (typeof VueDemi !== 'undefined' ? VueDemi : {})),
    this.Vue || (typeof Vue !== 'undefined' ? Vue : undefined),
    this.VueCompositionAPI || (typeof VueCompositionAPI !== 'undefined' ? VueCompositionAPI : undefined)
  );