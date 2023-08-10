function toast(text, error = false) {
  console.log('Making toast!');
  document.querySelector('#message').innerHTML = `<div class="message ${
    error ? 'error' : 'success'
  }">${text}</div>`;
}

async function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => toast('Copied to clipboard'))
    .catch((err) => {
      toast('Could not copy to clipboard', true);
      console.error('Could not copy to clipboard:', err);
    });
}

export { toast, copyToClipboard };
