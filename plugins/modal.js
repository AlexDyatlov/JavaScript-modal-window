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
      <div class="modal-body">
        ${options.content || ''}
      </div>
      <div class="modal-footer">
        <button>Ok</button>
        <button>Cancel</button>
      </div>
    </div>
  </div>
  `)
  document.body.appendChild(modal)
  return modal
};

/* ДЗ
*title: string +
*closable +
* content: string +
*width: string ('400px') +
*destroy(): void
 закрытие на крестик и фон +
 ------------
  setContent(html: string): void | PUBLIC
  onClose(): void
  onOpne(): void
  beforeClose(): boolean
  --------
  animate.css
*/

$.modal = function(options) {
  const ANIMATION_SPEED = 200;
  const $modal = _createModal(options); 
  let closing = false
  // let content = document.querySelector('.modal-window');

  const modal = {
    open() {
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
      }, ANIMATION_SPEED)
    },
  }

  $modal.addEventListener('click', e => {
    console.log('Clicked', e.target.dataset.close);
    if (e.target.dataset.close) {
      modal.close()
    }
  })

    return modal
   
}