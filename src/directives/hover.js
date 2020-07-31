// <h1 v-add-class-hover="'hoverClass'">
var evtEnter, evtLeave;
export const hover = [
  'add-class-hover',
  {
    bind(el, binding) {    
      const { value="" } = binding;
      evtEnter = el.addEventListener('mouseenter',()=> {
          el.classList.add(value)
      });
      evtLeave = el.addEventListener('mouseleave',()=> {
          el.classList.remove(value)
      });
    },
    unbind(el) {
      el.removeEventListener('mouseenter', evtEnter);
      el.removeEventListener('mouseleave', evtLeave)
    }
  }
]