import Vue from '../instance/index'
import { callHook } from '../instance/lifecycle'

export default function Component (Ctor, data, parent, children) {
  if (typeof Ctor === 'object') {
    Ctor = Vue.extend(Ctor)
  }
  // return a placeholder vnode
  const key = data && data.key
  return {
    tag: 'component',
    key,
    data: {
      hook: { init, insert, prepatch, destroy },
      Ctor, data, parent, children
    }
  }
}

function init (vnode) {
  const data = vnode.data
  //this child seems to be the vm.
  //and data.Ctor is the constructor of the component, it creates a vm.
  const child = new data.Ctor({
    parent: data.parent,
    _renderData: data.data,
    _renderChildren: data.children,
    _renderKey: vnode.key
  })
  //child seems to be the vm. this mount method obviously only exists in a vm.
  child.$mount()
  data.child = child
}

function insert (vnode) {
  callHook(vnode.child, 'ready')
}

function prepatch (oldVnode, vnode) {
  const old = oldVnode.data
  const cur = vnode.data
  if (cur.Ctor !== old.Ctor) {
    // component changed, teardown and create new
    // TODO: keep-alive?
    old.child.$destroy()
    init(vnode)
  } else {
    //since cur.Ctor and old.Ctor is the same, then it means that they will create the same kind of component (ie. the two vms will be of
    //same class). In this case, to improve performance, we dont need to create a brand new vm, we can just simply reuse the existing vm,
    //and update this existing vm according. (tip: child is the actual vm. the name is awkward here..)
    cur.child = old.child
    // try re-render child. the child may optimize it
    // and just does nothing.

    /*
    cur.data carries all the attributes / properties that is going to be passed to the component.
    cur.children stands for the children of the component.
     */
    old.child._tryUpdate(cur.data, cur.children, vnode.key)
  }
}

function destroy (vnode) {
  vnode.data.child.$destroy()
}
