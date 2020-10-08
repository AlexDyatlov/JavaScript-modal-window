Element.prototype.appendAffter = function(e) {
  e.parentNode.insertBefore(this, e.nextSibling)
}

function noop() {}

function _createModalFooter(buttons = []) {
  if (buttons.length === 0) {

    return document.createElement('div')
  }

  const wrap = document.createElement('div')
  wrap.classList.add('modal-footer')

  buttons.forEach(btn => {
    const $btn = document.createElement('button');
    $btn.textContent = btn.text
    $btn.classList.add('btn')
    $btn.classList.add(`btn-${btn.type || `secondary`}`)
    $btn.onclick = btn.handler || noop

    wrap.appendChild($btn)
  });

  return wrap
}

function _createModal(options) {
  const defaultWidth = '600px'
  const modal = document.createElement('div')
  modal.classList.add('modal')
  modal.insertAdjacentHTML('afterbegin', `
  <div class="modal-overlay" data-close="true">
    <div class="modal-window" style="width: ${options.width || defaultWidth}">
      <div class="modal-header">
        <span class="modal-title">${options.title || 'Тайтл'}</span>
        ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
      </div>
      <div class="modal-body" data-content>
        ${options.content || ''}
      </div>
    </div>
  </div>
  `)
  const footer = _createModalFooter(options.footerButtons)
  footer.appendAffter(modal.querySelector('[data-content]'))
  document.body.appendChild(modal)
  return modal
};

$.modal = function(options) {
  const ANIMATION_SPEED = 200;
  const $modal = _createModal(options); 
  let closing = false
  // let content = document.querySelector('.modal-window');
  let destroyed = false

  const modal = {
    open() {
      if (destroyed) {
        return console.log('Modal is destroyed');
      }
      !closing && $modal.classList.add('open');
      // content.style.width = '400px';
  },
    close() {
      closing = true
      $modal.classList.remove('open')
      $modal.classList.add('hide')
      setTimeout(() => {
        $modal.classList.remove('hide')
        closing = false
        if (typeof options.onClose === 'function') {
          options.onClose()
        }
      }, ANIMATION_SPEED)
    },
  }

  const listener = e => {
    if (e.target.dataset.close) {
      modal.close()
    }
  }

  $modal.addEventListener('click', listener)

  return Object.assign(modal, {
    destroy() {
      $modal.parentNode.removeChild($modal); // удаление ноды из дом дерева
      $modal.removeEventListener('click', listener);
      destroyed = true;
    },
    setContent(html) {
      $modal.querySelector('[data-content]').innerHTML = html;
    }
  });
}