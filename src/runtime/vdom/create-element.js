import VNode from './vnode'
import Component from './component'
import { renderState } from '../instance/render'
import {
  warn,
  isPrimitive,
  isArray,
  isReservedTag,
  isUnknownElement,
  resolveAsset
} from '../util/index'

/*
so it turns out the children here means different things. when the tag is a reserved tag, then children means everything inside of the element.
for example
<p>
  <span>hello</span>
  <span>world</span>
</p>
then the two spans (lets ignore the whitespace) are the children of the p element.

however, when it comes to a component, the meaning of children can sometimes be confusing.
for example

Vue.component('counter', {
    props: ['dimensions', 'message'],
    template: '<div><p>{{dimensions.width}} x {{dimensions.height}}</p><slot></slot></div>'
});

the <p> element inside the template is not a child, nor does the outer most <div> element. Everything in the template method can be conceptually thought
as the component itself. not its children. So what is the children of this component? Well, it depends.

for example, if we use the component this way:

<counter v-bind:dimensions="...." v-bind:message="hello"></counter>

Well, in this case, there is no children of this component. In the following example, however, the children is the my-custom-component component.

<counter v-bind:dimensions="...." v-bind:message="hello">
  <my-custom-component></my-custom-component>
</counter>

Now it becomes clearer, that children is what we put in between <counter> and </counter>. This is the same case for a reserved tag.
<p></p> there is no children for the p element. p element does not always have children. Only when we put other elements, such as span in between
<p> and </p>. will p element has children.

As for the elements inside the template, they are not children, they are part of the component.

There is one more thing to note though, you cannot just put something inside a component (as children) and expect it to work. Because
the component will not be able to know, where to render the children (and therefore it will ignore it). You need to use <slot> inside the template
to tell the component where to put the children, as shown in our counter component template.

 */
export default function createElement (tag, data, children) {
  children = flatten(children)
  const parent = renderState.activeInstance
  if (typeof tag === 'string') {
    let Ctor
    if (isReservedTag(tag)) {
      return VNode(tag, data, children)
    } else if ((Ctor = resolveAsset(parent.$options, 'components', tag))) {
      return Component(Ctor, data, parent, children)
    } else {
      if (process.env.NODE_ENV !== 'production') {
        if (!data.svg && isUnknownElement(tag)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.'
          )
        }
      }
      return VNode(tag, data, children)
    }
  } else {
    return Component(tag, data, parent, children)
  }
}

function flatten (children) {
  if (isArray(children)) {
    let res = []
    for (let i = 0, l = children.length; i < l; i++) {
      let c = children[i]
      // flatten nested
      if (isArray(c)) {
        res.push.apply(res, flatten(c))
      } else if (isPrimitive(c)) {
        // convert primitive to vnode
        res.push(VNode(undefined, undefined, undefined, c))
      } else if (c) {
        res.push(c)
      }
    }
    return res
  } else {
    return children
  }
}
