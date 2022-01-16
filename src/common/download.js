async function download(url, filename) {
  const blob = await fetch(url).then(res => res.blob())
  const _url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = _url
  a.download = filename
  a.target = '_blank'
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  a.remove()
  window.URL.revokeObjectURL(_url)
}

export default download
