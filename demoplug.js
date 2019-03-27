class DemoPlug {
  constructor(props) {
    const h = window.virtualDom.h
    const render = window.virtualDom.render
    const diff = window.virtualDom.diff
    const patch = window.virtualDom.patch
    const create = window.virtualDom.create

    this.container = document.querySelector(props.container)
    this.plank = {
      className: props.plankClass || false,
      disableStyles: props.disablePlankStyles || false
    }
    this.messageWindow = {
      show: false,
      className: props.messageWindowClass || false,
      disableStyles: props.disableWindowStyles || false
    }

    this.h = h
    this.render = render
    this.diff = diff
    this.patch = patch
    this.create = create

    this.tree = {}
    this.root = {}
  }

  renderPlank = () => {
    const attributes = {
      className: this.plank.className || 'plank',
      style: this.plank.disableStyles || {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
        background: '#0094ff',
        color: 'white',
        fontFamily: 'Helvetica',
        borderTopLeftRadius: '3px',
        cursor: 'pointer'
      }
    }
    return this.h('div', attributes, ['Write to us'])
  }

  renderMessageWindow = (props) => {
    const attributes = {
      className: this.messageWindow.className || 'message_window',
      style: this.messageWindow.disableStyles || {
        bottom: props.show ? '0' : '-400px',
        boxSizing: 'border-box',
        right: '5px',
        position: 'absolute',
        width: '300px',
        height: '400px',
        fontFamily: 'Helvetica',
        background: '#f3f3f3',
        border: '1px solid #dedede',
        padding: '10px',
        transition: 'bottom .4s ease-in-out'
      }
    }
    const crossAttributes = {
      className: 'cross',
      style: {
        position: 'absolute',
        top: '5px',
        right: '5px'
      },
      // dangerouslySetInnerHTML: { __html:  }
    }
    return this.h('div', attributes, [this.h('div', crossAttributes, '&#215;')])
  }

  formTree = () => {
    const plank = this.renderPlank()
    const messageWindow = this.renderMessageWindow({ show: this.messageWindow.show })
    const tree = this.h('div', null, [ plank, messageWindow ])
    return tree
  }

  update = () => {
    const oldTree = this.tree
    const newTree = this.formTree()
    const patches = this.diff(oldTree, newTree)
    this.root = this.patch(this.root, patches)
    this.tree = newTree
  }

  show = () => {
    this.messageWindow.show = true
    this.update()
  }
  
  hide = () => {
    this.messageWindow.show = false
    this.update()
  }

  init() {
    const tree = this.tree = this.formTree()
    const root = this.root = this.create(tree)
    this.container.appendChild(root)
  }
}