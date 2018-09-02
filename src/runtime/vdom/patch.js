import VNode from './vnode'
import * as dom from './dom'
import {isPrimitive} from '../util/index'

const emptyNode = VNode('', {}, [])
const hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post']
const svgNS = 'http://www.w3.org/2000/svg'

function isUndef(s) {
    return s === undefined
}

function isDef(s) {
    return s !== undefined
}

function sameVnode(vnode1, vnode2) {
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
    let i, key
    const map = {}
    for (i = beginIdx; i <= endIdx; ++i) {
        key = children[i].key
        if (isDef(key)) map[key] = i
    }
    return map
}

export default function createPatchFunction(modules, api) {
    let i, j
    const cbs = {}

    if (isUndef(api)) api = dom

    for (i = 0; i < hooks.length; ++i) {
        cbs[hooks[i]] = []
        for (j = 0; j < modules.length; ++j) {
            if (modules[j][hooks[i]] !== undefined) cbs[hooks[i]].push(modules[j][hooks[i]])
        }
    }

    function emptyNodeAt(elm) {
        return VNode(api.tagName(elm).toLowerCase(), {}, [], undefined, elm)
    }

    function createRmCb(childElm, listeners) {
        return function remove() {
            if (--listeners === 0) {
                const parent = api.parentNode(childElm)
                api.removeChild(parent, childElm)
            }
        }
    }

    function createElm(vnode, insertedVnodeQueue) {
        let i, elm
        const data = vnode.data
        if (isDef(data)) {
            if (isDef(i = data.hook) && isDef(i = i.init)) i(vnode)
            if (isDef(i = data.child)) {
                return i._vnode.elm
            }
        }
        const children = vnode.children
        const tag = vnode.sel
        if (isDef(tag)) {
            elm = vnode.elm = isDef(data) && data.svg
                ? api.createElementNS(svgNS, tag)
                : api.createElement(tag)
            if (Array.isArray(children)) {
                for (i = 0; i < children.length; ++i) {
                    api.appendChild(elm, createElm(children[i], insertedVnodeQueue))
                }
            } else if (isPrimitive(vnode.text)) {
                api.appendChild(elm, api.createTextNode(vnode.text))
            }
            for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode)
            i = vnode.data.hook // Reuse variable
            if (isDef(i)) {
                if (i.create) i.create(emptyNode, vnode)
                if (i.insert) insertedVnodeQueue.push(vnode)
            }
        } else {
            elm = vnode.elm = api.createTextNode(vnode.text)
        }
        return vnode.elm
    }

    function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
        for (; startIdx <= endIdx; ++startIdx) {
            api.insertBefore(parentElm, createElm(vnodes[startIdx], insertedVnodeQueue), before)
        }
    }

    function invokeDestroyHook(vnode) {
        let i, j
        const data = vnode.data
        if (isDef(data)) {
            if (isDef(i = data.hook) && isDef(i = i.destroy)) i(vnode)
            for (i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode)
            if (isDef(i = vnode.children)) {
                for (j = 0; j < vnode.children.length; ++j) {
                    invokeDestroyHook(vnode.children[j])
                }
            }
            if (isDef(i = data.child)) invokeDestroyHook(i._vnode)
        }
    }

    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
        for (; startIdx <= endIdx; ++startIdx) {
            let i, listeners, rm
            const ch = vnodes[startIdx]
            if (isDef(ch)) {
                if (isDef(ch.sel)) {
                    invokeDestroyHook(ch)
                    listeners = cbs.remove.length + 1
                    rm = createRmCb(ch.elm || ch.data.child._vnode.elm, listeners)
                    for (i = 0; i < cbs.remove.length; ++i) cbs.remove[i](ch, rm)
                    if (isDef(i = ch.data) && isDef(i = i.hook) && isDef(i = i.remove)) {
                        i(ch, rm)
                    } else {
                        rm()
                    }
                } else { // Text node
                    api.removeChild(parentElm, ch.elm)
                }
            }
        }
    }

    /*
    Trying to update parentElm (DOM node)'s children. The old children is generated according to `oldCh`, and we need to
    update them according to `newCh`.
     */
    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
        //notice that if `oldCh`'s length is 0, then oldChEndIdx is actually -1. Same applies to `ch`.
        let oldStartIdx = 0
        let newStartIdx = 0
        let oldEndIdx = oldCh.length - 1
        let oldStartVnode = oldCh[0]
        let oldEndVnode = oldCh[oldEndIdx]
        let newEndIdx = newCh.length - 1
        let newStartVnode = newCh[0]
        let newEndVnode = newCh[newEndIdx]
        let oldKeyToIdx, idxInOld, elmToMove, before

        /*
        Here for each array (`oldCh` and `ch`), we have two pointers. A startIdx pointer on the left and a endIdx pointer
        on the right. In the beginning, startIdx points to the first child node in the array, and endIdx points to the last
        child in the array.
         */
        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (isUndef(oldStartVnode)) {
                oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
            } else if (isUndef(oldEndVnode)) {
                oldEndVnode = oldCh[--oldEndIdx]
            } else if (sameVnode(oldStartVnode, newStartVnode)) {
                //same type, good, run `patchVnode` to modify `oldStartVnode`'s DOM node according to `newStartVnode`
                patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue)
                //advance the startIdx pointers.
                oldStartVnode = oldCh[++oldStartIdx]
                newStartVnode = newCh[++newStartIdx]
            } else if (sameVnode(oldEndVnode, newEndVnode)) {
                //same type, good, run `patchVnode` to modify `oldEndVnode`'s DOM node according to `newEndVnode`
                patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue)
                //advance the endIdx pointers
                oldEndVnode = oldCh[--oldEndIdx]
                newEndVnode = newCh[--newEndIdx]
            } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
                /*
                This is very efficient for cases where only one child in the list is repositioned.
                todo: example...
                 */
                patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue)
                api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm))
                oldStartVnode = oldCh[++oldStartIdx]
                newEndVnode = newCh[--newEndIdx]
            } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
                patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue)
                api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
                oldEndVnode = oldCh[--oldEndIdx]
                newStartVnode = newCh[++newStartIdx]
            } else {
                if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
                idxInOld = oldKeyToIdx[newStartVnode.key]
                if (isUndef(idxInOld)) { // New element
                    api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm)
                    newStartVnode = newCh[++newStartIdx]
                } else {
                    elmToMove = oldCh[idxInOld]
                    patchVnode(elmToMove, newStartVnode, insertedVnodeQueue)
                    oldCh[idxInOld] = undefined
                    api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm)
                    newStartVnode = newCh[++newStartIdx]
                }
            }
        }
        if (oldStartIdx > oldEndIdx) {
            before = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
            addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
        } else if (newStartIdx > newEndIdx) {
            removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
        }
    }

    function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
        let i, j, hook

        //if prepatch hook is defined, call it.
        if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
            i(oldVnode, vnode)
        }

        // child component. skip and let it do its own thing.
        if (isDef(i = oldVnode.data) &&
            isDef(j = vnode.data) &&
            isDef(i = i.child) &&
            isDef(j = j.child) &&
            i === j) {
            return
        }

        /*
        This step is very important. `vnode.elm = oldVnode.elm`.
        `oldVnode.elm` is the current DOM node in the DOM tree.
        Essentially, we are trying to reuse the existing DOM node here.
        Instead of creating a new DOM node, we modify the existing DOM node to make it align with the new `vnode`.
        The modification includes attributes, properties, handlers, and children.
         */
        let elm = vnode.elm = oldVnode.elm
        const oldCh = oldVnode.children
        const ch = vnode.children
        if (oldVnode === vnode) return

        /*
        We mentioned about reusing DOM node. There is on exception though. If the new `vnode` and `oldVnode` is of different
        type, there is a high chance they are entirely different: different attributes, different children and so on. So in
        this case, we might as well just create a new DOM node instead.
         */
        if (!sameVnode(oldVnode, vnode)) {
            //not the same type, just create a new DOM node and replace the old DOM node.
            var parentElm = api.parentNode(oldVnode.elm)
            elm = createElm(vnode, insertedVnodeQueue)
            api.insertBefore(parentElm, elm, oldVnode.elm)
            removeVnodes(parentElm, [oldVnode], 0, 0)
            return
        }

        /*
        If we reaches here, it means the `oldVnode` and `vnode` is of the same type. And we are trying to reuse the previous
        DOM node linked to the `oldVnode`. First, we will update the DOM node itself, and then we will update its children.
         */

        /*
        update the DOM node itself by calling different update callbacks. Normally we have many update callbacks, from different
        modules, such as event modules, style modules, css class modules and so on. Each module's update callback will update
        the corresponding aspect of the DOM node.
         */
        if (isDef(vnode.data)) {
            for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
            i = vnode.data.hook
            if (isDef(i) && isDef(i = i.update)) i(oldVnode, vnode)
        }

        /*
        Here we will update DOM node's children.
         */
        if (isUndef(vnode.text)) {
            //both `oldCh` and `ch` is defined.
            if (isDef(oldCh) && isDef(ch)) {
                if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue)
            } else if (isDef(ch)) {
                /*
                 `oldCh` is not defined, we have only new `ch`. The means previously DOM node has no children (according to `oldVnode`)
                 and all we need to do is to insert new children, according to `vnode`.
                 */
                if (isDef(oldVnode.text)) api.setTextContent(elm, '')
                addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
            } else if (isDef(oldCh)) {
                /*
                 `oldCh` is defined, and `ch` is not defined. This means we are going to remove all children from the DOM node.
                 */
                removeVnodes(elm, oldCh, 0, oldCh.length - 1)
            } else if (isDef(oldVnode.text)) {
                /*
                If we reach here. it means:
                1. `oldVnode` has no children
                2. `vnode` has no children
                3. `vnode` has no text, or text is empty string.
                4. `oldVnode` has text
                This means DOM node has text content (according to `oldVnode`) and now according to new `vnode`, it should has no text content.
                Then we simply set DOM node's text content to be empty string.
                 */
                api.setTextContent(elm, '')
            }
        } else if (oldVnode.text !== vnode.text) {
            //according to `vnode`, DOM node should has text content `vnode.text`. And we change DOM node's text content accordingly.
            api.setTextContent(elm, vnode.text)
        }

        //execute post patch hook, if there is any.
        if (isDef(hook) && isDef(i = hook.postpatch)) {
            i(oldVnode, vnode)
        }
    }

    return function patch(oldVnode, vnode) {
        //locate patch
        var i, elm, parent
        var insertedVnodeQueue = []
        for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]()

        if (!oldVnode) {
            createElm(vnode, insertedVnodeQueue)
        } else {
            /*
             this condition is true when we have:

             <div id="app">
                //something in here.
             </div>

             new Vue({
                el: "#app"
             });

             In this case, oldVnode is actually not a vnode, but an actual DOM node #app.
             During compile phase, the inner content of #app has been removed, and so #app
             at this point is an "empty node" (no children).

             And since oldVnode is an actual DOM here, it has no `sel` property. And we make use
             of this characteristic to identify this pattern.

             To make it easier to compare the oldVnode and vnode, we call `emptyNodeAt` to convert
             oldVnode from a DOM node to a vnode.
             */
            if (isUndef(oldVnode.sel)) {
                oldVnode = emptyNodeAt(oldVnode)
            }

            //if they are of the same type, then we call `patchVnode`.
            if (sameVnode(oldVnode, vnode)) {
                patchVnode(oldVnode, vnode, insertedVnodeQueue)
            } else {
                elm = oldVnode.elm
                parent = api.parentNode(elm)

                createElm(vnode, insertedVnodeQueue)

                if (parent !== null) {
                    api.insertBefore(parent, vnode.elm, api.nextSibling(elm))
                    removeVnodes(parent, [oldVnode], 0, 0)
                }
            }
        }

        for (i = 0; i < insertedVnodeQueue.length; ++i) {
            insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i])
        }
        for (i = 0; i < cbs.post.length; ++i) cbs.post[i]()
        return vnode.elm
    }
}
