const modal = $.modal({
  title: 'Modal title',
  closable: true,
  content: `
    <h4>Modal is working</h4>
    <p>Lorem ipsum dolor sit.</p>
  `,
  width: '400px',
  footerButtons: [
    {text: 'Ок', type: 'primary', handler() {
      // console.log('Primary btn clicked');
      modal.close()
    }},
    {text: 'Cancel', type: 'danger', handler() {
      // console.log('Danger btn clicked');
      modal.close()
    }},
  ]
})